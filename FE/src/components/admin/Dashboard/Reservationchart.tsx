import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Tháng 1",
    RoomisBooked: 4000,
    EmptyRoom: 2400,
  },
  {
    name: "Tháng 2",
    RoomisBooked: 3000,
    EmptyRoom: 1398,
  },
  {
    name: "Tháng 3",
    RoomisBooked: 2000,
    EmptyRoom: 9800,
  },
  {
    name: "Tháng 4",
    RoomisBooked: 2780,
    EmptyRoom: 3908,
  },
  {
    name: "Tháng 5",
    RoomisBooked: 1890,
    EmptyRoom: 4800,
  },
  {
    name: "Tháng 6",
    RoomisBooked: 2780,
    EmptyRoom: 3908,
  },
  {
    name: "Tháng 7",
    RoomisBooked: 3490,
    EmptyRoom: 4300,
  },
  {
    name: "Tháng 8",
    RoomisBooked: 2000,
    EmptyRoom: 9800,
  },
  {
    name: "Tháng 9",
    RoomisBooked: 4000,
    EmptyRoom: 2400,
  },
  {
    name: "Tháng 10",
    RoomisBooked: 4000,
    EmptyRoom: 2400,
  },
  {
    name: "Tháng 11",
    RoomisBooked: 4000,
    EmptyRoom: 2400,
  },
  {
    name: "Tháng 12",
    RoomisBooked: 3490,
    EmptyRoom: 4300,
  },
];

function TransactionChart() {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">
        Phòng được đặt trong 12 tháng
      </strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDashrray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="RoomisBooked" fill="#0ea5e9" />
            <Bar dataKey="EmptyRoom" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TransactionChart;
