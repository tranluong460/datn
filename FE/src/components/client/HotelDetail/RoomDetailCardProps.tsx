import React, { useState } from "react";
import { IRoom } from "../../../interface";
import { AiOutlineCloseCircle } from "react-icons/ai";
import RoomAmenities from "./RoomAmenities";
import styles from "./styles.module.css";

type RoomDetailCardProps = {
  room: IRoom;
  onCloseDetail: () => void;
};

const RoomDetailCard = ({ room, onCloseDetail }: RoomDetailCardProps) => {
  const [currentImage, setCurrentImage] = useState<string>(room?.images[0].url);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleThumbnailClick = (imageUrl: string, index: number) => {
    setCurrentImageIndex(index);
    setCurrentImage(imageUrl);
  };

  return (
    <>
      <div className="flex w-[1000px]">
        <div className="flex flex-col bg-[#98999b]">
          <div className="w-[590px] relative">
            <CSSTransition
              in={true}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <img src={currentImage} key={currentImage} alt="" />
            </CSSTransition>
            <span className="bottom-0 pl-3 py-2 bg-[black] absolute opacity-40 w-full text-[white] font-bold">
              {room?.id_roomType?.name}
            </span>
          </div>
          <div className="flex w-[140px] p-3 gap-3 border-none">
            {room?.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt=""
                onClick={() => handleThumbnailClick(img.url, index)}
                className={
                  currentImageIndex === index ? styles.selectedThumbnail : ""
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-3 pb-22">
          <h1 className="border-b font-[500] mt-4 pb-3">
            Phòng {room?.id_roomType?.name}
          </h1>
          <span className="text-[13px] mt-3">{room?.description}</span>
          <div className="mt-10">
            <span className="font-[500]">Tiện nghi của phòng</span>
            <div>
              <RoomAmenities amenities={room?.id_amenities} />
            </div>
          </div>
        </div>

        <button onClick={onCloseDetail}>
          <AiOutlineCloseCircle
            className={`text-[30px] absolute top-3 right-4 bg-white`}
          />
        </button>
      </div>
    </>
  );
};

export default RoomDetailCard;
