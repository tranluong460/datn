import moment from "moment";

import { Button, Descriptions, Drawer, Image, Spin } from "antd";
import type { DescriptionsProps } from "antd";

import { useGetOneRoomQuery } from "../../../api/room";

type RoomDrawnProps = {
  idRoom: string;
  openRoomDrawn: boolean;
  onClosedRoomDrawn: () => void;
};

const RoomDrawn = ({
  idRoom,
  openRoomDrawn,
  onClosedRoomDrawn,
}: RoomDrawnProps) => {
  const { data, isFetching } = useGetOneRoomQuery(idRoom);

  const imgList: string[] = [];
  data?.data?.images &&
    data.data.images.forEach((item: { url: string }) => {
      imgList.push(item.url);
    });

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Số lượng",
      children: data?.data?.quantity,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "2",
      label: "Giá",
      children: data?.data?.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    // {
    //   key: "7",
    //   label: "Tiện nghi",
    //   children: (
    //     <>
    //       <Button type="link" onClick={() => setOpenDrawnAmenities(true)}>
    //         Xem chi tiết
    //       </Button>
    //       <TwoDrawnAmenities
    //         dataAmenities={data?.data?.id_amenities}
    //         openDrawnAmenities={openDrawnAmenities}
    //         isClosedDrawnAmenities={() => setOpenDrawnAmenities(false)}
    //       />
    //     </>
    //   ),
    //   span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    // },
    // {
    //   key: "8",
    //   label: "Phòng",
    //   children: (
    //     <>
    //       <Button type="link" onClick={() => setOpenDrawnRoom(true)}>
    //         Xem chi tiết
    //       </Button>
    //       <TwoDrawnRoom
    //         dataRoom={data?.data?.id_room}
    //         openDrawnRoom={openDrawnRoom}
    //         isClosedDrawnRoom={() => setOpenDrawnRoom(false)}
    //       />
    //     </>
    //   ),
    //   span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    // },
    {
      key: "9",
      label: "Mô tả",
      children: (
        <>
          <Button
            type="link"
            // onClick={() => setOpenDrawnDescription(true)}
          >
            Xem chi tiết
          </Button>
          {/* <TwoDrawnDescription
            dataDescription={data?.data?.description}
            openDrawnDescription={openDrawnDescription}
            isClosedDrawnDescription={() => setOpenDrawnDescription(false)}
          /> */}
        </>
      ),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "10",
      label: "Trạng thái",
      children: data?.data?.status,
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
    {
      key: "11",
      label: "Ngày tạo",
      children:
        data?.data?.createdAt &&
        moment(data?.data?.createdAt).format("DD/MM/YYYY"),
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    },
  ];

  return (
    <Drawer
      title={isFetching ? "" : data?.data?.name}
      placement="right"
      size="large"
      open={openRoomDrawn}
      closable={false}
      onClose={onClosedRoomDrawn}
    >
      {isFetching ? (
        <div className="flex items-center justify-center h-full">
          <Spin spinning={isFetching} />
        </div>
      ) : (
        <Descriptions title="Thông tin phòng" bordered items={items} />
      )}
    </Drawer>
  );
};

export default RoomDrawn;
