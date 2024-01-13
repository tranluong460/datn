import mongoose from "mongoose";

import { HotelModel, ReviewModel } from "../models";
import { sendResponse } from "../utils";
import { ReviewValidate } from "../validate";
import { validateMiddleware } from "../middleware";

export const getAll = async (req, res) => {
  try {
    const reviewList = await ReviewModel.find().populate({
      path: "id_user",
      select: "_id email",
    });

    if (!reviewList || reviewList.length === 0) {
      return sendResponse(res, 404, "Không có danh sách bình luận");
    }

    return sendResponse(res, 200, "Danh sách bình luận", reviewList);
  } catch (error) {
    console.error(error);

    return sendResponse(
      res,
      500,
      "Đã có lỗi xảy ra khi lấy danh sách bình luận"
    );
  }
};

export const getOne = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, "ID không hợp lệ");
    }

    const review = await ReviewModel.findById(req.params.id);

    if (!review || review.length === 0) {
      return sendResponse(res, 404, "Không có thông tin bình luận");
    }

    return sendResponse(res, 200, "Thông tin bình luận", review);
  } catch (error) {
    console.error(error);

    return sendResponse(
      res,
      500,
      "Đã có lỗi xảy ra khi lấy thông tin bình luận"
    );
  }
};

export const create = async (req, res) => {
  try {
    validateMiddleware(req, res, ReviewValidate, async () => {
      const data = await ReviewModel.create({
        ...req.body,
        id_user: req.user._id,
      });

      if (!data) {
        return sendResponse(res, 404, "Thêm bình luận thất bại");
      }

      await HotelModel.findByIdAndUpdate(
        req.body.id_hotel,
        { $push: { id_review: data._id } },
        { new: true }
      );

      return sendResponse(res, 200, "Thêm bình luận thành công", data);
    });
  } catch (error) {
    console.log(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi thêm bình luận");
  }
};

export const remove = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, "ID không hợp lệ");
    }

    const data = await ReviewModel.findById(req.params.id).populate({
      path: "id_user",
      select: "_id",
    });

    if (req.user._id != data.id_user._id.toString()) {
      return sendResponse(res, 403, "Không có quyền xóa đánh giá");
    }


    await ReviewModel.findByIdAndDelete(data._id);
    await HotelModel.findOneAndUpdate(
      { id_review: data._id },
      { $pull: { id_review: data._id } },
      { new: true }
    );

    return sendResponse(res, 200, "Xóa bình luận thành công");
  } catch (error) {
    console.log(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi xóa bình luận");
  }
};
