import { Container, RoomCard } from "../..";

interface RoomData {
  _id: string;
  images: {
    url: string;
  }[];
  quantity: number;
  price: number;
  status: string;
  description: string;
  id_amenities: string[];
  id_hotel: string;
  id_roomType: string;
  createdAt: string;
  updatedAt: string;
}

type RoomListProps = {
  listRoom: RoomData[];
};

const RoomList = ({ listRoom }: RoomListProps) => {
  return (
    <>
      <div className="w-full mt-5">
        <Container>
          <div className="relative overflow-hidden transform translate-x-0 translate-y-0 translate-z-0">
            <div className="transform translate-x-0 translate-y-0 translate-z-0 transition-all duration-0 ease-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {listRoom?.map((room: RoomData) => (
                <RoomCard room={room} key={room?._id} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RoomList;
