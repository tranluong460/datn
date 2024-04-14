import moment from "moment";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { IBooking } from "../../../interface";
import {
  useCheckStatusZaloPayMutation,
  useUpdateBookingMutation,
} from "../../../api";
import { useState } from "react";

type InfoBookingCardProps = {
  info: IBooking;
};

const InfoBookingCard = ({ info }: InfoBookingCardProps) => {
  const [updateBooking] = useUpdateBookingMutation();
  const [checkStatusZaloPay] = useCheckStatusZaloPayMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const toggleCheckStatusZaloPay = () => {
    checkStatusZaloPay(info?.id_payment.code)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const toggleUpdateBooking = () => {
    const data = { _id: info._id, status: "Đã hủy bỏ" };

    updateBooking(data)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };
  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const statusList = ["Chờ thanh toán", "Đã xác nhận"];

  return (
    <li className="flex items-center gap-x-6 py-5 border border-divideLight dark:border-divideDark pl-5 text-textLight2nd dark:text-textDark2nd">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto flex gap-1">
          Phương thức thanh toán:
          <p className="text-sm font-semibold leading-6">
            {info.payment_method}
          </p>
        </div>
      </div>

      <p className="text-sm leading-6">
        Tổng giá:
        {info.total_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>

      <div>
        <p className="mt-1 text-xs leading-5">
          Nhận phòng: {moment(info.check_in).format("DD/MM/YYYY")}
        </p>

        <p className="mt-1 text-xs leading-5">
          Trả phòng: {moment(info.check_out).format("DD/MM/YYYY")}
        </p>
      </div>

      <div>
        <p>
          Trạng thái thanh toán:{" "}
          {info.payment_status ? "Đã thanh toán" : "Chưa thanh toán"}
        </p>

        <p>Trạng thái đơn đặt phòng: {info.status}</p>
      </div>

      {info.payment_method === "Zalo Pay" &&
        info.status === "Chờ thanh toán" && (
          <button
            onClick={toggleCheckStatusZaloPay}
            className="bg-blue-500 p-1 rounded-md text-light dark:text-dark hover:opacity-80 disabled:cursor-not-allowed"
          >
            Kiểm tra
          </button>
        )}

      <button
        onClick={showModal}
        className="bg-blue-500 p-1 rounded-md text-light dark:text-dark hover:opacity-80 disabled:cursor-not-allowed"
      >
        Xem chi tiết
      </button>
      <Modal
        title="Thông tin đơn đặt phòng"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Phòng: {info?.list_room[0]?.idRoom?.id_roomType?.name}</p>
        <p>Số lượng phòng: {info?.list_room[0]?.quantity}</p>
        <div>
          <p className="flex">
            <img
              src={info?.list_room[0]?.idRoom?.images[0].url}
              alt=""
              className="max-w-[100%]"
            />
          </p>
        </div>
        <p>Phương thức thanh toán: {info.payment_method}</p>
        <p>
          Tổng giá:
          {info.total_price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <p>Nhận phòng: {moment(info.check_in).format("DD/MM/YYYY")}</p>
        <p>Trả phòng: {moment(info.check_out).format("DD/MM/YYYY")}</p>
        <p>Trạng thái: {info.status}</p>
      </Modal>

      {statusList.includes(info.status) && (
        <button
          disabled={info.status === "Đã hủy bỏ"}
          onClick={toggleUpdateBooking}
          className="bg-blue-500 p-1 rounded-md text-light dark:text-dark hover:opacity-80 disabled:cursor-not-allowed"
        >
          Hủy đặt phòng
        </button>
      )}

      {info?.id_payment?.url_payment && (
        <a
          href={info?.id_payment?.url_payment}
          className="bg-blue-500 p-1 rounded-md text-light dark:text-dark hover:opacity-80 disabled:cursor-not-allowed"
        >
          Thanh toán
        </a>
      )}
    </li>
  );
};

export default InfoBookingCard;
