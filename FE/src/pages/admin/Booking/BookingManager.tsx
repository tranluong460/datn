import moment from "moment";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import viLocale from "@fullcalendar/core/locales/vi";

import { useGetAllBookingQuery } from "../../../api";
import { IBooking } from "../../../interface";

const BookingManager = () => {
  const { data, isLoading } = useGetAllBookingQuery("");

  const transformationData = data?.data.map((item: IBooking) => ({
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
    alert(args.event._def.publicId);
  };

  return (
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
  );
};

export default BookingManager;
