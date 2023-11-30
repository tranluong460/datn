import { useState } from "react";
import { Counter } from "../..";
import { IRoom } from "../../../interface";

type RoomBookingProps = {
  room: IRoom;
  total: number;
  selectRoom: string[];
  setTotal: (value: number) => void;
  setSelectRoom: (value: string[]) => void;
};

const RoomBooking = ({
  room,
  setTotal,
  total,
  selectRoom,
  setSelectRoom,
}: RoomBookingProps) => {
  const [value, setValue] = useState(0);

  const handleQuantityChange = (newValue: number) => {
    const currentValue = value;

    setValue(newValue);

    if (newValue === 0) {
      setSelectRoom(selectRoom.filter((id) => id !== room._id));
    } else {
      if (!selectRoom.includes(room._id)) {
        setSelectRoom([...selectRoom, room._id]);
      }
    }

    const roomTotal = room.price * newValue;
    const newRoomTotal = roomTotal - room.price * currentValue;

    setTotal(total + newRoomTotal);
  };

  return (
    <div className="flex p-3 mt-5 mb-4 gap-3 rounded-lg bg-light dark:bg-dark">
      <div className="no-underline p-3">
        <img
          src={room?.images[0].url}
          alt={room._id}
          className="rounded-md w-full xl:h-48 md:h-44 object-contain"
        />
      </div>

      <div>{room.id_roomType.name}</div>
      <div>
        {room.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
        /đêm
      </div>
      <div>
        <Counter
          title="Số lượng"
          value={value}
          onChange={handleQuantityChange}
          min={0}
        />
      </div>
    </div>
  );
};

export default RoomBooking;
