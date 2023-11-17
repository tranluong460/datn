import { Container, Filter, ListHotel } from "../../../components";
import { useGetHotelQuery } from "../../../api/hotel";

const HotelListPage = () => {

  const {data} = useGetHotelQuery()

  return (
    <>
      <div className="p-0 md:p-5">
        <Container>
          <div className="flex gap-5">
            <Filter />

            <ListHotel data={data}/>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelListPage;
