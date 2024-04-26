import { useUpdateBookingMutation } from "../../../api";
import { IBooking } from "../../../interface";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  message,
} from "antd";

type EditBookingDrawnProps = {
  loading: boolean;
  isOpenEdit: boolean;
  data: IBooking;
  onCancel: () => void;
};

const EditBookingDrawn = ({
  isOpenEdit,
  data,
  loading,
  onCancel,
}: EditBookingDrawnProps) => {
  const [form] = Form.useForm();
  const [updateBooking, resultEdit] = useUpdateBookingMutation();

  const onFinish = (data: IBooking) => {
    updateBooking(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        onCancel();
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const statusOptionsMap: any = {
    "Chờ thanh toán": [
      // { value: "Đã hủy bỏ", label: "Đã hủy bỏ" },
      { value: "Đang xử lý", label: "Đang xử lý" },
    ],
    "Đang xử lý": [
      { value: "Đã hủy bỏ", label: "Đã hủy bỏ" },
      { value: "Đã xác nhận", label: "Đã xác nhận" },
    ],
    "Đã xác nhận": [
      // { value: "Đã hủy bỏ", label: "Đã hủy bỏ" },
      { value: "Đã hủy bỏ", label: "Đã hủy bỏ" },
      { value: "Đã nhận phòng", label: "Đã nhận phòng" },
      // { value: "Vắng mặt", label: "Vắng mặt" },
    ],
    "Đã nhận phòng": [{ value: "Thành công", label: "Thành công" }],
  };

  const filteredOptions = statusOptionsMap[data?.status];

  return (
    <Modal
      title="Chỉnh sửa đơn đặt phòng"
      open={isOpenEdit}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[100px]">
          <Spin spinning={loading} />
        </div>
      ) : (
        <Form
          disabled={resultEdit.isLoading}
          name="edit_room_type"
          form={form}
          onFinish={onFinish}
          initialValues={data}
        >
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="check_in" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái đơn"
            rules={[
              { required: true, message: "Trạng thái không được để trống!" },
            ]}
          >
            <Select options={filteredOptions} />
          </Form.Item>

          <Form.Item
            name="success"
            valuePropName="checked"
            label="Hoàn tất thanh toán"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" loading={resultEdit.isLoading}>
                Sửa
              </Button>

              <Button
                htmlType="reset"
                onClick={onCancel}
                disabled={resultEdit.isLoading}
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

export default EditBookingDrawn;
