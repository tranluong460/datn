import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBookingQuery, useGetAllUserQuery } from "../../../api";

const rooms = [
  // ... (Dữ liệu phòng của bạn ở đây)
];

function Roomsheavilybooked() {
  const { data: bookings } = useGetAllBookingQuery('');
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    if (bookings && bookings.data) {
      // Tính tổng số lượng phòng của từng khách hàng
      const customerBookings = bookings.data.reduce((acc, booking) => {
        const customerId = booking.id_user?._id; // Thay thế bằng thuộc tính thực tế đại diện cho ID khách hàng
        const customerName = booking.id_user?.id_information?.name; // Thêm thông tin tên khách hàng

        // Tính tổng số lượng phòng trong đặt hàng
        const totalRoomsInBooking = booking.list_room.reduce((sum, room) => sum + room.quantity, 0);

        if (!acc[customerId]) {
          acc[customerId] = {
            name: customerName,
            totalRooms: 0,
          };
        }

        acc[customerId].totalRooms += totalRoomsInBooking; // Thêm số lượng phòng đặt vào tổng số phòng
        return acc;
      }, {});

      // Sắp xếp khách hàng theo số lượng phòng đặt giảm dần
      const sortedCustomers = Object.keys(customerBookings).sort(
        (a, b) => customerBookings[b].totalRooms - customerBookings[a].totalRooms
      );

      // Lấy top 5 khách hàng
      const top5Customers = sortedCustomers.slice(0, 5);

      setTopCustomers(top5Customers);
    }
  }, [bookings]);

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">
        Top 5 khách hàng đặt phòng nhiều nhất
      </strong>
      <div className="mt-4 flex flex-col gap-3">
        {topCustomers.map((customerId) => (
          <div key={customerId}>
            <p className="text-sm text-gray-800">{`Khách hàng ${customerId}`}</p>
            <span className="text-xs font-medium">{`${customerBookings[customerId].totalRooms} phòng đã đặt`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roomsheavilybooked;
