import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Button, Table, Tag, Popconfirm, message, Tooltip } from "antd";

import {
  useGetAllQuery,
  useGetInfoUserMutation,
  useLockAccountMutation,
} from "../../../api/user";
import { InfoDrawn } from "../../../components";

interface DataType {
  _id: string;
  email: string;
  role: string;
  isLockAccount: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserManager = () => {
  const [currentItem, setCurrentItem] = useState(5);

  const { data, isLoading } = useGetAllQuery("");
  const [lockAccount] = useLockAccountMutation();
  const [infoUser, resultGetInfo] = useGetInfoUserMutation();

  const key0 = "lockAccountMutation";
  const key1 = "getInfoMutation";
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState();

  const onSubmit = (id: string) => {
    messageApi.open({
      key: key0,
      type: "loading",
      content: "Loading...",
    });

    lockAccount(id)
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

  const getInfo = (id: string) => {
    setOpen(true);

    infoUser(id)
      .unwrap()
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        messageApi.open({
          key: key1,
          type: "error",
          content: error.data.message,
          duration: 2,
        });
      });
  };

  const onClosed = () => {
    setOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Tooltip placement="right" title="Click để xem thông tin chi tiết">
          <button onClick={() => getInfo(_id)}>{_id}</button>
        </Tooltip>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role, { _id }) => (
        <Tag
          color={role === "Admin" ? "volcano" : "geekblue"}
          key={`${_id}-${role}`}
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, { _id, isLockAccount, role }) => (
        <>
          {role === "Admin" ? (
            <Tooltip
              placement="left"
              color="red"
              title="Không thể thực hiện hành động trên tài khoản này"
            >
              <p className="text-red-500 cursor-pointer">Administrator</p>
            </Tooltip>
          ) : (
            <>
              {isLockAccount ? (
                <Button disabled>Tài khoản đã bị khóa</Button>
              ) : (
                <>
                  <Popconfirm
                    placement="left"
                    title="Bạn có chắc chắn muốn thực hiện hành động này không?"
                    description="Hành động này sẽ có ảnh hưởng đến trạng thái tài khoản và không thể hoàn tác."
                    onConfirm={() => onSubmit(_id)}
                    okText="Đồng ý"
                    okType="danger"
                    cancelText="Hủy"
                  >
                    <Button danger>Khóa tài khoản</Button>
                  </Popconfirm>
                </>
              )}
            </>
          )}
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
        rowKey="_id"
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={paginationConfig}
      />

      {info && (
        <InfoDrawn
          info={info}
          isOpen={open}
          onClosed={onClosed}
          loading={resultGetInfo.isLoading}
        />
      )}
    </>
  );
};

export default UserManager;
