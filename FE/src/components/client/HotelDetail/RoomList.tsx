import { Container, RoomCard } from "../..";
import { IRoom } from "../../../interface";

type RoomListProps = {
  listRoom: IRoom[];
};

const RoomList = ({ listRoom }: RoomListProps) => {
  return (
    <>
      <div className="w-full mt-5">
        <Container>
          <div className="relative overflow-hidden transform translate-x-0 translate-y-0 translate-z-0">
            <div className="transform translate-x-0 translate-y-0 translate-z-0 transition-all duration-0 ease-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {listRoom.length > 0
                ? listRoom.map((room) => (
                    <RoomCard room={room} key={room?._id} />
                  ))
                : "Chưa có thông tin phòng"}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RoomList;
