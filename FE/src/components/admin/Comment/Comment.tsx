import { useState } from "react";
import moment from "moment";
import type { ColumnsType } from "antd/es/table";
import { Button, Select, Space, Table, Tooltip, message } from "antd";

import { IHotel } from "../../../interface";
import {
  useGetAllReviewQuery,
  useGetOneReviewQuery,
  useDeleteReviewMutation,
} from "../../../api";
import {
  CreateHotelModal,
  EditHotelModal,
  HotelDrawn,
} from "../../../components";

const Comment = () => {
  const [idHotel, setIdHotel] = useState("");
  const [idHotelEdit, setIdHotelEdit] = useState("");
  const [openHotelDrawn, setOpenHotelDrawn] = useState(false);

  const { data: allReview, isLoading } = useGetAllReviewQuery("");
  console.log("🚀 ~ Comment ~ allReview:", allReview);
  const { data: oneReview, isFetching } = useGetOneReviewQuery(idHotelEdit);
  const [deleteReview] = useDeleteReviewMutation();

  const onClosedHotelDrawn = () => {
    setOpenHotelDrawn(false);
  };
  const handleChange = (value: string) => {
    deleteReview({ _id })
      .unwrap()
      .then(() => {
        message.success("Cập nhật trạng thái thành công");
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const columns: ColumnsType<IHotel> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Tooltip placement="right" title="Click để xem thông tin chi tiết">
          <button
            onClick={() => {
              setOpenHotelDrawn(true);
              setIdHotel(_id);
            }}
          >
            {_id}
          </button>
        </Tooltip>
      ),
    },
    {
      title: "Tên Người dùng",
      dataIndex: "id_user",
      key: "id_user",
      render: (user) => {
        return <p className="font-bold">{user.email}</p>;
      },
    },
    {
      title: "Nội dung comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Thời gian comment",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return <span>{moment(createdAt).format("YYYY-MM-DD | HH:mm:ss")}</span>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, { _id }) => (
        <>
          <Space>
            <Button
              onClick={() => {
                deleteReview(_id);
              }}
            >
              Xóa
            </Button>
          </Space>
        </>
      ),
    },
  ];

  const [currentItem, setCurrentItem] = useState(10);
  const paginationConfig = {
    pageSize: currentItem,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "50"],
    onShowSizeChange: (_current: number, size: number) => {
      setCurrentItem(size);
    },

    showTotal: (total: number, range: number[]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
  };

  return (
    <>
      <Table
        bordered
        rowKey="_id"
        columns={columns}
        dataSource={allReview?.data}
        loading={isLoading}
        pagination={paginationConfig}
      />

      {idHotel && (
        <HotelDrawn
          idHotel={idHotel}
          openHotelDrawn={openHotelDrawn}
          onClosedHotelDrawn={onClosedHotelDrawn}
        />
      )}
    </>
  );
};

export default Comment;
