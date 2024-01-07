import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getRoomStatus } from "./Getroomstatus";

const recentData = [
  {
    id: "1",
    product_id: "4324",
    customer_id: "23143",
    customer_name: "Shirley A. Lape",
    booking_date: "2022-05-14T05:24:00",
    check_out_date: "2022-05-14T05:24:00",
    total: "$96.35",
    current_order_status: "PLACED",
  },
  {
    id: "7",
    product_id: "7453",
    customer_id: "96453",
    customer_name: "Ryan Carroll",
    booking_date: "2022-05-14T05:24:00",
    check_out_date: "2022-05-14T05:24:00",
    total: "$96.35",
    current_order_status: "CONFIRMED",
  },
  {
    id: "2",
    product_id: "5434",
    customer_id: "65345",
    customer_name: "Mason Nash",
    booking_date: "2022-05-14T05:24:00",
    check_out_date: "2022-05-14T05:24:00",
    total: "$96.35",
    current_order_status: "SHIPPED",
  },
  {
    id: "3",
    product_id: "9854",
    customer_id: "87832",
    customer_name: "Luke Parkin",
    booking_date: "2022-05-14T05:24:00",
    check_out_date: "2022-05-14T05:24:00",
    total: "$96.35",
    current_order_status: "SHIPPED",
  },
  {
    id: "4",
    product_id: "8763",
    customer_id: "09832",
    customer_name: "Anthony Fry",
    booking_date: "2022-05-14T05:24:00",
    check_out_date: "2022-05-14T05:24:00",
    total: "$96.35",
    current_order_status: "OUT_FOR_DELIVERY",
  },
  {
    id: "5",
    product_id: "5627",
    customer_id: "97632",
    customer_name: "Ryan Carroll",
    booking_date: "2022-05-14T05:24:00",
    check_out_date: "2022-05-14T05:24:00",
    total: "$96.35",
    current_order_status: "DELIVERED",
  },
];

export default function RecentRooms() {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">
        Trạng thái đặt phòng
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto">
        <table className="w-full text-gray-700 table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Room ID</th>
              <th className="px-4 py-2">Room Name</th>
              <th className="px-4 py-2">Booking Date</th>
              <th className="px-4 py-2">Check out date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentData.map((order, index) => (
              <tr key={order.id}>
                <td className="px-4 py-2 text-[red]">
                  <Link to={`/order/${order.id}`}>{index + 1}</Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/product/${order.product_id}`}>
                    #{order.product_id}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/customer/${order.customer_id}`}>
                    {order.customer_name}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  {format(new Date(order.booking_date), "dd MMM yyyy")}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(order.check_out_date), "dd MMM yyyy")}
                </td>
                <td className="px-4 py-2">{order.total}</td>

                <td className="px-4 py-2">
                  {getRoomStatus(order.current_order_status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
