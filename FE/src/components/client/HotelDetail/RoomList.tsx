import { Container, RoomCard } from "../..";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IRoom } from "../../../interface";
import { useState } from "react";

type RoomListProps = {
  listRoom: IRoom[];
};

const RoomList = ({ listRoom }: RoomListProps) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextRooms = () => {
    const nextIndex = startIndex + 1;
    if (nextIndex <= listRoom.length - 3) {
      setStartIndex(nextIndex);
    }
  };

  const prevRooms = () => {
    const prevIndex = Math.max(0, startIndex - 1);
    setStartIndex(prevIndex);
  };

  const showArrows = listRoom.length >= 3;

  return (
    <>
      <div className="w-full mt-5 relative">
        <Container>
          <div className="relative ">
            <div className="grid grid-cols-3 gap-4 transition-transform duration-500 ease-in-out overflow-hidden">
              {listRoom.length > 0 ? (
                listRoom
                  .slice(startIndex, startIndex + 3)
                  .map((room, index) => (
                    <div
                      key={room?._id}
                      className={`relative ${index === 1 ? "z-10" : ""}`}
                    >
                      <RoomCard room={room} />
                    </div>
                  ))
              ) : (
                <p>Chưa có thông tin phòng</p>
              )}
              {showArrows && (
                <div>
                  <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center ">
                    <button
                      onClick={prevRooms}
                      disabled={startIndex === 0}
                      className={`transition-all duration-500 transform translate-x-[-25px] rounded-[50%] px-[7px] py-[4px] w-[56px] h-[56px] z-[100%] ${
                        startIndex === 0 ? "bg-white" : "bg-[#f2a900]"
                      } hover:bg-yellow active:bg-white px-2 py-1 rounded mr-4`}
                    >
                      <AiOutlineArrowLeft className="ml-3" />
                    </button>
                  </div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center z-[100%]">
                    <button
                      onClick={nextRooms}
                      disabled={startIndex + 3 >= listRoom.length}
                      className={`transition-all duration-500 transform translate-x-[25px] rounded-[50%] px-[7px] py-[4px] w-[56px] h-[56px] z-[100%] ${
                        startIndex + 3 >= listRoom.length
                          ? "bg-white"
                          : "bg-[#f2a900]"
                      } hover:bg-yellow active:bg-white px-2 py-1 rounded`}
                    >
                      <AiOutlineArrowRight className="ml-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default RoomList;
