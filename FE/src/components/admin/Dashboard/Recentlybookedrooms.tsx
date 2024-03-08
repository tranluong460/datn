import { useEffect, useState } from "react";
import { useGetAllBookingQuery } from "../../../api";
import { DatePicker } from "antd";

export default function RecentRooms() {
  const { RangePicker } = DatePicker;

  const { data: bookings } = useGetAllBookingQuery("");
  const [top5, setTop5] = useState<any>([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const handleCick = () => {
    if (selectedRange && bookings?.data) {
      const [startDate, endDate]: any = selectedRange;

      const roomBooking = bookings?.data.filter((booking: any) => {
        const bookingDate = new Date(booking.createdAt);
        return (
          booking.status === "Thành công" &&
          bookingDate >= startDate &&
          bookingDate <= endDate
        );
      });
      // Tạo một đối tượng để theo dõi số lần xuất hiện của từng phòng
      const roomCountMap: any = {};

      for (const booking of roomBooking) {
        for (const room of booking?.list_room || []) {
          const roomId = room.idRoom?._id; // Giả sử roomId là một trường duy nhất để định danh phòng
          const quantity = room.quantity || 0; // Số lượng mặc định là 1 nếu không có trường quantity

          // Kiểm tra xem đã có phòng với roomId trong roomCountMap hay chưa
          if (!roomCountMap[roomId]) {
            // Nếu chưa có, tạo một đối tượng mới cho roomId
            roomCountMap[roomId] = {
              count: 0,
              name: room?.idRoom?.id_roomType?.name,
              price: room?.idRoom?.price,
            };
          }

          // Cộng số lượng và tăng count của phòng đó
          roomCountMap[roomId].count += quantity;
          roomCountMap[roomId].total =
            roomCountMap[roomId].count * roomCountMap[roomId].price;
        }
      }

      // Chuyển đối tượng đếm thành một mảng các đối tượng phòng để sắp xếp
      const roomCountArray = Object.values(roomCountMap);

      // Sắp xếp mảng theo số lần xuất hiện giảm dần
      roomCountArray.sort((a: any, b: any) => b.count - a.count);

      // Chọn top 5 phòng
      const topRooms = roomCountArray.slice(0, 5);
      setTop5(topRooms);
    } else {
      const roomBooking = bookings?.data?.filter(
        (item: any) => item.status == "Thành công"
      );
      // Tạo một đối tượng để theo dõi số lần xuất hiện của từng phòng

      const roomCountMap: any = {};
      for (const booking of roomBooking || []) {
        for (const room of booking?.list_room || []) {
          const roomId = room?.idRoom?._id; // Giả sử roomId là một trường duy nhất để định danh phòng
          const quantity = room.quantity || 0; // Số lượng mặc định là 1 nếu không có trường quantity
          // Kiểm tra xem đã có phòng với roomId trong roomCountMap hay chưa
          if (!roomCountMap[roomId]) {
            // Nếu chưa có, tạo một đối tượng mới cho roomId
            roomCountMap[roomId] = {
              count: 0,
              name: room.idRoom?.id_roomType?.name,
              price: room.idRoom?.price,
            };
          }

          // Cộng số lượng và tăng count của phòng đó
          roomCountMap[roomId].count += quantity;
          roomCountMap[roomId].total =
            roomCountMap[roomId].count * roomCountMap[roomId].price;
        }
      }

      // Chuyển đối tượng đếm thành một mảng các đối tượng phòng để sắp xếp
      const roomCountArray = Object.values(roomCountMap);

      // Sắp xếp mảng theo số lần xuất hiện giảm dần
      roomCountArray.sort((a: any, b: any) => b.count - a.count);

      // Chọn top 5 phòng
      const topRooms = roomCountArray.slice(0, 5);
      setTop5(topRooms);
    }
  };
  useEffect(() => {
    handleCick();
  }, [bookings]);
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">
        Top 5 phòng được đặt nhiều nhất
      </strong>
      <div>
        <div className="m-3">
          <label htmlFor="dateRangeInput" className="mr-2">
            Chọn khoảng ngày:
          </label>
        </div>
        <RangePicker
          id="dateRangeInput"
          value={selectedRange}
          onChange={(dates: any) => setSelectedRange(dates)}
          style={{ width: "50%" }}
        />
        <button
          onClick={handleCick}
          className="ml-2 bg-blue-400 text-white p-1"
        >
          Tìm kiếm
        </button>
      </div>
      <div className="mt-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 text-center border-b px-4">STT</th>
              <th className="py-2 text-center border-b px-4">Name</th>
              <th className="py-2 text-center border-b px-4">Price</th>
              <th className="py-2 text-center border-b px-4">quantity</th>
              <th className="py-2 text-center border-b px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {top5.map((booking: any, index: number) => (
              <tr key={index} className="border-b">
                <td className=" py-2  text-[red] text-center">{index + 1}</td>
                <td className="text-center">{booking?.name}</td>
                <td className="text-center">
                  {booking.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="text-center">{booking?.count}</td>
                <td className="text-center">
                  {booking.total?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
