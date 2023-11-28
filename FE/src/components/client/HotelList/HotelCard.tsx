import { Rate } from "antd";

import { Button } from "../..";
import { IHotel } from "../../../interface";
import { CiLocationOn } from "../../../icons";

type HotelCardProps = {
  hotel: IHotel;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 p-3 mb-4 gap-3 rounded-lg bg-light dark:bg-dark">
        <div className="relative">
          <a href={`hotel-detail/${hotel._id}`} className="no-underline">
            <img
              src={hotel.images[0].url}
              alt={hotel.name}
              className="rounded-md w-full xl:h-48 md:h-44 object-contain"
            />
          </a>
        </div>

        <div className="box-border">
          <h2 className="font-semibold text-2xl leading-normal mb-4 text-textLight dark:text-textDark">
            <a href={`hotel-detail/${hotel._id}`} className="no-underline">
              {hotel.name}
            </a>
          </h2>

          <p className="flex mb-4 font-normal text-base leading-normal gap-1 text-textLight2nd dark:text-textDark2nd">
            <CiLocationOn size={25} />
            {hotel.address}
          </p>

          <div className="flex items-center justify-start gap-1">
            <span className="text-textLight dark:text-textDark">Đánh giá:</span>

            <Rate
              disabled
              value={3}
              className="text-yellow-400 dark:text-yellow-500"
            />
          </div>
        </div>

        <div className="pl-5 lg:border-l border-divideLight dark:border-divideDark flex">
          <div className="w-full mt-auto text-right text-textLight2nd dark:text-textDark2nd">
            <div className="box-border">
              <div className="flex lg:flex-col flex-row gap-10">
                <div>
                  <p>Chỉ từ</p>

                  <p className="text-md lg:text-2xl font-bold text-textLight dark:text-textDark">
                    2,025,000
                    <span>VNĐ</span>
                  </p>

                  <p>phòng/đêm</p>
                </div>

                <Button label="Đặt phòng" onClick={() => alert("Đặt phòng")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
