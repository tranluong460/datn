import { useLocation } from "react-router-dom";
import { Result } from "antd";

import { Loading } from "../..";
import { useGetOneHotelQuery } from "../../../api";

import { Container, HotelBooking } from "../../../components";

const BookingPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const idHotel = params.get("hotel") || "";

  const { data, isSuccess, isLoading } = useGetOneHotelQuery(idHotel);

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

  return (
    <Container>
      <HotelBooking oneHotel={data?.data} />

      <div className="flex">
        <div className="col-span-2 flex-1">1</div>
        <div>2</div>
      </div>
    </Container>
  );
};

export default BookingPage;
