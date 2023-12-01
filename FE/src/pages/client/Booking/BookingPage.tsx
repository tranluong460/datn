import moment from "moment";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Result } from "antd";

import { Loading } from "../..";
import {
  useCreateBookingMutation,
  useGetOneHotelQuery,
  useVnPayPaymentMutation,
} from "../../../api";

import {
  Container,
  DetailBooking,
  HotelBooking,
  RoomBooking,
} from "../../../components";
import { IRoom } from "../../../interface";
import toast from "react-hot-toast";

const BookingPage = () => {
  const { search } = useLocation();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string[]>([]);

  const params = new URLSearchParams(search);

  const checkIn = params.get("checkin") || "";
  const checkOut = params.get("checkout") || "";
  const numberOfDays = moment(checkOut).diff(moment(checkIn), "days");

  const idHotel = params.get("hotel") || "";

  const { data, isSuccess, isLoading } = useGetOneHotelQuery(idHotel);
  const [booking] = useCreateBookingMutation();
  const [paymentVnPay] = useVnPayPaymentMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Result title="Không tìm thấy khách sạn" status={404} />
      </div>
    );
  }

  const onBooking = (method: string) => {
    const totalPriceEnd = numberOfDays * totalPrice;

    const data = {
      check_in: checkIn,
      check_out: checkOut,
      total_price: totalPriceEnd,
      payment_method: method,
      list_room: selectedRoom,
    };

    booking(data)
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        const data = {
          amount: response.data.total_price,
          bookingId: response.data._id,
        };

        if (response.data.payment_method === "VN Pay") {
          paymentVnPay(data)
            .unwrap()
            .then((res) => {
              window.location.href = res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <Container>
      <HotelBooking oneHotel={data?.data} />

      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 bg-light dark:bg-dark">
          {data?.data?.id_room.map((room: IRoom) => (
            <RoomBooking
              key={room._id}
              room={room}
              total={totalPrice}
              setTotal={(value) => setTotalPrice(value)}
              selectRoom={selectedRoom}
              setSelectRoom={(value) => setSelectedRoom(value)}
            />
          ))}
        </div>

        <DetailBooking
          hotel={data?.data}
          totalPrice={totalPrice}
          checkIn={checkIn}
          checkOut={checkOut}
          numberOfDays={numberOfDays}
          onBooking={(value) => onBooking(value)}
        />
      </div>
    </Container>
  );
};

export default BookingPage;
