import moment from "moment";
import mongoose from "mongoose";

import { BookingModel, RoomModel } from "../models";
import { BookingValidate } from "../validate";
import { validateMiddleware } from "../middleware";
import {
  sendMailBooking,
  sendMailCancelBooking,
  sendMailSuccessBooking,
  sendResponse,
} from "../utils";

export const getAll = async (req, res) => {
  try {
    const bookingList = await BookingModel.find().populate("id_user");

    if (!bookingList || bookingList.length === 0) {
      return sendResponse(res, 404, "Không có danh sách đặt phòng");
    }

    return sendResponse(res, 200, "Danh sách đặt phòng", bookingList);
  } catch (error) {
    console.error(error);

    return sendResponse(
      res,
      500,
      "Đã có lỗi xảy ra khi lấy danh sách đặt phòng"
    );
  }
};

export const getBookingByUser = async (req, res) => {
  const user = req.user;

  try {
    const bookingList = await BookingModel.find({ id_user: user._id })
      .populate("id_payment")
      .populate({
        path: "list_room",
        populate: "idRoom",
      });

    if (!bookingList || bookingList.length === 0) {
      return sendResponse(res, 404, "Người dùng chưa đặt phòng");
    }

    return sendResponse(
      res,
      200,
      "Danh sách đặt phòng của người dùng",
      bookingList
    );
  } catch (error) {
    console.error(error);

    return sendResponse(
      res,
      500,
      "Đã có lỗi xảy ra khi lấy danh sách đặt phòng của người dùng"
    );
  }
};

export const create = async (req, res) => {
  const user = req.user;
  const { list_room } = req.body;

  try {
    validateMiddleware(req, res, BookingValidate, async () => {
      await Promise.all(
        list_room.map(async (item) => {
          const room = await RoomModel.findById(item.idRoom);

          if (room) {
            room.quantity -= item.quantity;

            await room.save();
          }
        })
      );

      const data = await BookingModel.create({
        id_user: user._id,
        ...req.body,
      });

      if (!data) {
        return sendResponse(res, 404, "Đặt phòng thất bại");
      }

      const check_in = moment(data.check_in).format("DD/MM/YYYY");
      const check_out = moment(data.check_out).format("DD/MM/YYYY");

      sendMailBooking(
        user.email,
        user.id_information.name,
        check_in,
        check_out,
        data.total_price
      );

      return sendResponse(res, 200, "Đặt phòng thành công", data);
    });
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra");
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return sendResponse(res, 400, "ID không hợp lệ");
    }

    if (!status) {
      return sendResponse(res, 404, "Trạng thái không dược để trống");
    }

    const booking = await BookingModel.findById(id);
    if (booking.status === "Đã hủy bỏ" || booking.status === "Thành công") {
      return sendResponse(res, 404, "Không thể cập nhật trạng thái");
    }

    const newBooking = await BookingModel.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    ).populate({
      path: "id_user",
      populate: {
        path: "id_information",
      },
    });

    if (newBooking.status === "Đã hủy bỏ") {
      const check_in = moment(newBooking.check_in).format("DD/MM/YYYY");
      const check_out = moment(newBooking.check_out).format("DD/MM/YYYY");

      await Promise.all(
        newBooking.list_room.map(async (item) => {
          const room = await RoomModel.findById(item.idRoom);

          if (room) {
            room.quantity += item.quantity;

            await room.save();
          }
        })
      );

      sendMailCancelBooking(
        newBooking.id_user.email,
        newBooking.id_user.id_information.name,
        check_in,
        check_out
      );
    }

    if (newBooking.status === "Thành công") {
      await Promise.all(
        newBooking.list_room.map(async (item) => {
          const room = await RoomModel.findById(item.idRoom);

          if (room) {
            room.quantity += item.quantity;

            await room.save();
          }
        })
      );

      sendMailSuccessBooking(
        newBooking.id_user.email,
        newBooking.id_user.id_information.name
      );
    }

    return sendResponse(
      res,
      200,
      newBooking.status == "Đã hủy bỏ"
        ? "Hủy đặt phòng thành công"
        : "Cập nhật trạng thái thành công",
      newBooking
    );
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra");
  }
};
