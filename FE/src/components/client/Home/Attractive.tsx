// import { AttractiveCard } from "../..";

// const Attractive = () => {
//   const data = [
//     {
//       url: "1",
//       image: "/images/ha-noi.jpg",
//       label: "Hà Nội",
//       secondary: "",
//     },
//     {
//       url: "79",
//       image: "/images/ho-chi-minh.jpg",
//       label: "Hồ Chí Minh",
//     },
//     {
//       url: "48",
//       image: "/images/da-nang.jpg",
//       label: "Đà Nẵng",
//       row: true,
//     },
//     {
//       url: "77",
//       image: "/images/vung-tau.jpg",
//       label: "Vũng Tàu",
//       col: true,
//     },

//     {
//       url: "",
//       image: "/images/nha-trang.jpg",
//       label: "Nha Trang",
//       row: true,
//     },
//     {
//       url: "",
//       image: "/images/hai-phong.jpg",
//       label: "Hải Phòng",
//     },
//     {
//       url: "",
//       image: "/images/da-lat.jpeg",
//       label: "Đà Lạt",
//     },
//     {
//       url: "",
//       image: "/images/sapa.jpg",
//       label: "Sapa",
//       col: true,
//     },
//   ];

//   return (
//     <>
//       <div className="py-8 md:py-10">
//         <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8">
//           <div className="flex flex-col items-center mb-5 text-center md:mb-8">
//             <h2 className="flex">
//               <p className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-bold text-neutral-700">
//                 ĐIỂM ĐẾN
//               </p>
//               <p className="ml-2 text-lg md:text-xl lg:text-2xl mb-2 md:mb-4 select-none font-normal text-neutral-500">
//                 NỔI BẬT
//               </p>
//             </h2>
//           </div>

//           <div className="grid auto-cols-auto grid-flow-row auto-rows-auto grid-cols-3 lg:gap-5 gap-2">
//             {/* grid auto-cols-auto grid-flow-row auto-rows-auto grid-cols-3 lg:gap-5 gap-2 */}
//             {data.map((item) => (
//               <AttractiveCard
//                 key={item.image}
//                 url={item.url}
//                 imageUrl={item.image}
//                 label={item.label}
//                 secondary={item.secondary}
//                 col={item.col}
//                 row={item.row}
//               />
//             ))}
//           </div>
//         </div>

//         <button className="flex group items-center mx-auto mt-5 text-yellow-500 border border-yellow-500  md:w-[180px] h-[40px] md:h-[48px] rounded-[30px] transition-colors duration-300 hover:bg-yellow-500 hover:text-white">
//           <span className="flex-grow pl-6 pr-1 ">Xem thêm</span>
//           {/* md:pr-4 */}
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
//       </div>
//     </>
//   );
// };

// export default Attractive;
