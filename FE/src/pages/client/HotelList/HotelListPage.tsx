import { useState } from "react";
import { Result } from "antd";

import { Loading } from "../..";
import { useGetAllHotelQuery } from "../../../api";
import {
  Container,
  Filter,
  FilterDialog,
  FilterTop,
  ListHotel,
} from "../../../components";

const HotelListPage = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showRate, setShowRate] = useState(true);

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
      <Container>
        <FilterDialog
          isShowRate={showRate}
          onShowRate={() => setShowRate(!showRate)}
          isShowDialog={showDialog}
          onShowDialog={() => setShowDialog(!showDialog)}
        />

        <Container>
          <div className="pt-5">
            <FilterTop onShowDialog={() => setShowDialog(!showDialog)} />
          </div>

          <div className="pb-24 pt-3">
            <h2 id="products-heading" className="sr-only">
              Danh sách khách sạn
            </h2>

            <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4">
              <Filter
                isShowRate={showRate}
                onShowRate={() => setShowRate(!showRate)}
              />

              <div className="lg:col-span-3">
                <ListHotel listHotel={data?.data} />
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default HotelListPage;
