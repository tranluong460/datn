import { useParams } from "react-router-dom";
import { Result } from "antd";

import {
  Container,
  DetailOverview,
  InfoHotel,
  RoomList,
} from "../../../components";
import { useGetOneHotelQuery } from "../../../api";
import { Loading } from "../..";

const HotelDetailPage = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data, isLoading, isSuccess } = useGetOneHotelQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!isSuccess) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Result
          status="error"
          title="404"
          subTitle="Không tìm thấy thông tin khách sạn!"
        />
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-cover bg-center bg-fixed  w-full h-[500px]`}
        style={{ backgroundImage: `url(${data.data.images[0].url})` }}
      >
        <InfoHotel
          name={data?.data?.name}
          address={data?.data?.address}
          email={data?.data?.email}
          phone={data?.data?.phone}
        />
      </div>

      <div className="mt-20 p-5">
        <DetailOverview description={data?.data?.description} />
      </div>

      <div className="p-5 bg-divideLight dark:bg-divideDark">
        <Container>
          <div className="flex flex-col mb-4">
            <h2 className="uppercase font-semibold text-2xl leading-7 pl-10 text-textLight dark:text-textDark">
              Các loại phòng
            </h2>

            <RoomList listRoom={data?.data?.id_room} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelDetailPage;
