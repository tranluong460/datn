import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Spin,
    Upload,
  } from "antd";
  
  import { AiOutlinePlusCircle } from "react-icons/ai";
  
  import { useGetAllAmenitiesQuery } from "../../../api/amenities";
  
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
  
  interface RoomType {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface Room {
    _id: string;
    images: Image[];
    quantity: number;
    price: number;
    status: string;
    description: string;
    id_amenities: string[];
    id_hotel: string;
    id_roomType: RoomType;
    createdAt: string;
    updatedAt: string;
  }
  
  interface Hotel {
    _id: string;
    name: string;
    images: Image[];
    address: string;
    phone: string;
    status: string;
    email: string;
    description: string;
    city: string;
    id_amenities: Amenity[];
    id_review: [];
    createdAt: string;
    updatedAt: string;
    id_room: Room[];
  }
  
  type EditHotelModalProps = {
    isOpenEdit: boolean;
    onCancel: () => void;
    loading: boolean;
    data: Hotel;
  };
  
  const EditHotelModal = ({
    isOpenEdit,
    onCancel,
    loading,
    data,
  }: EditHotelModalProps) => {
    const [form] = Form.useForm();
    const { Option } = Select;
  
    const { data: allAmenities } = useGetAllAmenitiesQuery("");
  
    const transformedAmenities = data.id_amenities.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  
    const onFinish = (data: Hotel) => {
      console.log(data);
    };
  
    return (
      <Modal
        title="Chỉnh sửa khách sạn"
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
            name="edit_hotel"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ ...data, id_amenities: transformedAmenities }}
            autoComplete="off"
          >
            <Form.Item name="_id" hidden>
              <Input />
            </Form.Item>
  
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không đúng định dạng!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="Thành phố"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thành phố!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
  
              <Col span={12}>
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
              </Col>
            </Row>
  
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
              <Input.TextArea rows={5} />
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
                <Button
                  htmlType="submit"
                  // loading={resultEdit.isLoading}
                >
                  Thêm
                </Button>
  
                <Button
                  htmlType="reset"
                  onClick={onCancel}
                  // disabled={resultEdit.isLoading}
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
  
  export default EditHotelModal;
  