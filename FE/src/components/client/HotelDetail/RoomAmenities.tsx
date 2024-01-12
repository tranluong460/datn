import React from "react";
import { TiPhone, TiWiFi } from "react-icons/ti";
import { FaBath, FaBed, FaSoap } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoMdShirt, IoMdWater } from "react-icons/io";
import { TbWashHand, TbWashMachine, TbGlassFull } from "react-icons/tb";
import { IoBan } from "react-icons/io5";

export default function RoomAmenities({ amenities }: any) {
  console.log("🚀 ~ RoomAmenities ~ amenities:", amenities);
  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      <div className="flex items-center gap-1">
        <span>
          <IoMdShirt />
        </span>
        <p>Tủ quần áo</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <IoMdWater />
        </span>
        <p> Máy sấy tóc</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <FaBed />
        </span>
        <p>Ga trải giường, gối</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <FaBath />
        </span>
        <p>Phòng có bồn tắm</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <IoBan />
        </span>
        <p> Phòng không hút thuốc</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <TiWiFi />
        </span>
        <p> Wifi</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <FaBath />
        </span>
        <p>Vòi sen</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <FaSoap />
        </span>
        <p>Đồ phòng tắm</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <TbGlassFull />
        </span>
        <p>Quầy bar mini</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <TbWashHand />
        </span>
        <p>Khăn tắm</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          {" "}
          <FaBath />
        </span>
        <p>Phòng tắm - Vòi sen</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <TiPhone />
        </span>
        <p>Điện thoại</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <TbWashMachine />
        </span>
        <p>Dịch vụ giặt ủi</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <HiOutlineLightBulb />
        </span>
        <p>Đèn bàn</p>
      </div>
    </div>
  );
}
