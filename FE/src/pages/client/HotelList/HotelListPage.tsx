import { Result } from "antd";

import { Loading } from "../..";
import { useGetAllHotelQuery } from "../../../api";
import { Container, Filter, ListHotel } from "../../../components";

const HotelListPage = () => {
  const { data, isLoading, isSuccess } = useGetAllHotelQuery("");

  if (isLoading) {
    return <Loading />;
  }

  if (!isSuccess) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Result
          title="500"
          status="error"
          subTitle="Đã có lỗi xảy ra khi lấy danh sách khách sạn"
        />
      </div>
    );
  }

  return (
    <>
      <div className="p-0 md:p-5 min-h-screen">
        <Container>
          <div className="flex gap-5">
            <Filter />

            <ListHotel listHotel={data?.data} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelListPage;
