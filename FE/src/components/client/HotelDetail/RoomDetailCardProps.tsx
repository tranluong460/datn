import qs from "query-string";
import { useGetAllHotelQuery, useGetOneRoomQuery } from "../../../api";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import React, { useState } from "react";
import { IRoom } from "../../../interface";
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomAmenities from "./RoomAmenities";
import styles from "./styles.module.css";
import Search from "../NavBar/Search";

type RoomDetailCardProps = {
  room: IRoom;
  onCloseDetail: () => void;
};

const { RangePicker } = DatePicker;

const RoomDetailCard = ({ room, onCloseDetail }: any) => {
  const [showSearch, setShowSearch] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(room?.images[0].url);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [numberRooms, setNumberRooms] = useState(1);

  const increaseRooms = () => {
    if (numberRooms <= room.quantity - 1) {
      setNumberRooms(numberRooms + 1);
    }
  };

  const reduceRooms = () => {
    if (numberRooms > 1) {
      setNumberRooms(numberRooms - 1);
    }
  };

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

  const { data: AllHotel } = useGetAllHotelQuery("");

  const handleOk = () => {
    setShowSearch(true);
  };

  // const handleOk = () => {
  //   const totalPriceEnd = numberOfDays * dataRoom?.data?.id_roomType?.price;
  //   const dataBooking = {
  //     check_in: dateRange.startDate,
  //     check_out: dateRange.endDate,
  //     total_price: totalPriceEnd,
  //     list_room: [
  //       {
  //         idRoom: dataRoom?.data?._id,
  //         quantity: numberRooms,
  //       },
  //     ],
  //     city: 1,
  //   };

  //   if (dateRange.endDate === "" || dateRange.startDate === "") {
  //     setErrorMessage("Bạn cần nhập thông tin ngày nhận phòng và trả phòng");
  //     return;
  //   }

  //   setCookie("booking", dataBooking, { path: "/" });
  //   navigate(`/payment/${AllHotel?.data[0]?._id}`);
  // };

  return (
    <>
      {showSearch && <Search />}
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
              <p>
                Giá phòng:
                {room?.id_roomType?.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                / đêm
              </p>
            </div>

            {/* <div className="flex justify-between">
              <div className="font-bold">Số lượng phòng muốn đặt:</div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={reduceRooms}
                  className="bg-gray-500 px-4 py-2 rounded-full text-white"
                >
                  -
                </button>
                <p className="font-bold bg-gray-500 text-white py-2 px-6">
                  {numberRooms}
                </p>
                <button
                  onClick={increaseRooms}
                  className="bg-gray-500 px-4 py-2 rounded-full text-white"
                >
                  +
                </button>
              </div>
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
            /> */}
            <p className="text-red-500 font-bold">{errorMessage}</p>
            {room?.id_roomType?.status !== "Không được áp dụng" ? (
              <Button
                type="primary"
                className="text-white bg-blue-500 mr-3 mb-2 w-full"
                onClick={handleOk}
              >
                Đặt phòng
              </Button>
            ) : (
              <Button className="text-black bg-white-500 mr-3 mb-2 w-full">
                Hiện tại không thể đặt phòng này
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
