import { useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";

import { useGetAllBookingQuery, useGetOneBookingQuery } from "../../../api";
import { IBooking } from "../../../interface";
import { InfoBookingDrawn } from "../../../components";

const { RangePicker } = DatePicker;

const BookingManager = () => {
  const [eventsKey, setEventsKey] = useState(0);
  const [idBooking, setIdBooking] = useState("");
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState({
    check_in: "",
    check_out: "",
    id_hotel: "",
  });

  const {
    data: allBooking,
    isLoading,
    refetch: refetchAllBooking,
  } = useGetAllBookingQuery(
    `check_in=${select.check_in}&check_out=${select.check_out}&id_hotel=${select.id_hotel}`
  );
  const { data: oneBooking, isLoading: resultGetInfo } =
    useGetOneBookingQuery(idBooking);

  const transformationData =
    allBooking &&
    allBooking.data &&
    allBooking.data.map((item: IBooking) => ({
      id: item._id,
      title: item.id_user.email,
      start: moment(item.check_in).format("YYYY-MM-DD"),
      end: moment(item.check_out).format("YYYY-MM-DD"),
      color:
        (item.status === "Đã hủy bỏ" && "red") ||
        (item.status === "Chờ thanh toán" && "orange"),
    }));

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

  const onChange = async (
    _value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setSelect((prev) => ({
      ...prev,
      check_in: dateString[0],
      check_out: dateString[1],
    }));

    await refetchAllBooking();

    setEventsKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className="py-5">
        <RangePicker onChange={onChange} />
      </div>

      <FullCalendar
        height="75vh"
        key={eventsKey}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        dayMaxEvents={false}
        locale={viLocale}
        initialEvents={transformationData.length > 0 ? transformationData : []}
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
