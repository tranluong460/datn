// ComboPrice.tsx
import { ComboPriceCard, Container } from "../..";
import { useEffect, useState } from "react";
import { useGetAllHotelQuery } from "../../../api";
import { Loading } from "../../../pages";

const ComboPrice = () => {
  const { data: hotelData, isLoading } = useGetAllHotelQuery("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (hotelData && hotelData.data) {
      setData(hotelData?.data[0].id_room);
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

// 3
// import { ComboPriceCard, Container } from "../..";
// import { useEffect, useState } from "react";
// import { useGetAllHotelQuery } from "../../../api";
// import { Loading } from "../../../pages";

// const ComboPrice = () => {
//   const { data: hotelData, isLoading } = useGetAllHotelQuery("");
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     if (isLoading) {
//       return;
//     }
//     if (hotelData && hotelData.data) {
//       setData(hotelData?.data[0].id_room);
//     }
//   }, [hotelData, isLoading]);

//   const itemsPerPage = 4;
//   const [currentPage, setCurrentPage] = useState(0);

//   const nextPage = () => {
//     setCurrentPage(
//       (prevPage) => (prevPage + 1) % Math.ceil(data.length / itemsPerPage)
//     );
//   };

//   const prevPage = () => {
//     setCurrentPage(
//       (prevPage) =>
//         (prevPage - 1 + Math.ceil(data.length / itemsPerPage)) %
//         Math.ceil(data.length / itemsPerPage)
//     );
//   };

//   const startIdx = currentPage * itemsPerPage;
//   const visibleData = data.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <>
//       <Container>
//         <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8 relative ">
//           <div className="flex flex-col items-center mb-5 text-center md:mb-8">
//             <h2 className="flex ">
//               <p className="ml-0 md:ml-2 text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-bold text-neutral-500">
//                 PHÒNG
//               </p>
//             </h2>
//           </div>

//           <div className="grid grid-cols-4 gap-5 relative">
//             {visibleData?.map((item: any, index: number) => (
//               <ComboPriceCard data={item} key={index} />
//             ))}
//           </div>

//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300"
//             onClick={prevPage}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           <button
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300"
//             onClick={nextPage}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default ComboPrice;



// 2
// import { ComboPriceCard, Container } from "../..";
// import { useEffect, useState } from "react";
// import { useGetAllHotelQuery } from "../../../api";
// import { Loading } from "../../../pages";

// const ComboPrice = () => {
//   const { data: hotelData, isLoading } = useGetAllHotelQuery("");
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     if (isLoading) {
//       return;
//     }
//     if (hotelData && hotelData.data) {
//       setData(hotelData?.data[0].id_room);
//     }
//   }, [hotelData, isLoading]);

//   const itemsPerPage = 4;
//   const [currentPage, setCurrentPage] = useState(0);

//   const nextPage = () => {
//     setCurrentPage(
//       (prevPage) => (prevPage + 1) % Math.ceil(data.length / itemsPerPage)
//     );
//   };

//   const prevPage = () => {
//     setCurrentPage(
//       (prevPage) =>
//         (prevPage - 1 + Math.ceil(data.length / itemsPerPage)) %
//         Math.ceil(data.length / itemsPerPage)
//     );
//   };

//   const startIdx = currentPage * itemsPerPage;
//   const visibleData = data.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <>
//       <Container>
//         <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8 relative ">
//           <div className="flex flex-col items-center mb-5 text-center md:mb-8">
//             <h2 className="flex ">
//               <p className="ml-0 md:ml-2 text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-bold text-neutral-500">
//                 PHÒNG
//               </p>
//             </h2>
//           </div>

//           <div className="grid grid-cols-4 gap-5 relative">
//             {visibleData?.map((item: any, index: number) => (
//               <ComboPriceCard data={item} key={index} />
//             ))}
//           </div>

//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300"
//             onClick={prevPage}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           <button
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300"
//             onClick={nextPage}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default ComboPrice;




// 1
// import { ComboPriceCard, Container } from "../..";
// import { useEffect, useState } from "react";
// import { useGetAllHotelQuery } from "../../../api";
// import { Loading } from "../../../pages";

// const ComboPrice = () => {
//   const { data: hotelData, isLoading } = useGetAllHotelQuery("");
//   const [data, setData] = useState<any[]>([]);

//   useEffect(() => {
//     if (isLoading) {
//       return;
//     }
//     if (hotelData && hotelData.data) {
//       setData(hotelData?.data[0].id_room);
//     }
//   }, [hotelData, isLoading]);

//   const itemsPerPage = 3;
//   const [currentPage, setCurrentPage] = useState(0);

//   const nextPage = () => {
//     setCurrentPage(
//       (prevPage) => (prevPage + 1) % Math.ceil(data.length / itemsPerPage)
//     );
//   };

//   const prevPage = () => {
//     setCurrentPage(
//       (prevPage) =>
//         (prevPage - 1 + Math.ceil(data.length / itemsPerPage)) %
//         Math.ceil(data.length / itemsPerPage)
//     );
//   };

//   const startIdx = currentPage * itemsPerPage;
//   const visibleData = data.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <>
//       <Container>
//         <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8 relative ">
//           <div className="flex flex-col items-center mb-5 text-center md:mb-8">
//             <h2 className="flex ">
//               <p className="ml-0 md:ml-2 text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-bold text-neutral-500">
//                 PHÒNG
//               </p>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 relative ">
//             {visibleData?.map((item: any, index: number) => {
//               return <ComboPriceCard data={item} key={index} />;
//             })}

//             <button
//               className="absolute left-7 top-1/2 transform -translate-y-1/2 translate-x-[-50%] bg-gradient-to-r from-amber-500 to-transparent hover:from-amber-200 hover:to-transparent text-white font-bold py-2 px-4 rounded-full overflo  "
//               onClick={prevPage}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
//                 />
//               </svg>
//             </button>

//             <button
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-amber-500 to-transparent hover:from-amber-200 hover:to-transparent text-white font-bold py-2 px-4 rounded-full overflow-hidden"
//               onClick={nextPage}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//         <button className="flex group items-center mx-auto mt-5 text-yellow-500 border border-yellow-500 mb-10  md:w-[180px] h-[40px] md:h-[48px] rounded-[30px] transition-colors duration-300 hover:bg-yellow-500 hover:text-white">
//           <span className="flex-grow pl-7 pr-1">Xem thêm</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-5 h-5 md:w-6 md:h-6 mr-10 text-yellow-500 group-hover:text-white transition-colors duration-300"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
//             />
//           </svg>
//         </button>
//       </Container>
//     </>
//   );
// };

// export default ComboPrice;
