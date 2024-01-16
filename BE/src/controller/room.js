import mongoose from "mongoose";

import { RoomValidate } from "../validate";
import { RoomModel, HotelModel } from "../models";
import { validateFormMiddleware } from "../middleware";
import { sendResponse, uploadImageToCloudinary } from "../utils";
import { deleteImageFromCloudinary } from "../utils/upImagesUtils";

export const getAll = async (req, res) => {
  try {
    const roomList = await RoomModel.find().select("-createdAt -updatedAt").populate({ path: "id_roomType id_hotel", select: "_id name" });

    if (!roomList || roomList.length === 0) {
      return sendResponse(res, 404, "Không có danh sách phòng");
    }

    return sendResponse(res, 200, "Danh sách phòng", roomList);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi lấy danh sách phòng");
  }
};

export const getOne = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return sendResponse(res, 400, "ID không hợp lệ");
    }

    const room = await RoomModel.findById(req.params.id).populate(
      "id_amenities id_hotel id_roomType"
    );

    if (!room || room.length === 0) {
      return sendResponse(res, 404, "Không có thông tin phòng");
    }

    return sendResponse(res, 200, "Thông tin phòng", room);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi lấy thông tin phòng");
  }
};

export const create = async (req, res) => {
  const imagesArray = [];
  for (const field in req.files) {
    if (req.files.hasOwnProperty(field)) {
      const file = req.files[field];
      imagesArray.push({
        name: field,
        url: file.path,
      });
    }
  }
  req.fields.images = imagesArray;

  if (req.fields.id_amenities) {
    const id_amenities = req.fields.id_amenities.split(",");

    const amenities = id_amenities.map(
      (item) => new mongoose.Types.ObjectId(item)
    );
    req.fields.id_amenities = amenities;
  }

  try {
    validateFormMiddleware(req, res, RoomValidate, async () => {
      const newImages = await Promise.all(
        req.fields.images.map(uploadImageToCloudinary)
      );

      const images = newImages.map((imageUrl, index) => ({
        url: imageUrl,
      }));

      const data = await RoomModel.create({
        ...req.fields,
        images,
      });

      if (!data) {
        return sendResponse(res, 404, "Thêm phòng thất bại");
      }

      await HotelModel.findByIdAndUpdate(
        req.fields.id_hotel,
        { $push: { id_room: data._id } },
        { new: true }
      );

      return sendResponse(res, 200, "Thêm phòng thành công", data);
    });
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi thêm phòng");
  }
};

export const update = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return sendResponse(res, 400, "ID không hợp lệ");
  }

  try {
    // Lấy dữ liệu hiện tại của khách sạn từ cơ sở dữ liệu
    const currentData = await RoomModel.findById(req.params.id);

    // Kiểm tra xem có ảnh mới được tải lên không
    if (req.files && Object.keys(req.files).length > 0) {
      const imagesArray = [];
      for (const field in req.files) {
        if (req.files.hasOwnProperty(field)) {
          const file = req.files[field];
          imagesArray.push({
            name: field,
            url: file.path,
          });
        }
      }
      await Promise.all(currentData.images.map(deleteImageFromCloudinary))
      // Cập nhật ảnh mới chỉ khi có ảnh mới được tải lên
      const newImages = await Promise.all(imagesArray.map(uploadImageToCloudinary));

      // Tạo mảng mới chứa thông tin URL của ảnh mới
      const images = newImages.map((imageUrl, index) => ({
        url: imageUrl,
      }));

      // Cập nhật dữ liệu với ảnh mới
      req.fields.images = images;
    } else {
      // Nếu không có ảnh mới, giữ nguyên URL của ảnh cũ từ cơ sở dữ liệu
      req.fields.images = currentData.images;
    }

    if (req.fields.id_amenities) {
      const id_amenities = req.fields.id_amenities.split(",");
      const amenities = id_amenities.map((item) => new mongoose.Types.ObjectId(item));
      req.fields.id_amenities = amenities;
    }

    // validateFormMiddleware(req, res, HotelValidate, async () => {
    // Tạo đối tượng newData chứa thông tin mới
    const newData = {
      ...req.fields,
    };
    // Cập nhật dữ liệu trong cơ sở dữ liệu
    const data = await RoomModel.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    if (!data) {
      return sendResponse(res, 404, "Cập nhật khách sạn thất bại");
    }

    return sendResponse(res, 200, "Cập nhật khách sạn thành công", data);
    // });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Đã có lỗi xảy ra khi cập nhật khách sạn");
  }
};

