import { useState } from "react";
import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";

import { useGetAllBookingQuery, useGetOneBookingQuery } from "../../../api";
import { IBooking } from "../../../interface";
import { InfoBookingDrawn } from "../../../components";

const BookingManager = () => {
  const [idBooking, setIdBooking] = useState("");
  const [open, setOpen] = useState(false);

  const { data: allBooking, isLoading } = useGetAllBookingQuery("");
  const { data: oneBooking, isLoading: resultGetInfo } =
    useGetOneBookingQuery(idBooking);

  const transformationData = allBooking?.data.map((item: IBooking) => ({
    id: item._id,
    title: item.id_user.email,
    start: moment(item.check_in).format("YYYY-MM-DD"),
    end: moment(item.check_out).format("YYYY-MM-DD"),
    color: item.status === "Đã hủy bỏ" && "red",
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

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        dayMaxEvents={false}
        locale={viLocale}
        initialEvents={transformationData}
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
