import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  desription:string,
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'desription',
    width: '30%',
  },
  {
    title:"Thao tác",
    width: '30%',
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    address: 'New York No. 1 Lake Park',
    desription:"desription",
  },
  {
    key: '2',
    name: 'Jim Green',
    address: 'London No. 1 Lake Park',
    desription:"desription",
  },
  {
    key: '3',
    name: 'Joe Black',
    address: 'Sydney No. 1 Lake Park',
    desription:"desription",
  },
  {
    key: '4',
    name: 'Jim Red',
    address: 'London No. 2 Lake Park',
    desription:"desription",
  },

];


const HotelManager = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default HotelManager;
