
<<<<<<< Updated upstream
import Imagedetai from '../../../components/client/detail/image_detail';
import Productdetail from '../../../components/client/detail/product_detail';
=======
import {
  Container,
  DetailOverview,
  InfoHotel,
  RoomList,
  Map,
  Amenities,
} from "../../../components";
import { useGetOneHotelQuery } from "../../../api";
import { Loading } from "../..";
>>>>>>> Stashed changes

const HotelDetailPage = () => {
  return (
    <>
<<<<<<< Updated upstream

      <Imagedetai />

      <Productdetail />

=======
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

      <div className="p-5 bg-divideLight dark:bg-divideDark py-10">
        <div className="max-w-[2520px] mx-auto xl:px-6 md:px-10 sm:px-2 px-4">
          <div className="flex flex-col mb-4">
            <h2 className="font-lato translate-x-10 uppercase font-semibold text-2xl leading-7 pl-10 text-textLight dark:text-textDark">
              Các loại phòng
            </h2>

            <RoomList listRoom={data?.data?.id_room} />
          </div>
        </div>
      </div>
      <Amenities amenities={data?.data?.id_amenities} />
      <Map />
>>>>>>> Stashed changes
    </>






  );
};

export default HotelDetailPage;
