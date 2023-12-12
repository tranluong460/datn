import moment from "moment";
import { IBooking } from "../../../interface";

type InfoBookingCardProps = {
  info: IBooking;
};

const InfoBookingCard = ({ info }: InfoBookingCardProps) => {
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
    </li>
  );
};

export default InfoBookingCard;
