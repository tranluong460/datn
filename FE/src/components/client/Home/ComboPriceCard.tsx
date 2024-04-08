import React from "react";
import { useGetOneRoomQuery } from "../../../api";

type ComboPriceCardProps = {
  data: {
    _id: string;
    id_hotel: string;
    images: { url: string }[];
    price: string;
  };
};

const ComboPriceCard: React.FC<ComboPriceCardProps> = ({ data }) => {
  const { data: dataRoom } = useGetOneRoomQuery(data._id);
  return (
    <div className="overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
      <a href={`hotel-detail/${data?.id_hotel._id}`}>
        <img
          src={data?.images[0]?.url}
          alt="Service"
          className="w-full h-[350px] object-cover rounded-none transition-transform duration-300 ease-in-out transform hover:scale-90"
        />
        <div className="p-4">
          <h5 className="text-blue-500 cursor-default">
            {dataRoom?.data?.id_roomType?.name}
          </h5>
          <p className="text-md text-yellow-500 font-bold capitalize">
            {data?.id_roomType?.price}
            <span className="ml-1 text-xs">/đêm</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default ComboPriceCard;
