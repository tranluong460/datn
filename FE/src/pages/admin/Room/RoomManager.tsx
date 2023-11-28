import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Button, Space, Table, Tag, Tooltip } from "antd";

import { useGetAllRoomQuery, useGetOneRoomQuery } from "../../../api";
import { CreateRoomModal, EditRoomModal, RoomDrawn } from "../../../components";
import { IRoom } from "../../../interface";

const RoomManager = () => {
  const [idRoom, setIdRoom] = useState("");
  const [idRoomEdit, setIdRoomEdit] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(5);
  const [openRoomDrawn, setOpenRoomDrawn] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: oneRoom, isFetching } = useGetOneRoomQuery(idRoomEdit);
  const { data: allRoom, isLoading } = useGetAllRoomQuery("");

  const onClosedRoomDrawn = () => {
    setOpenRoomDrawn(false);
  };

  const columns: ColumnsType<IRoom> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Tooltip placement="right" title="Click để xem thông tin chi tiết">
          <button
            onClick={() => {
              setOpenRoomDrawn(true);
              setIdRoom(_id);
            }}
          >
            {_id}
          </button>
        </Tooltip>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="#87d068">{status}</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, { _id }) => (
        <Space>
          <Button
            onClick={() => {
              setShowEditModal(true);
              setIdRoomEdit(_id);
            }}
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: currentItem,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
    onShowSizeChange: (_current: number, size: number) => {
      setCurrentItem(size);
    },

    showTotal: (total: number, range: number[]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
  };

  return (
    <>
      <Table
        title={() => (
          <>
            <Button onClick={() => setShowCreateModal(true)}>Thêm mới</Button>
          </>
        )}
        rowKey="_id"
        columns={columns}
        dataSource={allRoom?.data}
        loading={isLoading}
        pagination={paginationConfig}
      />

      {idRoom && (
        <RoomDrawn
          idRoom={idRoom}
          openRoomDrawn={openRoomDrawn}
          onClosedRoomDrawn={onClosedRoomDrawn}
        />
      )}

      <CreateRoomModal
        isOpenCreate={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
      />

      <EditRoomModal
        key={oneRoom?.data._id}
        isOpenEdit={showEditModal}
        data={oneRoom?.data}
        loading={isFetching}
        onCancel={() => setShowEditModal(false)}
      />
    </>
  );
};

export default RoomManager;
