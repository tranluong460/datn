import qs from "query-string";
import { useNavigate } from "react-router-dom";
import { ICountry } from "../../../interface";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const disabledDate = (current: any) => {
  return current && current < moment().startOf("day");
};

const Search = () => {
  // thông báo nếu chưa nhập số lượng phòng
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ẩn/hiện + - để chọn số lượng phòng,người lớn, trẻ em
  const [showAdditionalRooms, setShowAdditionalRooms] = useState(false);
  // const [showAdditionalAdults, setShowAdditionalAdults] = useState(false);
  // const [showAdditionalChildrens, setShowAdditionalChildrens] = useState(false);

  // lưu số lượng được chọn phòng,người lớn, trẻ em
  const [additionalRooms, setAdditionalRooms] = useState(0);
  // const [additionalAdults, setAdditionalAdults] = useState(0);
  // const [additionalChildrens, setAdditionalChildrens] = useState(0);

  // ẩn hiện bảng chọn số lượng
  const handleRoomLabelClick = () => {
    setShowAdditionalRooms(true);
  };

  // const handleAdultLabelClick = () => {
  //   setShowAdditionalAdults(true);
  // };

  // const handleChildrenLabelClick = () => {
  //   setShowAdditionalChildrens(true);
  // };

  // số lượng được chọn chỉ được 999 phòng
  const handleAdditionalRoomsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(e.target.value, 10) || 0;
    value = Math.min(value, 999);
    setAdditionalRooms(value);
  };

  // const handleAdditionalAdultsChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   let value = parseInt(e.target.value, 10) || 0;
  //   value = Math.min(value, 999);
  //   setAdditionalAdults(value);
  // };

  // const handleAdditionalChildrensChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   let value = parseInt(e.target.value, 10) || 0;
  //   value = Math.min(value, 999);
  //   setAdditionalChildrens(value);
  // };

  const { RangePicker } = DatePicker;
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  //   số lượng phòng
  const roomLabel = useMemo(() => {
    const totalRooms =
      additionalRooms +
      (params.get("room") ? parseInt(params.get("room")!, 10) : 0);
    return `${totalRooms == 0 ? "" : totalRooms} phòng`;
  }, [additionalRooms, params]);

  const handleDecrementRooms = () => {
    if (additionalRooms > 0) {
      setAdditionalRooms((prev) => prev - 1);
    }
  };

  // thoát focus input số lượng phòng
  const inputRef = useRef(null);
  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowAdditionalRooms(false);
    }
  };

  // Số lượng người lớn
  // const adult = useMemo(() => {
  //   const totalAdults =
  //     additionalAdults +
  //     (params.get("adult") ? parseInt(params.get("adult")!, 10) : 0);
  //   return `${totalAdults == 0 ? "" : totalAdults} Người lớn`;
  // }, [additionalAdults, params]);

  // const handleDecrementAdults = () => {
  //   if (additionalAdults > 0) {
  //     setAdditionalAdults((prev) => prev - 1);
  //   }
  // };

  // thoát focus input số người lớn
  // const inputRefAdult = useRef(null);
  // const handleClickOutSide = (e: any) => {
  //   if (inputRefAdult && !inputRefAdult.current.contains(e.target)) {
  //     setShowAdditionalAdults(false);
  //   }
  // };

  // số lượng trẻ em

  // const children = useMemo(() => {
  //   const totalChildrens =
  //     additionalChildrens +
  //     (params.get("children") ? parseInt(params.get("children")!, 10) : 0);
  //   return `${totalChildrens == 0 ? "" : additionalChildrens} trẻ em`;
  // }, [additionalChildrens, params]);

  // const handleDecrementChildrens = () => {
  //   if (additionalChildrens > 0) {
  //     setAdditionalChildrens((prev) => prev - 1);
  //   }
  // };

  // thoát focus input số trẻ em
  // const inputRefChildren = useRef(null);
  // const handleClickOutSides = (e: any) => {
  //   if (
  //     inputRefChildren.current &&
  //     !inputRefChildren.current.contains(e.target)
  //   ) {
  //     setShowAdditionalChildrens(false);
  //   }
  // };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // tìm phòng
  const location = useLocation();
  const navigate = useNavigate();

  const [city, setCity] = useState<ICountry>();
  const [dateRange, setDateRange] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(1, "days").format("YYYY-MM-DD"),
  });

  const onSubmit = () => {
    let currentQuery = {};

    if (location.search) {
      currentQuery = qs.parse(location.search.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      location: city?.code,
      hotel: null,
    };

    if (city) {
      updatedQuery.location = city.code;
    } else {
      updatedQuery.location = 1;
    }

    if (dateRange.startDate) {
      updatedQuery.checkin = dateRange.startDate;
    }

    if (dateRange.endDate === "") {
      // updatedQuery.checkout = dateRange.endDate;
      setHasError(true);
      setErrorMessage("Bạn chưa nhập ngày ở ngày đi");
      return;
    }

    if (additionalRooms) {
      updatedQuery.room = additionalRooms;
    }

    if (additionalRooms <= 0) {
      setHasError(true);
      setErrorMessage("Bạn chưa nhập số lượng phòng");
      return;
    }

    // Nếu không có lỗi, tiếp tục xử lý như bình thường
    updatedQuery.room = additionalRooms;

    const url = qs.stringifyUrl(
      {
        url: "/hotel-list",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    navigate(url);
  };

  return (
    <>
      <div className="font-sans bg-white mx-auto max-w-[50%] px-5 md:px-8 lg:px-8 rounded-[3px] shadow-xl">
        <h1 className="font-bold pt-4">Tìm phòng</h1>
        <div className="grid grid-cols-3">
          {" "}
          {/* space-x-4 */}
          <div className="relative mt-[10px] mb-[20px]">
            <p className="font-medium text-base text-gray-600 mb-1">
              Ngày nhận phòng → Ngày Trả phòng
            </p>

            <Space direction="vertical" size={12}>
              <RangePicker
                className="py-[11px] focus:border-yellow-500 hover:border-yellow-500"
                disabledDate={disabledDate}
                defaultValue={[dayjs(), dayjs().add(1, "days")]}
                onChange={(dates, dateStrings) => {
                  setDateRange({
                    startDate: dateStrings[0],
                    endDate: dateStrings[1],
                  });
                }}
              />
            </Space>
          </div>
          <div className="relative mt-[10px] mb-[20px] ml-[15px] basis-1/4 max-w">
            <p className="font-medium text-base text-gray-600 mb-1">
              Số lượng phòng
            </p>
            <div className="relative">
              <div className="flex items-center">
                <div
                  ref={inputRef}
                  className={`pl-4 pr-2  text-sm bg-white w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500 relative`}
                  onClick={handleRoomLabelClick}
                >
                  {roomLabel}

                  {showAdditionalRooms && (
                    <div className="flex items-center absolute right-0 -bottom-[74px] bg-white px-2 py-4 translate-x-2 z-[999] shadow border-t-2">
                      <button
                        className="bg-gray-300 px-4 py-2 rounded-sm"
                        onClick={handleDecrementRooms}
                      >
                        -
                      </button>
                      <input
                        className="pl-2 pr-2 text-sm bg-neutral-200 w-14 mx-1 text-center text-gray-500 py-2 border-t border-b border-gray-300 transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                        type="text"
                        value={additionalRooms}
                        onChange={handleAdditionalRoomsChange}
                      />
                      <button
                        className="bg-gray-300 px-4 py-2 rounded-sm"
                        onClick={() => {
                          const newValue = additionalRooms + 1;
                          if (newValue <= 1000) {
                            setAdditionalRooms(newValue);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* //! số lượng người lớn , trẻ em ! */}
          {/* <div className="relative mt-[10px] mb-[20px] ml-[15px] basis-1/4 max-w-[15%]">
              <p className="font-medium text-base text-gray-600 mb-1">
                Người lớn
              </p>
              <div className="relative">
                <div className="flex items-center">
                  <div
                    ref={inputRefAdult}
                    className={`pl-8 pr-2  text-sm bg-white w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500 relative`}
                    onClick={handleAdultLabelClick}
                  >
                    {adult}
                    {showAdditionalAdults && (
                      <div className="flex items-center absolute right-0 -bottom-[74px] bg-white px-2 py-4 translate-x-2 z-[999] shadow border-t-2">
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-sm"
                          onClick={handleDecrementAdults}
                        >
                          -
                        </button>
                        <input
                          className="pl-2 pr-2 text-sm bg-neutral-200 w-14 mx-1 text-center text-gray-500 py-2 border-t border-b border-gray-300 transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                          type="text"
                          value={additionalAdults}
                          onChange={handleAdditionalAdultsChange}
                        />
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-sm"
                          onClick={() => {
                            const newValue = additionalAdults + 1;
                            if (newValue <= 1000) {
                              setAdditionalAdults(newValue);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative mt-[10px] mb-[20px] ml-[15px] basis-1/4 max-w-[15%]">
              <p className="font-medium text-base text-gray-600 mb-1">Trẻ em</p>
              <div className="relative">
                <div className="flex items-center">
                  <div
                    ref={inputRefChildren}
                    className={`pl-8 pr-2  text-sm bg-white w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500 relative`}
                    onClick={handleChildrenLabelClick}
                  >
                    {children}
                    {showAdditionalChildrens && (
                      <div className="flex items-center absolute right-0 -bottom-[74px] bg-white px-2 py-4 translate-x-2 z-[999] shadow border-t-2">
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-sm"
                          onClick={handleDecrementChildrens}
                        >
                          -
                        </button>
                        <input
                          className="pl-2 pr-2 text-sm bg-neutral-200 w-14 mx-1 text-center text-gray-500 py-2 border-t border-b border-gray-300 transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
                          type="text"
                          value={additionalChildrens}
                          onChange={handleAdditionalChildrensChange}
                        />
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-sm"
                          onClick={() => {
                            const newValue = additionalChildrens + 1;
                            if (newValue <= 1000) {
                              setAdditionalChildrens(newValue);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
          <div className="relative mt-[38px] ml-[15px] ">
            <button
              className="relative pl-8 pr-2 text-sm text-white bg-amber-400 py-3 border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500"
              onClick={onSubmit}
            >
              Tìm kiếm
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
            </button>
            {hasError && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
