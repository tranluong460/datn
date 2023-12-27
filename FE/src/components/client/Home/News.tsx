// import { NewsCard } from "../..";

// const News = () => {
//   const data = [
//     {
//       url: "1",
//       image: "/images/ha-noi.jpg",
//       title: "Hà Nội",

//     },
//     {
//       url: "79",
//       image: "/images/ho-chi-minh.jpg",
//       title: "Hồ Chí Minh",
//     },
//     {
//       url: "48",
//       image: "/images/da-nang.jpg",
//       title: "Đà Nẵng",
   
//     },
//     {
//       url: "77",
//       image: "/images/vung-tau.jpg",
//       title: "Vũng Tàu",
    
//     },
   
//   ];

//   return (
//     <>
//       <div className="">
//         <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8">
        
//           <div className=" flex flex-col items-center mb-5 text-center md:mb-8">
//               <h2 className="flex ">
//                 <p className="text-2xl mb-5 select-none font-bold lg:text-3xl text-texLight dark:text-textDark text-neutral-700">
//                   TIN TỨC
//                 </p>
//                 <p className="ml-2 select-none lg:text-3xl text-texLight dark:text-textDark font-normal	text-neutral-500	">
//                  NỔI BẬT
//                 </p>
//               </h2>
//             </div>

//           <div className="grid auto-cols-auto grid-flow-row auto-rows-auto grid-cols-3 lg:gap-5 gap-2">
//             {data.map((item) => (
//               <NewsCard
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
//         <button className="flex group items-center pl-10 pr-13 mx-auto mt-5 text-yellow-500 border border-yellow-500 w-[180px] h-[40px] rounded-[30px] transition-colors duration-300 hover:bg-yellow-500 hover:text-white">
//           Xem thêm
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="w-6 h-6 ml-2 text-yellow-500 group-hover:text-white transition-colors duration-300"
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

// export default News;
