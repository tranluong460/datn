import { Button, Form, Input, Modal, Space, Spin, message } from "antd";

import { IRoomType } from "../../../interface";
import { useUpdateRoomTypeMutation } from "../../../api";

type EditRoomTypeModalProps = {
  isOpenEdit: boolean;
  loading: boolean;
  data: IRoomType;
  onCancel: () => void;
};

const EditRoomTypeModal = ({
  isOpenEdit,
  loading,
  data,
  onCancel,
}: EditRoomTypeModalProps) => {
  const [form] = Form.useForm();

  const [updateRoomType, resultUpdate] = useUpdateRoomTypeMutation();

  const onFinish = (data: IRoomType) => {
    updateRoomType(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        onCancel();
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa loại phòng"
      open={isOpenEdit}
      onCancel={onCancel}
      footer={null}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[100px]">
          <Spin spinning={loading} />
        </div>
      ) : (
        <Form
          name="edit_room_type"
          form={form}
          onFinish={onFinish}
          initialValues={data}
        >
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên loại phòng"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại phòng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" loading={resultUpdate.isLoading}>
                Sửa
              </Button>

              <Button
                htmlType="reset"
                onClick={onCancel}
                disabled={resultUpdate.isLoading}
              >
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditRoomTypeModal;
