import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Button, Space, Table, Tag, Tooltip } from "antd";

import { IHotel } from "../../../interface";
import { useGetAllHotelQuery, useGetOneHotelQuery } from "../../../api";
import {
  CreateHotelModal,
  EditHotelModal,
  HotelDrawn,
} from "../../../components";

const HotelManager = () => {
  const [idHotel, setIdHotel] = useState("");
  const [idHotelEdit, setIdHotelEdit] = useState("");

  const [openHotelDrawn, setOpenHotelDrawn] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: allHotel, isLoading } = useGetAllHotelQuery("");
  const { data: oneHotel, isFetching } = useGetOneHotelQuery(idHotelEdit);

  const onClosedHotelDrawn = () => {
    setOpenHotelDrawn(false);
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
      title: "Tên khách sạn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đang hoạt động" ? "#87d068" : "#f70000"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, { _id }) => (
        <>
          <Space>
            <Button
              onClick={() => {
                setShowEditModal(true);
                setIdHotelEdit(_id);
              }}
            >
              Sửa
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
        title={() => (
          <div className="flex items-center justify-end">
            <Button onClick={() => setShowCreateModal(true)}>Thêm mới</Button>
          </div>
        )}
        bordered
        rowKey="_id"
        columns={columns}
        dataSource={allHotel?.data}
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

      <CreateHotelModal
        isOpenCreate={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
      />

      <EditHotelModal
        key={oneHotel?.data._id}
        isOpenEdit={showEditModal}
        data={oneHotel?.data}
        loading={isFetching}
        onCancel={() => setShowEditModal(false)}
      />
    </>
  );
};

export default HotelManager;
