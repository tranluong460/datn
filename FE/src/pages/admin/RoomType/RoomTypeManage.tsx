import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Table, Space, Button, message, Select } from "antd";

import { IRoomType } from "../../../interface";
import {
  // useDeleteRoomTypeMutation,
  useGetAllRoomTypeQuery,
  useGetOneRoomTypeQuery,
  useUpdateRoomTypeMutation,
} from "../../../api";
import { CreateRoomTypeModal, EditRoomTypeModal } from "../../../components";

const RoomTypeManage = () => {
  // const key0 = "deleteAmenitiesMutation";
  // const [contextHolder] = message.useMessage();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idRoomType, setIdRoomType] = useState("");

  const { data, isLoading } = useGetAllRoomTypeQuery("");
  const [editRoomType] = useUpdateRoomTypeMutation();

  const { data: dataOneRoomType, isFetching } =
    useGetOneRoomTypeQuery(idRoomType);
  const handleChange = (value: any) => {
    editRoomType({ status: value.value, name: value.name, _id: idRoomType })
      .unwrap()
      .then(() => {
        message.success("Cập nhật trạng thái thành công");
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };
  // const [deleteRoomType] = useDeleteRoomTypeMutation();

  // const onDelete = (id: string) => {
  //   messageApi.open({
  //     key: key0,
  //     type: "loading",
  //     content: "Loading...",
  //   });

  //   deleteRoomType(id)
  //     .unwrap()
  //     .then((response) => {
  //       messageApi.open({
  //         key: key0,
  //         type: "success",
  //         content: response.message,
  //         duration: 2,
  //       });
  //     })
  //     .catch((error) => {
  //       messageApi.open({
  //         key: key0,
  //         type: "error",
  //         content: error.data.message,
  //         duration: 2,
  //       });
  //     });
  // };

  const columns: ColumnsType<IRoomType> = [
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
      title: "Trạng thái",
      key: "status",
      render: ({ _id, status, name }) => (
        <Space wrap>
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            onChange={(value) => handleChange({ value, name })}
            onClick={() => setIdRoomType(_id)}
            options={[
              { value: "Đang áp dụng", label: "Đang áp dụng" },
              { value: "Không được áp dụng", label: "Không được áp dụng" },
            ]}
          />
        </Space>
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
                setIdRoomType(_id);
              }}
            >
              Sửa
            </Button>

            {/* <Popconfirm
              placement="left"
              title="Bạn có chắc chắn muốn xóa tiện ích này không?"
              description="Hành động này không thể hoàn tác."
              onConfirm={() => onDelete(_id)}
              okText="Đồng ý"
              okType="danger"
              cancelText="Hủy"
            >
              <Button danger>Xóa</Button>
            </Popconfirm> */}
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
      {/* {contextHolder} */}

      <Table
        title={() => (
          <div className="flex items-center justify-end">
            <Button onClick={() => setShowCreateModal(true)}>Thêm mới</Button>
          </div>
        )}
        bordered
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
