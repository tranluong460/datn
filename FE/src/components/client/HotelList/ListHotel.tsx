import { HotelCard } from "../..";

const ListHotel = (data:any) => {
  console.log(data)
  return (
    <>
      <div className="box-border">
        {data?.data?.data?.map((hotel:any) => {
        return <HotelCard data={hotel}/>
        })}

      </div>
    </>
  );
};

export default ListHotel;
