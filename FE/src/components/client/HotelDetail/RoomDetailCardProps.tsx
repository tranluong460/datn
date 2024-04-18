import qs from "query-string";
import { useGetOneRoomQuery } from "../../../api";
import { Button, Modal, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import React, { useState } from "react";
import { IRoom } from "../../../interface";
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomAmenities from "./RoomAmenities";
import styles from "./styles.module.css";

type RoomDetailCardProps = {
  room: IRoom;
  onCloseDetail: () => void;
};

const { RangePicker } = DatePicker;

const RoomDetailCard = ({ room, onCloseDetail }: any) => {
  const [currentImage, setCurrentImage] = useState<string>(room?.images[0].url);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleThumbnailClick = (imageUrl: string, index: number) => {
    setCurrentImageIndex(index);
    setCurrentImage(imageUrl);
  };

  // ! Đặt phòng chuyển sang payment

  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: dataRoom } = useGetOneRoomQuery(room?._id);

  const navigate = useNavigate();

  // ấn đặt phòng
  const disabledDate = (current: any) => {
    return current && current < moment().startOf("day");
  };
  const [dateRange, setDateRange] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "days").format("YYYY-MM-DD"),
  });

  // đặt phòng chuyển sang payment
  const [, setCookie] = useCookies<string>();
  const numberOfDays = moment(dateRange.endDate).diff(
    moment(dateRange.startDate),
    "days"
  );

  const handleOk = () => {
    const totalPriceEnd = numberOfDays * dataRoom?.data?.id_roomType?.price;
    const dataBooking = {
      check_in: dateRange.startDate,
      check_out: dateRange.endDate,
      total_price: totalPriceEnd,
      list_room: [
        {
          idRoom: dataRoom?.data?._id,
          quantity: 1,
        },
      ],
      city: 1,
    };

    if (dateRange.endDate === "" || dateRange.startDate === "") {
      setErrorMessage("Bạn cần nhập thông tin ngày nhận phòng và trả phòng");
      return;
    }

    setCookie("booking", dataBooking, { path: "/" });
    navigate(`/payment/661f928e1ca3c1911267f933`);
  };

  return (
    <>
      <div className="flex w-[1300px]">
        <div className="flex flex-col bg-[#98999b]">
          <div className="w-[850px] relative ">
            <img
              src={currentImage}
              key={currentImage}
              className="w-[900px] h-[500px] object-cover"
            />

            <span className="bottom-0 pl-3 py-2 bg-[black] absolute opacity-40 w-full text-[white] font-bold">
              {room?.id_roomType?.name}
            </span>
          </div>
          <div className="flex w-[140px] p-3 gap-3 border-none  object-cover">
            {room?.images.map((img, index: number) => (
              <img
                key={index}
                src={img.url}
                alt=""
                onClick={() => handleThumbnailClick(img.url, index)}
                className={`
                  ${currentImageIndex === index ? styles.selectedThumbnail : ""}
                 object-cover cursor-pointer
                `}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-3 pb-22 justify-between">
          <h1 className="border-b font-[500] mt-4 pb-3">
            {room?.id_roomType?.name}
          </h1>

          <span className="text-[13px] mt-3">{room?.description}</span>
          <div className="mt-3">
            <span className="font-[500]">Tiện nghi của phòng</span>
            <div>
              <RoomAmenities amenities={room?.id_amenities} />
            </div>
          </div>

          <div className="pr-4 mt-4 flex flex-col gap-2">
            <div>
              <h1 className="text-xl font-bold">Thông tin chi tiết phòng</h1>
            </div>
            <div>
              <p>
                Phòng có thể chứa {room?.id_roomType?.children} trẻ em và{" "}
                {room?.id_roomType?.adults} người lớn
              </p>
              <p>Số lượng giường ngủ: {room?.id_roomType?.bed}</p>
              <p>Phòng còn trống: {room?.quantity}</p>
              <p>
                Giá phòng:
                {room?.id_roomType?.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                / đêm
              </p>
            </div>

            <RangePicker
              className="
              py-[11px] focus:border-yellow-500 hover:border-yellow-500 border-blue-500"
              disabledDate={disabledDate}
              defaultValue={[dayjs(), dayjs().add(1, "days")]}
              onChange={(dates, dateStrings) => {
                setDateRange({
                  startDate: dateStrings[0],
                  endDate: dateStrings[1],
                });
              }}
            />
            <p className="text-red-500 font-bold">{errorMessage}</p>

            {room?.quantity > 0 ? (
              <Button
                type="primary"
                className="text-white bg-blue-500 mr-3 mb-2 w-full"
                onClick={handleOk}
              >
                Đặt phòng
              </Button>
            ) : (
              <Button className="text-black bg-white-500 mr-3 mb-2 w-full">
                Hết phòng
              </Button>
            )}
          </div>
        </div>

        <button onClick={onCloseDetail}>
          <AiOutlineCloseCircle
            className={`text-[30px] absolute top-3 right-4 bg-white`}
          />
        </button>
      </div>
    </>
  );
};

export default RoomDetailCard;
