import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Button, Popconfirm, Space, Table, message } from "antd";

import {
  useDeleteAmenitiesMutation,
  useGetAllAmenitiesQuery,
  useGetAmenitiesByIdQuery,
} from "../../../api/amenities";
import { CreateAmenitiesModal, EditAmenitiesModal } from "../../../components";

interface FeaturesProps {
  _id: string;
  name: string;
  surcharge: boolean;
}

interface DataType {
  _id: string;
  name: string;
  features: FeaturesProps[];
  createdAt: string;
  updatedAt: string;
}

const AmenitiesManager = () => {
  const key0 = "deleteAmenitiesMutation";
  const [messageApi, contextHolder] = message.useMessage();

  const [currentItem, setCurrentItem] = useState(5);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idAmenities, setIdAmenities] = useState("");

  const { data, isSuccess } = useGetAllAmenitiesQuery("");
  const { data: dataOneAmenities, isFetching } =
    useGetAmenitiesByIdQuery(idAmenities);
  const [deleteAmenities] = useDeleteAmenitiesMutation();

  const onDelete = (id: string) => {
    messageApi.open({
      key: key0,
      type: "loading",
      content: "Loading...",
    });

    deleteAmenities(id)
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
      title: "Tên tiện ích",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi tiết",
      dataIndex: "features",
      key: "features",
      render: (features) => (
        <Button onClick={() => console.log(features)}>features</Button>
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
                setIdAmenities(_id);
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
        loading={!isSuccess}
        pagination={paginationConfig}
      />

      <CreateAmenitiesModal
        isOpenCreate={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
      />

      <EditAmenitiesModal
        key={dataOneAmenities?.data._id}
        isOpenEdit={showEditModal}
        onCancel={() => setShowEditModal(false)}
        data={dataOneAmenities?.data}
        loading={isFetching}
      />
    </>
  );
};

export default AmenitiesManager;
