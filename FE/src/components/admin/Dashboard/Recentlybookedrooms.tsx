
import { useGetAllBookingQuery } from "../../../api";

export default function RecentRooms() {
  const { data: bookings, isLoading, isError } = useGetAllBookingQuery('');
  const roomBooking = bookings?.data.filter((item: any) => item.status == 'Thành Công')
  // Kiểm tra lỗi khi fetch dữ liệu
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  // Kiểm tra nếu dữ liệu không phải là mảng
  if (!Array.isArray(bookings?.data)) {
    return <div>Data is not an array</div>;
  }

  // Tạo một đối tượng để theo dõi số lần xuất hiện của từng phòng
  const roomCountMap: any = {};

  for (const booking of roomBooking) {
    for (const room of booking?.list_room || []) {
      const roomId = room.idRoom._id; // Giả sử roomId là một trường duy nhất để định danh phòng
      const quantity = room.quantity || 0; // Số lượng mặc định là 1 nếu không có trường quantity

      // Kiểm tra xem đã có phòng với roomId trong roomCountMap hay chưa
      if (!roomCountMap[roomId]) {
        // Nếu chưa có, tạo một đối tượng mới cho roomId
        roomCountMap[roomId] = {
          count: 0,
          name: room.idRoom.id_roomType?.name,
          price: room.idRoom.price,
        };
      }

      // Cộng số lượng và tăng count của phòng đó
      roomCountMap[roomId].count += quantity;
      roomCountMap[roomId].total = roomCountMap[roomId].count * roomCountMap[roomId].price;

    }
  }

  console.log(roomCountMap);

  // Chuyển đối tượng đếm thành một mảng các đối tượng phòng để sắp xếp
  const roomCountArray = Object.values(roomCountMap);

  // Sắp xếp mảng theo số lần xuất hiện giảm dần
  roomCountArray.sort((a: any, b: any) => b.count - a.count);

  // Chọn top 5 phòng
  const topRooms = roomCountArray.slice(0, 5);

  // ... (các phần mã khác)

  // Hiển thị thông tin top 5 phòng trong giao diện người dùng
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">
        Top 5 phòng được đặt nhiều nhất
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto">
        <table className="w-full text-gray-700 table-auto">
          <thead>
            <tr>
              <th className="py-2 text-center">STT</th>
              <th className="py-2 text-center">Name</th>
              <th className="py-2 text-center">Price</th>
              <th className="py-2 text-center">quantity</th>
              <th className="py-2 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {topRooms.map((booking: any, index: number) => (
              <tr key={index}>
                <td className=" py-2 text-[red] text-center">
                  {index + 1}
                </td>
                <td className="text-center">{booking.name}</td>
                <td className="text-center">{booking.price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}</td>
                <td className="text-center">{booking.count}</td>
                <td className="text-center">{booking.total?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}</td>


              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
