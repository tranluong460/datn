import moment from "moment";
import toast from "react-hot-toast";

import { IBooking } from "../../../interface";
import {
  useCheckStatusZaloPayMutation,
  useUpdateBookingMutation,
} from "../../../api";

type InfoBookingCardProps = {
  info: IBooking;
};

const InfoBookingCard = ({ info }: InfoBookingCardProps) => {
  const [updateBooking] = useUpdateBookingMutation();
  const [checkStatusZaloPay] = useCheckStatusZaloPayMutation();

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
        Tổng giá:{" "}
        {info.total_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>

      <p className="mt-1 text-xs leading-5">
        Nhận phòng: {moment(info.check_in).format("DD/MM/YYYY")}
      </p>

      <p className="mt-1 text-xs leading-5">
        Trả phòng: {moment(info.check_out).format("DD/MM/YYYY")}
      </p>

      <div>Trạng thái: {info.status}</div>

      {info.status === "Chờ thanh toán" && (
        <button
          onClick={toggleCheckStatusZaloPay}
          className="bg-blue-500 p-1 rounded-md text-light dark:text-dark hover:opacity-80 disabled:cursor-not-allowed"
        >
          Kiểm tra
        </button>
      )}

      <button
        disabled={info.status === "Đã hủy bỏ"}
        onClick={toggleUpdateBooking}
        className="bg-blue-500 p-1 rounded-md text-light dark:text-dark hover:opacity-80 disabled:cursor-not-allowed"
      >
        Hủy đặt phòng
      </button>
    </li>
  );
};

export default InfoBookingCard;
