import { ComboPriceCard, Container } from "../..";
import { useEffect, useState } from "react";
import { useGetAllHotelQuery } from "../../../api";
import { Loading } from "../../../pages";

const ComboPrice = () => {
  const { data: hotelData, isLoading } = useGetAllHotelQuery();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (isLoading) {
  //     return <Loading />;
  //   }
  //   if (hotelData && hotelData.data) {
  //     setData(hotelData?.data);
  //   }
  // }, [hotelData, isLoading]);
  // if (isLoading) {
  //   return <Loading />;
  // }
  // console.log("🚀 ~ ComboPrice ~ hotelData:", Data);
  // const data = [
  //   {
  //     image:
  //       "https://i.pinimg.com/originals/72/c9/21/72c921591058bba1215c367dc0d91708.jpg",
  //     title: "Phòng thường",
  //     price: "1,600,000",
  //   },
  //   {
  //     image: "https://vr360.com.vn/uploads/images/anh%20chup%20khach%20san.jpg",
  //     title: "Phòng VIP 1",
  //     price: "1,600,000",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/originals/90/82/a3/9082a352f8d7e45269ff1e1f347088bc.jpg",
  //     title: "Phòng VIP 2",
  //     price: "1,600,000",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/564x/06/18/33/06183306e1639f2a43281cdd84137f2a.jpg",
  //     title: "Phòng đơn",
  //     price: "1,600,000",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/736x/62/98/58/629858972ff9acd7bbeb38d71fbc625d.jpg",
  //     title: "Phòng đơn",
  //     price: "1,600,000",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/564x/98/cc/af/98ccafe559fa68d13def7d81b468c83d.jpg",
  //     title: "Phòng đơn",
  //     price: "1,600,000",
  //   },
  // ];

  // const itemsPerPage = 3;
  // const [currentPage, setCurrentPage] = useState(0);

  // const nextPage = () => {
  //   setCurrentPage(
  //     (prevPage) => (prevPage + 1) % Math.ceil(data.length / itemsPerPage)
  //   );
  // };

  // const prevPage = () => {
  //   setCurrentPage(
  //     (prevPage) =>
  //       (prevPage - 1 + Math.ceil(data.length / itemsPerPage)) %
  //       Math.ceil(data.length / itemsPerPage)
  //   );
  // };

  // const startIdx = currentPage * itemsPerPage;
  // const visibleData = data.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <Container>
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8 relative ">
          <div className="flex flex-col items-center mb-5 text-center md:mb-8">
            <h2 className="flex ">
              <p className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-bold text-neutral-700">
                COMBO
              </p>
              <p className="ml-0 md:ml-2 text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-normal text-neutral-500">
                PHÒNG
              </p>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 relative ">
            {/* {data.map((item: any, index: number) => {
              console.log(item);
              return <div>ssádfasdf</div>;
            })} */}

            <button
              className="absolute left-7 top-1/2 transform -translate-y-1/2 translate-x-[-50%] bg-gradient-to-r from-amber-500 to-transparent hover:from-amber-200 hover:to-transparent text-white font-bold py-2 px-4 rounded-full overflow-hidden  "
              // onClick={prevPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-amber-500 to-transparent hover:from-amber-200 hover:to-transparent text-white font-bold py-2 px-4 rounded-full overflow-hidden"
              // onClick={nextPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <button className="flex group items-center mx-auto mt-5 text-yellow-500 border border-yellow-500 mb-10  md:w-[180px] h-[40px] md:h-[48px] rounded-[30px] transition-colors duration-300 hover:bg-yellow-500 hover:text-white">
          <span className="flex-grow pl-7 pr-1">Xem thêm</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6 mr-10 text-yellow-500 group-hover:text-white transition-colors duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </Container>
    </>
  );
};

export default ComboPrice;
