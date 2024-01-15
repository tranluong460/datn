import { useState } from "react";
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
import { useGetAllBookingQuery } from "../../../api";
import { DatePicker } from "antd";

function TransactionChart() {
  const { data } = useGetAllBookingQuery('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleSearch = () => {
    const paymentData = data?.data;

    if (paymentData && paymentData.length > 0) {
      const filteredPayment = paymentData.filter(
        (booking: any) =>
          booking.status === "Thành Công" &&
          new Date(booking.createdAt).getFullYear() == selectedYear?.$y
      );

      const totalRevenueByMonth = filteredPayment.reduce((acc: any, curr: any) => {
        const month = new Date(curr.createdAt).getMonth() + 1;
        acc[month] = (acc[month] || 0) + curr.total_price;
        return acc;
      }, {});

      const newChartData: any = Object.keys(totalRevenueByMonth).map((month) => ({
        name: `Tháng ${month}`,
        DoanhThu: totalRevenueByMonth[month],
      }));

      setChartData(newChartData);
    }
  };

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
          <DatePicker
            picker="year"
            id="yearInput"
            value={selectedYear}
            onChange={(date) => setSelectedYear(date)}
          />
          <button onClick={handleSearch} className="ml-2 bg-blue-400 text-white p-1">
            Tìm kiếm
          </button>
        </div>
        {chartData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
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
              <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="DoanhThu" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="font-medium text-center text-xl mt-3">
            <h2>Không có dữ liệu</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionChart;
