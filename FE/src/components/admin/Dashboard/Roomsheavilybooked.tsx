import { useEffect, useState } from "react";
import { useGetAllBookingQuery } from "../../../api";
import { DatePicker } from "antd";



function Roomsheavilybooked() {
  const { RangePicker } = DatePicker;
  const [selectedRange, setSelectedRange] = useState(null);
  const { data: bookings } = useGetAllBookingQuery('');
  const [topCustomers, setTopCustomers] = useState([]);


  const handleCick = () => {
    if (selectedRange && bookings?.data) {
      const [startDate, endDate]: any = selectedRange;
      const bookedRoom = bookings?.data?.filter((booking: any) => {
        const bookingDate = new Date(booking.createdAt);
        return (
          booking.status === "Thành công" &&
          bookingDate >= startDate &&
          bookingDate <= endDate
        );
      })
      // Tính tổng số lượng phòng của từng khách hàng
      const customerBookings = bookedRoom.reduce((acc: any, booking: any) => {
        const customerId = booking.id_user?._id; // Thay thế bằng thuộc tính thực tế đại diện cho ID khách hàng
        const customerName = booking.id_user?.id_information?.name; // Thêm thông tin tên khách hàng

        // Tính tổng số lượng phòng trong đặt hàng
        const totalRoomsInBooking = booking?.list_room?.reduce((sum: any, room: any) => sum + room.quantity, 0);

        if (!acc[customerId]) {
          acc[customerId] = {
            id: customerId,
            name: customerName,
            totalRooms: 0,
          };
        }

        acc[customerId].totalRooms += totalRoomsInBooking; // Thêm số lượng phòng đặt vào tổng số phòng
        return acc;
      }, {}) || {};

      // Sắp xếp khách hàng theo số lượng phòng đặt giảm dần
      const sortedCustomers: any = Object.values(customerBookings).sort(
        (a: any, b: any) => b.totalRooms - a.totalRooms
      );

      // Lấy top 5 khách hàng
      const top5Customers = sortedCustomers.slice(0, 5);

      setTopCustomers(top5Customers);
    } else {
      const bookedRoom = bookings?.data?.filter((booking: any) => {
        return (
          booking.status === "Thành công"
        );
      })
      // console.log(bookedRoom)
      // Tính tổng số lượng phòng của từng khách hàng
      const customerBookings = bookedRoom?.reduce((acc: any, booking: any) => {
        const customerId = booking.id_user?._id;
        const customerName = booking.id_user?.id_information?.name;
        const totalRoomsInBooking = booking.list_room.reduce((sum: any, room: any) => sum + room.quantity, 0);

        if (!acc[customerId]) {
          acc[customerId] = {
            id: customerId,
            name: customerName,
            totalRooms: 0,
          };
        }

        acc[customerId].totalRooms += totalRoomsInBooking;
        return acc;
      }, {}) || {};


      // Sắp xếp khách hàng theo số lượng phòng đặt giảm dần
      const sortedCustomers: any = Object.values(customerBookings).sort(
        (a: any, b: any) => b.totalRooms - a.totalRooms
      );

      // Lấy top 5 khách hàng
      const top5Customers = sortedCustomers.slice(0, 5);

      setTopCustomers(top5Customers);
    }
  }

  useEffect(() => {
    handleCick()
  }, [bookings]);
  // console.log(topCustomers);
  return (
    <div className="w-[30rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">
        Top 5 khách hàng đặt phòng nhiều nhất
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
          style={{ width: '70%' }}
        />
        <button onClick={handleCick} className="ml-2 bg-blue-400 text-white p-1">
          Tìm kiếm
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Tên khách hàng</th>
              <th className="py-2 px-4 border-b">Số lượng đặt phòng</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer: any) => (
              <tr key={customer.id} className="border-b text-center">
                <td className="py-2 px-4">{customer.name}</td>
                <td className="py-2 px-4">{customer.totalRooms}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Roomsheavilybooked;
