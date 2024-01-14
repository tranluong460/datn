import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

// import { AiOutlineSearch } from "../../../icons";
// import { getCityByCode } from "../../../utils";
// import { useGetAllProvincesQuery } from "../../../api";
import { useSearchModal } from "../../../hooks";

const Search = () => {
  const searchModal = useSearchModal();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  // const { data: dataProvinces } = useGetAllProvincesQuery("");

  // const locationValue = params.get("location");
  const checkinValue = params.get("checkin");
  const checkoutValue = params.get("checkout");
  const roomValue = params.get("room");

  // const locationLabel = useMemo(() => {
  //   const data = dataProvinces || [];
  //   return locationValue
  //     ? getCityByCode(Number(locationValue), data)
  //     : { name: "Nhập khách sạn / Điểm đến" };
  // }, [locationValue, dataProvinces]);

  const durationLabel = useMemo(() => {
    if (checkinValue && checkoutValue) {
      const start = moment(checkinValue).format("DD/MM/YYYY");
      const end = moment(checkoutValue).format("DD/MM/YYYY");

      return `${start} -  ${end}`;
    }

    return "Thời gian";
  }, [checkinValue, checkoutValue]);

  const roomLabel = useMemo(() => {
    if (roomValue) {
      return `${roomValue} phòng`;
    }

    return "Phòng";
  }, [roomValue]);

  return (
    <>
      <div className="">
        <div className="font-sans bg-white mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 rounded-[3px]">
          <div className="flex flex-row space-x-4">
            {/* <div className="relative my-[20px] basis-1/2">
              <p className="font-medium text-base text-gray-600 mb-1 mr-2">
                Bạn muốn nghỉ dưỡng ở đâu ?
              </p>
              <div className="relative">
                <input
                  className="pl-8 pr-2  text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                  type=""
                  value={locationLabel?.name}
                  onClick={searchModal.onOpen}
                  placeholder="Nhập địa điểm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
            </div> */}
            <div className="relative my-[20px] ml-[15px] basis-1/2">
              <p className="font-medium text-base text-gray-600 mb-1">
                Ngày nhận phòng
              </p>
              <div className="relative">
                <input
                  className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                  type=""
                  value={durationLabel}
                  onChange={searchModal.onOpen}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative my-[20px] ml-[15px] basis-1/2">
              <p className="font-medium text-base text-gray-600 mb-1">
                Ngày Trả phòng
              </p>
              <div className="relative">
                <input
                  className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                  type=""
                  value={durationLabel}
                  onClick={searchModal.onOpen}
                  onChange={searchModal.onOpen}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative my-[20px] ml-[15px] basis-1/4">
              <p className="font-medium text-base text-gray-600 mb-1">
                Số lượng phòng
              </p>
              <div className="relative">
                <input
                  className="pl-8 pr-2  text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                  type=""
                  value={roomLabel}
                  onClick={searchModal.onOpen}
                  onChange={searchModal.onOpen}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
            </div>

            {/* <div className="relative my-[20px] ml-[15px] basis-1/2">
              <p className="font-medium text-base text-gray-600 mb-1">
                Mã khuyến mãi/Voucher
              </p>
              <div className="relative">
                <input
                  className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                  type=""
                  value="Nhập mã khuyến mại/mã Voucher"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
              </div>
            </div> */}

            <div className="relative mt-[48px] ml-[15px] ">
              <div className="relative">
                <input
                  className="pl-8 pr-2 text-sm text-white	 bg-amber-400 w-ful py-3 border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                  type=""
                  value="Tìm kiếm"
                  onClick={searchModal.onOpen}
                  onChange={searchModal.onOpen}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

// <div className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse">
// <div className="text-gray-900 dark:text-white hover:border-b-2 hover:border-orange-500 transition">
//  <button>{locationLabel?.name}</button>
// </div>

// <div className="text-gray-900 dark:text-white hover:border-b-2 hover:border-orange-500 transition">
//   <button>{durationLabel}</button>
// </div>

// <div className="text-gray-900 dark:text-white hover:border-b-2 hover:border-orange-500 transition">
//   <button className="hidden md:block">{roomLabel}</button>
// </div>

// <div className="p-2 rounded-full bg-backgroundLight dark:bg-backgroundDark">
//     <AiOutlineSearch size={20} />
//   </div>
// </div>

// import React from "react";
// import { useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import moment from "moment";

// import { AiOutlineSearch } from "../../../icons";
// import { getCityByCode } from "../../../utils";
// import { useGetAllProvincesQuery } from "../../../api";
// import { useSearchModal } from "../../../hooks";

// const Search = () => {
//   const searchModal = useSearchModal();
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const { data: dataProvinces } = useGetAllProvincesQuery("");

//   const locationValue = params.get("location");
//   const checkinValue = params.get("checkin");
//   const checkoutValue = params.get("checkout");
//   const roomValue = params.get("room");

//   const locationLabel = useMemo(() => {
//     const data = dataProvinces || [];
//     return locationValue
//       ? getCityByCode(Number(locationValue), data)
//       : { name: "Nhập khách sạn / Điểm đến" };
//   }, [locationValue, dataProvinces]);

//   const durationLabel = useMemo(() => {
//     if (checkinValue && checkoutValue) {
//       const start = moment(checkinValue).format("DD/MM/YYYY");
//       const end = moment(checkoutValue).format("DD/MM/YYYY");

//       return `${start} -  ${end}`;
//     }

//     return "Thời gian";
//   }, [checkinValue, checkoutValue]);

//   const roomLabel = useMemo(() => {
//     if (roomValue) {
//       return `${roomValue} phòng`;
//     }

//     return "Phòng";
//   }, [roomValue]);

//   return (
//     <>
//       <div className="font-sans bg-white mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 rounded-[3px]">
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//           <div className="flex-grow  sm:w-1/2 md:w-1/4 lg:w-1/2">
//             <p className="font-medium text-base text-gray-600 mb-1 mr-2">
//               Bạn muốn nghỉ dưỡng ở đâu?
//             </p>
//             <div className="relative">
//               <input
//                 className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
//                 type=""
//                 value={locationLabel?.name}
//                 onClick={searchModal.onOpen}
//                 placeholder="Nhập địa điểm"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="flex-grow sm:w-1/2 md:w-1/4 lg:w-1/4">
//             <p className="font-medium text-base text-gray-600 mb-1">
//               Ngày nhận - trả phòng
//             </p>
//             <div className="relative">
//               <input
//                 className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
//                 type=""
//                 value={durationLabel}
//                 onClick={searchModal.onOpen}
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="flex-grow sm:w-1/2 md:w-1/4 lg:w-1/4">
//             <p className="font-medium text-base text-gray-600 mb-1">
//               Số phòng
//             </p>
//             <div className="relative">
//               <input
//                 className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
//                 type=""
//                 value={roomLabel}
//                 onClick={searchModal.onOpen}
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="flex-grow sm:w-1/2 md:w-1/4 lg:w-1/3">
//             <p className="font-medium text-base text-gray-600 mb-1">
//               Mã khuyến mãi/Voucher
//             </p>
//             <div className="relative">
//               <input
//                 className="pl-8 pr-2 text-sm bg-neutral-200 w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
//                 type=""
//                 value="Nhập mã khuyến mại/mã Voucher"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <div className="flex-grow ">
//             <div className="relative">
//               <input
//                 className="pl-8 pr-2 text-sm text-white bg-amber-400 w-full py-3 border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
//                 type=""
//                 value="Tìm kiếm"
//                 onClick={searchModal.onOpen}
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6 absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Search;
