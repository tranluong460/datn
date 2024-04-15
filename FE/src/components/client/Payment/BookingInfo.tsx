import { useParams } from "react-router-dom";
import moment from "moment";

import { IRoom } from "../../../interface";
import { useGetOneHotelQuery } from "../../../api";

interface ListRoom {
  idRoom: string;
  quantity: number;
}

type BookingInfoProps = {
  booking: {
    check_in: string;
    check_out: string;
    total_price: number;
    list_room: ListRoom[];
  };
};

const BookingInfo = ({ booking }: BookingInfoProps) => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data } = useGetOneHotelQuery(id);

  const filteredRooms = data?.data.id_room.filter((room: IRoom) =>
    booking.list_room.some((rm) => room._id === rm.idRoom)
  );

  return (
    <>
      <div className="rounded-md p-6 mb-5 bg-light dark:bg-dark">
        <h6 className="font-bold text-xl mb-5 pb-3 border-b border-divideLight dark:border-divideDark text-textLight dark:text-textDark">
          Yêu cầu đặt phòng của bạn
        </h6>

        <div className="mb-3 pb-5 border-b-2 border-dashed border-divideLight dark:border-divideDark">
          <div className="mb-1 font-bold text-base text-textLight dark:text-textDark">
            <a href="#">{data?.data.name}</a>
          </div>

          <div className="text-base leading-normal text-textLight2nd dark:text-textDark2nd">
            <p className="font-medium">
              Nhận phòng: {moment(booking.check_in).format("DD/MM/YYYY")}
            </p>

            <p className="font-medium">
              Trả phòng: {moment(booking.check_out).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>

        <div className="relative mb-3 pb-5 border-b-2 border-dashed border-divideLight dark:border-divideDark">
          <p className="mb-0 font-bold text-base leading-normal text-textLight dark:text-textDark">
            Thông tin phòng
          </p>

          <div className="pt-3 grid grid-cols-1 gap-5">
            {filteredRooms?.map((room: IRoom, index: number) => {
              const bk = booking.list_room?.find(
                (bookingRoom) => bookingRoom.idRoom === room._id
              );

              return (
                <div
                  key={room._id}
                  className="grid grid-cols-1 gap-1 text-sm text-textLight2nd dark:text-textDark2nd"
                >
                  <div className="flex gap-1">
                    <span className="font-semibold">Phòng {index + 1}:</span>
                    <p>{room.id_roomType.name}</p>
                  </div>

                  <span>Số lượng: {bk && bk.quantity}</span>

                  <div className="flex gap-1">
                    <span>Giá:</span>
                    <p>
                      {bk &&
                        (bk.quantity * room?.id_roomType?.price).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-base mb-4 font-bold">
          <span className="text-textLight dark:text-textDark">Tổng giá:</span>
          <span className="text-xl text-yellow-600">
            {booking.total_price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>

        <p className="text-textLight2nd dark:text-textDark2nd">
          Bao gồm tất cả các loại thuế và phí dịch vụ
        </p>
        <p className="text-red-500">
          (Theo quy định của Ngân hàng Nhà nước Việt Nam, Quý khách vui lòng
          thanh toán bằng VNĐ)
        </p>
      </div>
    </>
  );
};

export default BookingInfo;
