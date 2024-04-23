import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Upload,
  Select,
  message,
} from "antd";

import { IRoom } from "../../../interface";
import { AiOutlinePlusCircle } from "../../../icons";
import {
  useGetAllRoomTypeQuery,
  useGetAllHotelQuery,
  useGetAllAmenitiesQuery,
  useCreateRoomMutation,
} from "../../../api";
import { useState } from "react";

type CreateRoomModalProps = {
  isOpenCreate: boolean;
  onCancel: () => void;
};

const CreateRoomModal = ({ isOpenCreate, onCancel }: CreateRoomModalProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const { data: allHotel } = useGetAllHotelQuery("");
  const { data: allRoomType } = useGetAllRoomTypeQuery("");
  const { data: allAmenities } = useGetAllAmenitiesQuery("");

  const [createRoom, resultCreate] = useCreateRoomMutation();

  const onFinish = (data: IRoom) => {
    console.log("🚀 ~ onFinish ~ data:", data);

    createRoom(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        form.resetFields();
        onCancel();
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const [quantity, setQuantity] = useState(0); // Số lượng đã nhập
  const [roomCount, setRoomCount] = useState(0); // Số lượng phòng đã nhập

  // Hàm xử lý sự kiện khi số phòng thay đổi
  const handleRoomChange = (value) => {
    setRoomCount(value ? Math.min(value, quantity) : 0); // Giữ cho số lượng phòng không vượt quá số lượng đã nhập
  };

  return (
    <Modal
      title="Thêm mới phòng"
      open={isOpenCreate}
      onCancel={onCancel}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      <Form
        disabled={resultCreate.isLoading}
        layout="vertical"
        name="add_room"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <InputNumber
                className="w-full"
                min={1}
                onChange={(value) => setQuantity(value!)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="list_rooms"
              label="Số phòng"
              rules={[
                { required: true, message: "Vui lòng nhập số phòng!" },
                () => ({
                  validator(_, value) {
                    // Kiểm tra số lượng phòng
                    if (value) {
                      const rooms = value
                        .split(",")
                        .map((room: any) => room.trim());
                      if (Number(rooms.length) !== Number(quantity)) {
                        return Promise.reject(
                          `Số phòng phải bằng số lượng phòng ${quantity} không thể nhập hơn hay nhỏ hơn số lượng đã chọn!`
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                className="w-full"
                onChange={(e) => handleRoomChange(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="id_hotel"
              label="Khách sạn"
              rules={[
                { required: true, message: "Khách sạn không được để trống!" },
              ]}
            >
              <Select>
                {allHotel?.data &&
                  allHotel?.data.map((item: { _id: string; name: string }) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="id_roomType"
              label="Loại phòng"
              rules={[
                { required: true, message: "Loại phòng không được để trống!" },
              ]}
            >
              <Select>
                {allRoomType?.data &&
                  allRoomType?.data.map(
                    (item: { _id: string; name: string }) => (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    )
                  )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="id_amenities"
          label="Tiện ích"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiện ích!",
            },
          ]}
        >
          <Select mode="multiple">
            {allAmenities?.data &&
              allAmenities?.data.map((item: { _id: string; name: string }) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="images"
          label="Hình ảnh"
          rules={[
            {
              required: true,
              message: "Hình ảnh không được để trống!",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload listType="picture-card" beforeUpload={() => false}>
            <div className="flex flex-col justify-center items-center">
              <AiOutlinePlusCircle size={20} />
              <div className="mt-2">Tải lên</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" loading={resultCreate.isLoading}>
              Thêm
            </Button>

            <Button
              htmlType="reset"
              onClick={onCancel}
              disabled={resultCreate.isLoading}
            >
              Hủy
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRoomModal;
