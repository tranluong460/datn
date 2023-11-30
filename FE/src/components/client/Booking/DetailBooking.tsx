import moment from "moment";
import { useState, ChangeEvent } from "react";

import { IHotel } from "../../../interface";
import toast from "react-hot-toast";

type DetailBookingProps = {
  hotel: IHotel;
  totalPrice: number;
  checkIn: string;
  checkOut: string;
  onBooking: (value: string) => void;
  numberOfDays: number;
};

const DetailBooking = ({
  hotel,
  totalPrice,
  checkIn,
  checkOut,
  numberOfDays,
  onBooking,
}: DetailBookingProps) => {
  const [method, setMethod] = useState("");

  const handleMethodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setMethod(selectedValue);
  };

  const toggleBooking = () => {
    if (!method) {
      return toast.error("Chọn phương thức thanh toán");
    }

    onBooking(method);
  };

  return (
    <div className="col-span-1 bg-light">
      <h2>Thông tin đặt phòng</h2>

      <div>{hotel.name}</div>

      <div>
        Từ {moment(checkIn).format("DD/MM/YYYY")} đến
        {moment(checkOut).format("DD/MM/YYYY")}
      </div>

      <div>{numberOfDays} ngày</div>

      <div>
        Tổng:{" "}
        {(numberOfDays * totalPrice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </div>

      <select onChange={handleMethodChange}>
        <option value="" selected>
          Phương thức
        </option>
        <option value="VN Pay">VN Pay</option>
        <option value="Zalo Pay">Zalo Pay</option>
      </select>

      <button onClick={toggleBooking} className="p-5 border hover:bg-blue-500">
        Đặt phòng
      </button>
    </div>
  );
};

export default DetailBooking;
