import qs from "query-string";
import React, { useState } from "react";
import { useGetOneRoomQuery } from "../../../api";
import RoomDetailCard from "../HotelDetail/RoomDetailCardProps";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

type ComboPriceCardProps = {
  data: {
    _id: string;
    id_hotel: string;
    images: { url: string }[];
    price: string;
  };
};

const ComboPriceCard: React.FC<ComboPriceCardProps> = ({ data }) => {
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const { data: dataRoom } = useGetOneRoomQuery(data._id);

  // xem chi tiết phòng
  const openRoomDetail = (room: any) => {
    setSelectedRoom(room);
  };

  const closeRoomDetail = () => {
    setSelectedRoom(null);
  };
  return (
    <>
      <div className="overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
        {/* <a href={`hotel-detail/${data?.id_hotel._id}`}> */}
        <img
          src={data?.images[0]?.url}
          alt="Service"
          className="w-full h-[350px] object-cover rounded-none transition-transform duration-300 ease-in-out transform hover:scale-90"
          onClick={() => openRoomDetail(dataRoom?.data)}
        />

        <div className="flex gap-2 justify-between items-center">
          <div className="p-4">
            <h5 className="text-blue-500 cursor-default">
              {dataRoom?.data?.id_roomType?.name}
            </h5>
            <p className="text-md text-yellow-500 font-bold capitalize">
              {data?.id_roomType?.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              <span className="ml-1 text-xs">/ đêm</span>
            </p>
          </div>

          <div>
            <Button
              type="primary"
              onClick={() => openRoomDetail(dataRoom?.data)}
              className="text-white bg-blue-500 mr-3"
            >
              Đặt phòng
            </Button>
          </div>
        </div>
        {/* </a> */}
      </div>

      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
            <RoomDetailCard
              room={selectedRoom}
              onCloseDetail={closeRoomDetail}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ComboPriceCard;
