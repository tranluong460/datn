import { HotelCard } from "../..";
import { IHotel } from "../../../interface";

type ListHotelProps = {
  listHotel: IHotel[];
};

const ListHotel = ({ listHotel }: ListHotelProps) => {
  return (
    <>
      <div className="box-border">
        {listHotel.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </>
  );
};

export default ListHotel;
