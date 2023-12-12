import { HotelCard } from "../..";
import { IHotel } from "../../../interface";
import { Loading } from "../../../pages";

type ListHotelProps = {
  listHotel: IHotel[] | undefined;
  isLoading: boolean;
};

const ListHotel = ({ listHotel, isLoading }: ListHotelProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="box-border">
        {listHotel
          ? listHotel.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))
          : "Không có khách sạn"}
      </div>
    </>
  );
};

export default ListHotel;
