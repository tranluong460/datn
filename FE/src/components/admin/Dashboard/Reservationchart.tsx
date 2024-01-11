import React, { useState } from "react";
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
import { useGetAllPaymentQuery } from "../../../api/payment";
import { useGetAllBookingQuery } from "../../../api";

// const { data: payment } = useGetAllPaymentQuery('')


// const data = [
//   {
//     name: "Tháng 1",
//     DoanhThu: 4000,
//     EmptyRoom: 2400,
//   },
//   {
//     name: "Tháng 2",
//     DoanhThu: 3000,
//     EmptyRoom: 1398,
//   },
//   {
//     name: "Tháng 3",
//     DoanhThu: 2000,
//     EmptyRoom: 9800,
//   },
//   {
//     name: "Tháng 4",
//     DoanhThu: 2780,
//     EmptyRoom: 3908,
//   },
//   {
//     name: "Tháng 5",
//     DoanhThu: 1890,
//     EmptyRoom: 4800,
//   },
//   {
//     name: "Tháng 6",
//     DoanhThu: 2780,
//     EmptyRoom: 3908,
//   },
//   {
//     name: "Tháng 7",
//     DoanhThu: 3490,
//     EmptyRoom: 4300,
//   },
//   {
//     name: "Tháng 8",
//     DoanhThu: 2000,
//     EmptyRoom: 9800,
//   },
//   {
//     name: "Tháng 9",
//     DoanhThu: 4000,
//     EmptyRoom: 2400,
//   },
//   {
//     name: "Tháng 10",
//     DoanhThu: 4000,
//     EmptyRoom: 2400,
//   },
//   {
//     name: "Tháng 11",
//     DoanhThu: 4000,
//     EmptyRoom: 2400,
//   },
//   {
//     name: "Tháng 12",
//     DoanhThu: 3490,
//     EmptyRoom: 4300,
//   },
// ];

function TransactionChart() {
  const { data } = useGetAllBookingQuery('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const handleSearch = () => {
    const paymentData = data?.data;

    if (paymentData && paymentData.length > 0) {
      const filteredPayment = paymentData.filter(
        (booking: any) =>
          booking.status === "Thành Công" &&
          new Date(booking.createdAt).getFullYear() === selectedYear
      );

      const totalRevenueByMonth = filteredPayment.reduce((acc: any, curr: any) => {
        const month = new Date(curr.createdAt).getMonth() + 1;
        acc[month] = (acc[month] || 0) + curr.total_price;
        return acc;
      }, {});

      const newChartData = Object.keys(totalRevenueByMonth).map((month) => ({
        name: `Tháng ${month}`,
        DoanhThu: totalRevenueByMonth[month],
      }));

      setChartData(newChartData);
    }
  };

  // const chartData = calculateTotalRevenueByMonth();
  console.log(chartData);
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 mb-3">
      <strong className="text-gray-700 font-medium">
        Doanh thu trong 12 tháng
      </strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <div>
          <label htmlFor="yearInput" className="mr-2">
            Năm:
          </label>
          <input
            type="number"
            id="yearInput"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
          <button onClick={handleSearch} className="ml-2 bg-blue-400 text-white p-1">
            Tìm kiếm
          </button>
        </div>
        {chartData?.length > 0 ? (<ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDashrray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="DoanhThu" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>) : (<div className="font-medium text-center text-xl mt-3"><h2>Không có dữ liệu</h2></div>)}
      </div>
    </div>
  );
}

export default TransactionChart;