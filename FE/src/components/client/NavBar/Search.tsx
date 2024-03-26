import qs from "query-string";
import { useNavigate } from "react-router-dom";
import { ICountry } from "../../../interface";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { DatePicker, Space, Popover } from "antd";
import dayjs from "dayjs";

const disabledDate = (current: any) => {
  return current && current < moment().startOf("day");
};

const Search = () => {
  // thông báo nếu chưa nhập số lượng phòng
  const [errorMessage, setErrorMessage] = useState("");
  const [roomInfo, setRoomInfo] = useState([{ adults: 1, children: 0 }]);

  // thêm phòng
  const addRoom = () => {
    const newRoomInfo = [...roomInfo, { adults: 1, children: 0 }];
    setRoomInfo(newRoomInfo);
  };

  // xóa phòng
  const removeRoom = (index: number) => {
    const newRoomInfo = [...roomInfo];
    if (roomInfo.length <= 1) {
      return setRoomInfo;
    }
    newRoomInfo.splice(index, 1);
    setRoomInfo(newRoomInfo);
  };

  // tăng số lượng người lớn
  const handleIncrementAdults = (index: number) => {
    const newRoomInfo = [...roomInfo];

    if (newRoomInfo[index].adults < 6) {
      newRoomInfo[index].adults++;
      setRoomInfo(newRoomInfo);
    }
  };

  // giảm số lượng người lớn
  const handleDecrementAdults = (index: number) => {
    if (roomInfo[index].adults > 1) {
      const newRoomInfo = [...roomInfo];
      newRoomInfo[index].adults--;
      setRoomInfo(newRoomInfo);
    }
  };

  // tăng só lượng trẻ em
  const handleIncrementChildren = (index: number) => {
    const newRoomInfo = [...roomInfo];

    if (newRoomInfo[index].children < 5) newRoomInfo[index].children++;
    setRoomInfo(newRoomInfo);
  };

  // giảm số lượng trẻ em
  const handleDecrementChildren = (index: number) => {
    if (roomInfo[index].children > 0) {
      const newRoomInfo = [...roomInfo];
      newRoomInfo[index].children--;
      setRoomInfo(newRoomInfo);
    }
  };

  const content = (
    <div>
      <p className="text-[red] font-bold">{errorMessage}</p>
    </div>
  );
  // ẩn/hiện + - để chọn số lượng phòng,người lớn, trẻ em
  const [showAdditionalRooms, setShowAdditionalRooms] = useState(false);

  // lưu số lượng được chọn phòng,người lớn, trẻ em
  const [additionalRooms, setAdditionalRooms] = useState(0);

  // ẩn hiện bảng chọn số lượng
  const handleRoomLabelClick = () => {
    setShowAdditionalRooms(true);
  };

  let totalAdults = 0;
  let totalChildren = 0;

  roomInfo.forEach((room) => {
    totalAdults += room.adults;
    totalChildren += room.children;
  });

  // số lượng được chọn chỉ được 999 phòng
  const handleAdditionalRoomsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(e.target.value, 10) || 0;
    value = Math.min(value, 20);
    setAdditionalRooms(value);
  };

  const { RangePicker } = DatePicker;
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // thoát focus input số lượng phòng
  const inputRef = useRef(null);
  const handleClickOutside = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowAdditionalRooms(false);
    }
  };

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
      hotel: null,
    };

    if (dateRange.startDate) {
      updatedQuery.checkin = dateRange.startDate;
    }

    if (dateRange.endDate) {
      updatedQuery.checkout = dateRange.endDate;
    }

    if (additionalRooms) {
      updatedQuery.quantity = additionalRooms;
    }

    if (dateRange.endDate === "" || roomInfo.length <= 0) {
      setErrorMessage("Bạn cần nhập đầy đủ thông tin");
      return;
    }

    // Nếu không có lỗi, tiếp tục xử lý như bình thường
    updatedQuery.quantity = additionalRooms;

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
      <div className="font-sans bg-white mx-auto max-w-[750px] md:px-8 lg:px-8 rounded-[3px] shadow-xl">
        <h1 className="font-bold pt-4">Tìm phòng</h1>
        <div className="grid grid-cols-3 ">
          <div className="mt-[10px] mb-[20px] w-[250px]">
            <p className="font-medium text-base text-gray-600 mb-1">Ngày</p>
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
          <div className=" mt-[10px] mb-[20px] ml-[30px] basis-1/4 w-[275px] relative">
            <p className="font-medium text-base text-gray-600 mb-1">Phòng</p>

            <div className="relative">
              <div className="flex items-center">
                <div
                  ref={inputRef}
                  className={`pl-4 pr-2  text-sm bg-white w-full text-gray-500 py-3 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:border-yellow-500 hover:border-yellow-500 relative`}
                  onClick={handleRoomLabelClick}
                >
                  <div className="flex">
                    {roomInfo.length} Phòng <p className="mx-1">•</p>{" "}
                    {totalAdults} Người lớn <p className="mx-1">•</p>{" "}
                    {totalChildren} Trẻ em
                  </div>

                  {/* FIXME đang làm tìm kiếm*/}
                  {showAdditionalRooms && (
                    <div className="absolute right-2 top-11 bg-white px-2 py-4 translate-x-2 z-[999'] shadow border-t-2 w-[273px] border">
                      <div>
                        <h1>Phòng và khách</h1>
                        <div className="flex justify-between">
                          <div>
                            <p>Số lượng phòng</p>
                          </div>

                          <div className="flex gap-2 items-center">
                            <button
                              className="border rounded-full px-3 py-1 my-2 border-slate-950"
                              onClick={() => removeRoom(roomInfo.length - 1)}
                            >
                              -
                            </button>
                            <p>{roomInfo.length}</p>
                            <button
                              onClick={addRoom}
                              className="border rounded-full px-3 py-1 my-2 border-slate-950"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {roomInfo.map((room, index) => (
                        <div key={index}>
                          <div className="mb-2">
                            <p className="text-base">Phòng {index + 1}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-base">Người lớn</p>
                            </div>

                            <div>
                              <button
                                onClick={() => handleDecrementAdults(index)}
                                className="border rounded-full px-3 py-1 my-2 border-slate-950"
                              >
                                -
                              </button>
                              <span className="mx-2">{room.adults}</span>
                              <button
                                onClick={() => handleIncrementAdults(index)}
                                className="border rounded-full px-3 py-1 my-2 border-slate-950"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-base">Trẻ em</p>
                            </div>
                            <div>
                              <button
                                onClick={() => handleDecrementChildren(index)}
                                className="border rounded-full px-3 py-1 my-2 border-slate-950"
                              >
                                -
                              </button>
                              <span className="mx-2">{room.children}</span>
                              <button
                                onClick={() => handleIncrementChildren(index)}
                                className="border rounded-full px-3 py-1 my-2 border-slate-950"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeRoom(index)}
                            className="text-lg text-blue-500 font-bold"
                          >
                            Xóa phòng
                          </button>
                        </div>
                      ))}
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
          <div className="mt-[38px] ml-[90px]">
            <Popover content={content} title="Thông báo" trigger="click">
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
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
