import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "20%",
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "30%",
  },
  {
    title: "Thao tác",
    width: "30%",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    address: "New York No. 1 Lake Park",
    description: "description",
  },
  {
    key: "2",
    name: "Jim Green",
    address: "London No. 1 Lake Park",
    description: "description",
  },
  {
    key: "3",
    name: "Joe Black",
    address: "Sydney No. 1 Lake Park",
    description: "description",
  },
  {
    key: "4",
    name: "Jim Red",
    address: "London No. 2 Lake Park",
    description: "description",
  },
];

const HotelManager = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default HotelManager;
