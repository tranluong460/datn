import moment from "moment";
import { useState } from "react";
import { Button, Descriptions, Drawer, Spin } from "antd";
import type { DescriptionsProps } from "antd";

import { IBooking } from "../../../interface";
import TwoDrawnBookingRoom from "./TwoDrawnBookingRoom";

type InfoBookingDrawnProps = {
  info: IBooking | undefined;
  isOpen: boolean;
  loading: boolean;
  onClosed: () => void;
};

const InfoBookingDrawn = ({
  info,
  isOpen,
  loading,
  onClosed,
}: InfoBookingDrawnProps) => {
  const [openDrawnBookingRoom, setOpenDrawnBookingRoom] = useState(false);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Ngày nhận",
      children: moment(info?.check_in).format("DD/MM/YYYY"),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "2",
      label: "Ngày trả",
      children: moment(info?.check_out).format("DD/MM/YYYY"),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "3",
      label: "Tổng giá",
      children: info?.total_price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "4",
      label: "Phương thức thanh toán",
      children: info?.payment_method,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "5",
      label: "Danh sách phòng",
      children: (
        <>
          <Button type="link" onClick={() => setOpenDrawnBookingRoom(true)}>
            Xem chi tiết
          </Button>
          <TwoDrawnBookingRoom
            dataBookingRooms={info?.list_room}
            openDrawnRoom={openDrawnBookingRoom}
            isClosedDrawnBookingRoom={() => setOpenDrawnBookingRoom(false)}
          />
        </>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "6",
      label: "Trạng thái",
      children: info?.status,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
  ];

  return (
    <Drawer
      title={loading ? "" : "Thông tin đặt phòng"}
      placement="right"
      size="large"
      open={isOpen}
      closable={false}
      onClose={onClosed}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spin spinning={loading} />
        </div>
      ) : (
        <Descriptions title="Thông tin đặt phòng" bordered items={items} />
      )}
    </Drawer>
  );
};

export default InfoBookingDrawn;
