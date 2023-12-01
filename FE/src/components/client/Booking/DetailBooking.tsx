import moment from "moment";
import { useState } from "react";

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
  const [show, setShow] = useState(false);

  const handleMethodChange = (name: string) => {
    setMethod(name);
  };

  const onToggle = () => {
    setShow(!show);
  };

  const toggleBooking = () => {
    if (!method) {
      return toast.error("Chọn phương thức thanh toán");
    }

    onBooking(method);
  };

  const selectList = [{ name: "VN Pay" }, { name: "Zalo Pay" }];

  return (
    <div className="flex flex-col col-span-1 bg-light dark:bg-dark p-3">
      <h2 className="text-xl text-textLight dark:text-textDark border-b border-divideLight dark:border-divideDark p-5">
        Thông tin đặt phòng
      </h2>

      <div className="py-3">
        <div className="bg-light dark:bg-dark p-2">
          <span className="mt-1 text-lg text-textLight2nd dark:text-textDark2nd">
            {hotel.name}
          </span>
        </div>

        <div className="bg-light dark:bg-dark p-2 flex gap-1 text-medium text-textLight2nd dark:text-textDark2nd">
          <p>{moment(checkIn).format("DD/MM/YYYY")}</p>
          <p>-</p>
          <p>{moment(checkOut).format("DD/MM/YYYY")}</p>
          <span>({numberOfDays} ngày)</span>
        </div>
      </div>

      <div className="text-textLight2nd dark:text-textDark2nd border-t border-divideLight dark:border-divideDark py-5 px-2 flex justify-between">
        <span className="text-md">Tổng cộng</span>
        <span>
          {(numberOfDays * totalPrice).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>

      <div className="min-w-full border-t border-divideLight dark:border-divideDark p-3 flex justify-between items-center">
        <label className="text-md text-textLight2nd dark:text-textDark2nd">
          Thanh toán
        </label>

        <div className="relative mt-2 w-36">
          <button
            onClick={onToggle}
            className="relative w-full cursor-pointer rounded-md bg-light dark:bg-dark py-2 pl-1 pr-10 text-left text-textLight2nd dark:text-textDark2nd shadow-sm sm:text-md sm:leading-6 border border-divideLight dark:border-divideDark"
          >
            <span className="flex items-center">
              <span className="ml-3 block truncate">
                {method ? method : "Phương thức thanh toán"}
              </span>
            </span>
          </button>

          {show && (
            <ul className="absolute z-10 mt-1 min-w-22 overflow-auto rounded-md bg-light dark:bg-dark py-1 text-base shadow-lg focus:outline-none sm:text-sm px-1 duration-300 border border-divideLight dark:border-divideDark">
              {selectList.map((item, index) => (
                <li
                  key={item.name}
                  onClick={() => handleMethodChange(item.name)}
                  className="text-textLight2nd dark:text-textDark2nd relative cursor-pointer select-none py-3 pl-3 pr-9 hover:bg-divideLight dark:hover:bg-divideDark rounded-md"
                >
                  <div className="flex items-center" onClick={onToggle}>
                    {index + 1}.
                    <span className="font-normal ml-3 block truncate">
                      {item.name}
                    </span>
                  </div>

                  {method && method === item.name && (
                    <span className="text-primary absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        onClick={toggleBooking}
        className="mt-10 flex justify-center items-center border border-divideLight dark:border-divideDark hover:bg-blue-500 cursor-pointer"
      >
        <span className="p-3">Đặt phòng</span>
      </div>
    </div>
  );
};

export default DetailBooking;
