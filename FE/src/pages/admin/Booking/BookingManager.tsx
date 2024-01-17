import { useEffect, useState } from "react";
import moment from "moment";
import { Select } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";

import {
  useGetAllBookingQuery,
  useGetAllHotelQuery,
  useGetOneBookingQuery,
} from "../../../api";
import { IBooking, IHotel } from "../../../interface";
import { InfoBookingDrawn } from "../../../components";

const BookingManager = () => {
  const [eventsKey, setEventsKey] = useState(0);
  const [idBooking, setIdBooking] = useState("");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState({
    status: "",
    id_hotel: "",
  });

  const {
    data: allBooking,
    isLoading,
    refetch: refetchAllBooking,
  } = useGetAllBookingQuery(
    `id_hotel=${select.id_hotel}&status=${select.status}`
  );
  const { data: oneBooking, isLoading: resultGetInfo } =
    useGetOneBookingQuery(idBooking);
  const { data: allHotel } = useGetAllHotelQuery("");

  const transformationBooking =
    allBooking &&
    allBooking.data &&
    allBooking.data.map((item: IBooking) => ({
      id: item._id,
      title: item.id_user?.email,
      start: moment(item.check_in).format("YYYY-MM-DD"),
      end: moment(item.check_out).format("YYYY-MM-DD"),
      color:
        (item.status === "Đã hủy bỏ" && "red") ||
        (item.status === "Chờ thanh toán" && "orange"),
    }));

  const transformationHotel =
    allHotel &&
    allHotel.data &&
    allHotel.data.map((item: IHotel) => ({
      label: item.name,
      value: item._id,
    }));

  useEffect(() => {
    const fetchData = async () => {
      await refetchAllBooking();
      setEventsKey((prevKey) => prevKey + 1);
    };

    fetchData();
    // eslint-disable-next-line
  }, [select.status, select.id_hotel]);

  if (isLoading) {
    return null;
  }

  // eslint-disable-next-line
  const handleEventClick = (args: any) => {
    setIdBooking(args.event._def.publicId);
    setOpen(true);
  };

  const onClosed = () => {
    setOpen(false);
  };

  const onChangeHotel = (value: string) => {
    setSelect((prev) => ({
      ...prev,
      id_hotel: value || "",
    }));
  };

  const onChangeStatus = (value: string) => {
    setSelect((prev) => ({
      ...prev,
      status: value || "",
    }));
  };

  const statusData = [
    {
      label: "Chờ thanh toán",
      value: "Chờ thanh toán",
    },
    {
      label: "Đang xử lý",
      value: "Đang xử lý",
    },
    {
      label: "Đã xác nhận",
      value: "Đã xác nhận",
    },
    {
      label: "Đã hủy bỏ",
      value: "Đã hủy bỏ",
    },
    {
      label: "Vắng mặt",
      value: "Vắng mặt",
    },
    {
      label: "Đã nhận phòng",
      value: "Đã nhận phòng",
    },
    {
      label: "Thành công",
      value: "Thành công",
    },
  ];

  return (
    <>
      <div className="py-5 flex flex-col gap-3">
        {/* <Select
          allowClear
          className="w-1/4"
          placeholder="Chọn khách sạn"
          onChange={onChangeHotel}
          options={transformationHotel}
        /> */}
        <Select
          allowClear
          className="w-1/4"
          placeholder="Chọn trạng thái"
          onChange={onChangeStatus}
          options={statusData}
        />
      </div>

      <FullCalendar
        height="75vh"
        key={`calender-${eventsKey}`}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        dayMaxEvents={false}
        locale={viLocale}
        initialEvents={
          transformationBooking.length > 0 ? transformationBooking : []
        }
        eventClick={handleEventClick}
      />

      {oneBooking && (
        <InfoBookingDrawn
          info={oneBooking?.data}
          isOpen={open}
          onClosed={onClosed}
          loading={resultGetInfo}
        />
      )}
    </>
  );
};

export default BookingManager;
