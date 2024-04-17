import { validateMiddleware } from "../middleware";
import { RoomModel, VoucherModel } from "../models";
import { sendResponse } from "../utils";
import { VoucherValidate } from "../validate";

export const getAll = async (req, res) => {
  try {
    const voucherList = await VoucherModel.find();

    if (!voucherList || voucherList.length === 0) {
      return sendResponse(res, 404, "Không có danh sách voucher");
    }

    return sendResponse(res, 200, "Danh sách voucher", voucherList);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi lấy danh sách voucher");
  }
};

export const createVoucher = async (req, res) => {
  try {
    validateMiddleware(req, res, VoucherValidate, async () => {
      const data = await VoucherModel.create(req.body);

      if (!data) {
        return sendResponse(res, 404, "Thêm voucher thất bại");
      }

      return sendResponse(res, 201, "Tạo voucher thành công", data);
    });
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra");
  }
};

export const getVoucherByCode = async (req, res) => {
  const { code, idRoomType } = req.body;

  try {
    const voucher = await VoucherModel.findOne({ voucherCode: code }).populate(
      "roomType"
    );

    if (!voucher || voucher.length === 0) {
      return sendResponse(res, 404, "Không có thông tin voucher");
    }

    const room = await RoomModel.findById(idRoomType);

    if (room.id_roomType.toString() !== voucher.roomType._id.toString()) {
      return sendResponse(res, 400, "Voucher không áp dụng cho loại phòng này");
    }

    return sendResponse(res, 200, "Voucher đã được áp dụng", voucher);
  } catch (error) {
    console.error(error);

    return sendResponse(res, 500, "Đã có lỗi xảy ra khi lấy thông tin voucher");
  }
};
