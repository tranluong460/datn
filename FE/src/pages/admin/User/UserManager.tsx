import type { ColumnsType } from "antd/es/table";
import { Button, Table, Tag, Popconfirm, message } from "antd";

import { useGetAllQuery, useLockAccountMutation } from "../../../api/user";

interface DataType {
  _id: string;
  email: string;
  role: string;
  isLockAccount: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserManager = () => {
  const { data, isSuccess } = useGetAllQuery("");
  const [lockAccount] = useLockAccountMutation();

  const [messageApi, contextHolder] = message.useMessage();
  const key = "lockAccountMutation";

  const onSubmit = (id: string) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });

    lockAccount(id)
      .unwrap()
      .then((response) => {
        messageApi.open({
          key,
          type: "success",
          content: response.message,
          duration: 2,
        });
      })
      .catch((error) => {
        messageApi.open({
          key,
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
            <p className="text-red-500">Administrator</p>
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

  return (
    <>
      {contextHolder}

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data?.data}
        loading={!isSuccess}
      />
    </>
  );
};

export default UserManager;
