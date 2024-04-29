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

import { AiOutlinePlusCircle } from "../../../icons";
import { IRoom } from "../../../interface";
import {
  useGetAllRoomTypeQuery,
  useGetAllHotelQuery,
  useGetAllAmenitiesQuery,
  useUpdateRoomMutation,
} from "../../../api";

type EditRoomModalProps = {
  isOpenEdit: boolean;
  onCancel: () => void;
  loading: boolean;
  data: IRoom;
};

const EditRoomModal = ({
  isOpenEdit,
  onCancel,
  loading,
  data,
}: EditRoomModalProps) => {
  console.log("🚀 ~ data:", data);
  const [form] = Form.useForm();
  const { Option } = Select;

  const { data: allHotel } = useGetAllHotelQuery("");
  const { data: allRoomType } = useGetAllRoomTypeQuery("");
  const { data: allAmenities } = useGetAllAmenitiesQuery("");
  const [editRoom, resultEdit] = useUpdateRoomMutation();

  const usedRooms = data?.list_rooms?.reduce((acc: number[], room: any) => {
    if (room.status) {
      acc.push(room.room);
    }
    return acc;
  }, []);

  const onFinish = (data: IRoom) => {
    // const roomArray = data?.list_rooms
    //   ?.split(",")
    //   .map((room) => ({ room: Number(room.trim()) }));
    // // Kiểm tra xem có phòng nào có status = true không
    // // Kiểm tra xem data có list_rooms không và list_rooms có phải là một mảng không
    // if (Array.isArray(roomArray) && roomArray.length > 0) {
    //   // Kiểm tra xem có phòng nào có status = true không
    //   const hasActiveRoom = roomArray.some((room: any) => room.status === true);

    //   if (hasActiveRoom) {
    //     message.error(
    //       "Không thể sửa phòng vì có phòng đang ở trạng thái active!"
    //     );
    //     return;
    //   }
    // } else {
    //   // Xử lý trường hợp roomArray không hợp lệ
    //   console.error("Dữ liệu list_rooms không hợp lệ");
    //   return;
    // }
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
          disabled={resultEdit.isLoading}
          name="edit_room"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            ...data,
            id_amenities:
              data &&
              data.id_amenities &&
              data.id_amenities.map((item) => item._id),
            id_hotel: data && data.id_hotel && data.id_hotel._id,
            id_roomType: data && data.id_roomType && data.id_roomType._id,
            list_rooms: data?.list_rooms?.map((room) => room?.room).join(", "),
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
              <div>
                {usedRooms && usedRooms.length > 0 && (
                  <div className="flex flex-wrap">
                    <p className="text-black font-bold">
                      {" "}
                      Các phòng này đang được sử dụng và không được phép xoá và
                      sửa:
                    </p>{" "}
                    <p className="text-red-500 font-bold">
                      {usedRooms.join(", ")}
                    </p>
                  </div>
                )}
              </div>
              <Form.Item
                name="list_rooms"
                label="Số Phòng"
                rules={[{ required: true, message: "Vui lòng nhập số phòng!" }]}
              >
                <Input className="w-full" min={1} />
              </Form.Item>

              {/* {data?.list_rooms?.map((room: any) => {
                console.log(room);
                return (
                  <div>
                    các phòng này hiện đang được sử dụng không được xoá và sửa
                    <p>{room?.status == false ? room.room : ""}</p>
                  </div>
                );
              })} */}
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
