import { useGetAllRoomQuery } from "../../../api";
import { DatePicker, Space } from "antd";
const EmptyRoom = () => {
  const { data } = useGetAllRoomQuery("");
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <Space direction="vertical" className="flex">
        <div className="flex gap-2 items-center">
          <DatePicker onChange={onChange} /> <p>thời gian từ: 26/04/2024</p>
        </div>
        <div className="flex gap-2 items-center">
          <DatePicker onChange={onChange} /> <p>đến gian từ: 27/04/2024</p>
        </div>
      </Space>
      {data?.data.map((room) => {
        return (
          <div className="flex items-center">
            <p className="w-[150px]  py-2">{room.id_roomType.name}</p>
            <div className="flex gap-2">
              {room.list_rooms.map((ls) => {
                return (
                  <div
                    className={`text-white p-4  mt-2 ${
                      ls.status ? "bg-blue-500" : "bg-red-500"
                    }`}
                  >
                    <p>{ls.room}</p>
                  </div>
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
