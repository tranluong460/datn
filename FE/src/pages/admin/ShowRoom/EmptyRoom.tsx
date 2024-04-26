import { useGetAllRoomQuery } from "../../../api";

const EmptyRoom = () => {
  const { data } = useGetAllRoomQuery("");

  return (
    <div>
      {data?.data.map((room) => {
        return (
          <div className="flex items-center gap-1">
            <p>{room.id_roomType.name}</p>
            <div className="flex flex-col">
              {room.list_rooms.map((ls) => {
                return (
                  <p>
                    {ls.room} - {ls.status ? "True" : "False"}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmptyRoom;
