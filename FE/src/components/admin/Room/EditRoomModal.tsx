import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  message,
} from "antd";

import { AiOutlinePlusCircle } from "react-icons/ai";

import { useGetAllRoomTypeQuery } from "../../../api/roomType";
import { useGetAllHotelQuery } from "../../../api/hotel";
import { useGetAllAmenitiesQuery } from "../../../api/amenities";
import { useUpdateRoomMutation } from "../../../api/room";

interface Image {
  url: string;
}

interface AmenityFeature {
  name: string;
  surcharge: boolean;
}

interface Amenity {
  _id: string;
  name: string;
  features: AmenityFeature[];
  createdAt: string;
  updatedAt: string;
}

interface Hotel {
  _id: string;
  name: string;
}

interface RoomType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface RoomData {
  _id: string;
  images: Image[];
  quantity: number;
  price: number;
  status: string;
  description: string;
  id_amenities: Amenity[];
  id_hotel: Hotel;
  id_roomType: RoomType;
  createdAt: string;
  updatedAt: string;
}

type EditRoomModalProps = {
  isOpenEdit: boolean;
  onCancel: () => void;
  loading: boolean;
  data: RoomData;
};

const EditRoomModal = ({
  isOpenEdit,
  onCancel,
  loading,
  data,
}: EditRoomModalProps) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  console.log(data);

  const { data: allHotel } = useGetAllHotelQuery("");
  const { data: allRoomType } = useGetAllRoomTypeQuery("");
  const { data: allAmenities } = useGetAllAmenitiesQuery("");
  const [editRoom, resultEdit] = useUpdateRoomMutation();

  const transformedAmenities = data.id_amenities.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const transformedHotel = {
    value: data.id_hotel._id,
    label: data.id_hotel.name,
  };

  const transformedRoomType = {
    value: data.id_roomType._id,
    label: data.id_roomType.name,
  };

  const onFinish = (data: RoomData) => {
    editRoom(data)
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
      title="Chỉnh sửa phòng"
      open={isOpenEdit}
      onCancel={onCancel}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-[100px]">
          <Spin spinning={loading} />
        </div>
      ) : (
        <Form
          name="edit_room"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            ...data,
            id_amenities: transformedAmenities,
            id_hotel: transformedHotel,
            id_roomType: transformedRoomType,
          }}
          autoComplete="off"
        >
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber className="w-full" min={1} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
              >
                <InputNumber
                  className="w-full"
                  min={1}
                  addonAfter="VNĐ"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }
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
                <Select disabled>
                  {allHotel?.data &&
                    allHotel?.data.map(
                      (item: { _id: string; name: string }) => (
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      )
                    )}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="id_roomType"
                label="Loại phòng"
                rules={[
                  {
                    required: true,
                    message: "Loại phòng không được để trống!",
                  },
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
                allAmenities?.data.map(
                  (item: { _id: string; name: string }) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  )
                )}
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

export default EditRoomModal;
