import qs from "query-string";
import React, { useState } from "react";
import { useGetOneRoomQuery } from "../../../api";
import RoomDetailCard from "../HotelDetail/RoomDetailCardProps";
import { Button, Modal, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type ComboPriceCardProps = {
  data: {
    _id: string;
    id_hotel: string;
    images: { url: string }[];
    price: string;
  };
};

const { RangePicker } = DatePicker;

const ComboPriceCard: React.FC<ComboPriceCardProps> = ({ data }) => {
  const navigate = useNavigate();

  // ấn đặt phòng
  const disabledDate = (current: any) => {
    return current && current < moment().startOf("day");
  };
  const [dateRange, setDateRange] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "days").format("YYYY-MM-DD"),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleOk = () => {
    const updatedQuery: any = {
      hotel: null,
    };

    if (dateRange.startDate) {
      updatedQuery.checkin = dateRange.startDate;
    }

    if (dateRange.endDate) {
      updatedQuery.checkout = dateRange.endDate;
    }

    if (dateRange.endDate === "") {
      setErrorMessage("Bạn cần nhập thông tin ngày nhận phòng và trả phòng");
      return;
    }

    updatedQuery.hotel = "65f80b7f1f4a2e01d0677d2c";
    // setIsSearched(true);

    const url = qs.stringifyUrl(
      {
        url: "/booking",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    navigate(url);

    setIsModalOpen(false);
  };
  // end ấn đặt phòng

  // xem chi tiết phòng
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

  const openRoomDetail = (room: any) => {
    setSelectedRoom(room);
  };

  const closeRoomDetail = () => {
    setSelectedRoom(null);
  };
  // end c t p

  const { data: dataRoom } = useGetOneRoomQuery(data._id);
  return (
    <>
      <div className="overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
        {/* <a href={`hotel-detail/${data?.id_hotel._id}`}> */}
        <img
          src={data?.images[0]?.url}
          alt="Service"
          className="w-full h-[350px] object-cover rounded-none transition-transform duration-300 ease-in-out transform hover:scale-90"
          onClick={() => openRoomDetail(data)}
        />

        <div className="flex gap-2 justify-between items-center">
          <div className="p-4">
            <h5 className="text-blue-500 cursor-default">
              {dataRoom?.data?.id_roomType?.name}
            </h5>
            <p className="text-md text-yellow-500 font-bold capitalize">
              {data?.id_roomType?.price}
              <span className="ml-1 text-xs">/đêm</span>
            </p>
          </div>

          <div>
            <Button
              type="primary"
              onClick={showModal}
              className="text-white bg-blue-500 mr-3"
            >
              Đặt phòng
            </Button>
            <Modal
              title="Ngày nhận phòng - Ngày trả phòng"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{
                style: { backgroundColor: "#ff6600", borderColor: "#ff6600" },
              }}
            >
              <Space direction="vertical" size={12}>
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
              </Space>
            </Modal>
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
