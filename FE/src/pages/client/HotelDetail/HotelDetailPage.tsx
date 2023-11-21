import { Alert, Spin } from "antd";
import { useParams } from "react-router-dom";
import {
  Container,
  DetailOverview,
  InfoHotel,
  RoomList,
} from "../../../components";
import { useGetHotelDetailByIdQuery } from "../../../api/hotel";
import { useEffect, useState } from "react";

const HotelDetailPage = () => {
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string | undefined }>();
  const { data } = useGetHotelDetailByIdQuery(id);
  console.log(
    "🚀 ~ file: HotelDetailPage.tsx:13 ~ HotelDetailPage ~ data:",
    data
  );
  const list = data?.data?.id_room.map((room: any) => {
    return room;
  });

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="h-[685px] flex text-center justify-center mt-[50px]">
        <Spin tip="Loading..." className="h-screen">
          <Alert
            message="Đang load khách sạn"
            description="Nếu đợi quá lâu mà không loading xong có thể khách sạn không tồn tại !"
            type="info"
          />
        </Spin>
      </div>
    );
  }

  return (
    <>
      <div className="bg-cover bg-center bg-fixed bg-[url(https://booking.muongthanh.com/images/hotels/hotels/original/_hkt6859_1679810462_1691467982.jpg)] w-full h-[500px]">
        <InfoHotel
          name={data?.data?.name}
          address={data?.data?.address}
          email={data?.data?.email}
          phone={data?.data?.phone}
        />
      </div>

      <div className="mt-20 p-5">
        <DetailOverview
          name={data?.data?.name}
          description={data?.data?.description}
        />
      </div>

      <div className="p-5 bg-divideLight dark:bg-divideDark">
        <Container>
          <div className="flex flex-col mb-4">
            <h2 className="uppercase font-semibold text-2xl leading-7 pl-10 text-textLight dark:text-textDark">
              Các loại phòng
            </h2>

            <RoomList getRoom={list} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelDetailPage;
