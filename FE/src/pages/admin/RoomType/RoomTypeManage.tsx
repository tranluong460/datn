import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Table, Space, Button, Popconfirm, message } from "antd";

import {
  useDeleteRoomTypeMutation,
  useGetAllRoomTypeQuery,
  useGetOneRoomTypeQuery,
} from "../../../api/roomType";
import { CreateRoomTypeModal, EditRoomTypeModal } from "../../../components";

interface DataType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const RoomTypeManage = () => {
  const key0 = "deleteAmenitiesMutation";
  const [messageApi, contextHolder] = message.useMessage();
  const [currentItem, setCurrentItem] = useState(5);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idRoomType, setIdRoomType] = useState("");

  const { data, isLoading } = useGetAllRoomTypeQuery("");
  const { data: dataOneRoomType, isFetching } =
    useGetOneRoomTypeQuery(idRoomType);
  const [deleteRoomType] = useDeleteRoomTypeMutation();

  const onDelete = (id: string) => {
    messageApi.open({
      key: key0,
      type: "loading",
      content: "Loading...",
    });

    deleteRoomType(id)
      .unwrap()
      .then((response) => {
        messageApi.open({
          key: key0,
          type: "success",
          content: response.message,
          duration: 2,
        });
      })
      .catch((error) => {
        messageApi.open({
          key: key0,
          type: "error",
          content: error.data.message,
          duration: 2,
        });
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên loại phòng",
      dataIndex: "name",
      key: "name",
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
                setIdRoomType(_id);
              }}
            >
              Sửa
            </Button>

            <Popconfirm
              placement="left"
              title="Bạn có chắc chắn muốn xóa tiện ích này không?"
              description="Hành động này không thể hoàn tác."
              onConfirm={() => onDelete(_id)}
              okText="Đồng ý"
              okType="danger"
              cancelText="Hủy"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Space>
        </>
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
      {contextHolder}

      <Table
        title={() => (
          <>
            <Button onClick={() => setShowCreateModal(true)}>Thêm mới</Button>
          </>
        )}
        rowKey="_id"
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={paginationConfig}
      />

      <CreateRoomTypeModal
        isOpenCreate={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
      />

      <EditRoomTypeModal
        key={dataOneRoomType?.data._id}
        isOpenEdit={showEditModal}
        onCancel={() => setShowEditModal(false)}
        data={dataOneRoomType?.data}
        loading={isFetching}
      />
    </>
  );
};

export default RoomTypeManage;
