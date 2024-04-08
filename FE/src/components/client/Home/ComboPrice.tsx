// ComboPrice.tsx
import { ComboPriceCard, Container } from "../..";
import { useEffect, useState } from "react";
import { useGetAllHotelQuery, useGetAllRoomQuery } from "../../../api";
import { Loading } from "../../../pages";

const ComboPrice = () => {
  const { data: hotelData, isLoading } = useGetAllRoomQuery("");
  console.log("🚀 ~ ComboPrice ~ hotelData:", hotelData?.data);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (hotelData && hotelData.data) {
      setData(hotelData?.data);
    }
  }, [hotelData, isLoading]);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage(
      (prevPage) => (prevPage + 1) % Math.ceil(data.length / itemsPerPage)
    );
  };

  const prevPage = () => {
    setCurrentPage(
      (prevPage) =>
        (prevPage - 1 + Math.ceil(data.length / itemsPerPage)) %
        Math.ceil(data.length / itemsPerPage)
    );
  };

  const startIdx = currentPage * itemsPerPage;
  const visibleData = data.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <Container>
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8 relative ">
          <div className="flex flex-col items-center mb-5 text-center md:mb-8">
            <h2 className="flex ">
              <p className="ml-0 md:ml-2 text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-bold text-neutral-500">
                PHÒNG
              </p>
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-5 relative">
            {visibleData?.map((item: any, index: number) => (
              <ComboPriceCard data={item} key={index} />
            ))}
          </div>

          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300"
            onClick={prevPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300"
            onClick={nextPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </Container>
    </>
  );
};

export default ComboPrice;
