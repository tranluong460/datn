import moment from "moment";

import { Drawer, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

type InformationProps = {
  name: string;
  phone: string;
  address: string;
  birthday: string;
  image: string;
};

type InfoUser = {
  email: string;
  role: string;
  id_information: InformationProps;
  createdAt: string;
};

type InfoDrawnProps = {
  info: InfoUser | undefined;
  isOpen: boolean;
  onClosed: () => void;
};

const InfoDrawn = ({ info, isOpen, onClosed }: InfoDrawnProps) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên",
      children: info?.id_information.name,
      span: 2,
    },
    {
      key: "2",
      label: "Email",
      children: info?.email,
      span: 2,
    },
    {
      key: "3",
      label: "Số điện thoại",
      children: info?.id_information.phone,
      span: 2,
    },
    {
      key: "4",
      label: "Địa chỉ",
      children: info?.id_information.address,
      span: 2,
    },
    {
      key: "5",
      label: "Ngày sinh",
      children: info?.id_information.birthday,
      span: 2,
    },
    {
      key: "6",
      label: "Ngày tạo",
      children: moment(info?.createdAt).format("DD/MM/YYYY"),
      span: 2,
    },
  ];

  return (
    <Drawer
      title={info?.id_information.name}
      placement="right"
      size="large"
      open={isOpen}
      closable={false}
      onClose={onClosed}
    >
      <Descriptions title="Thông tin người dùng" bordered items={items} />
    </Drawer>
  );
};

export default InfoDrawn;
