import qs from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICountry } from "../../../interface";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { DatePicker, Space, Popover } from "antd";
import dayjs from "dayjs";
import {
  AiOutlineSearch,
  AiOutlineUsergroupDelete,
  AiOutlineClose,
} from "react-icons/ai";

const disabledDate = (current: any) => {
  return current && current < moment().startOf("day");
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const checkin = searchParams.get("checkin") || "";

  // ấn vào nút tìm kiếm nó sẽ render lại
  const [isSearched, setIsSearched] = useState(false);

  // thông báo nếu chưa nhập số lượng phòng
  const [errorMessage, setErrorMessage] = useState("");
  const [roomInfo, setRoomInfo] = useState([{ adults: 1, children: 0 }]);

  // thêm phòng
  const addRoom = () => {
    if (roomInfo.length < 8) {
      const newRoomInfo = [...roomInfo, { adults: 1, children: 0 }];
      setRoomInfo(newRoomInfo);
    }
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

  useEffect(() => {
    if (isSearched) {
      window.location.reload();
    }
  }, [isSearched]);

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

    if (dateRange.endDate === "") {
      setErrorMessage("Bạn cần nhập thông tin ngày nhận phòng và trả phòng");
      return;
    }

    // Nếu không có lỗi, tiếp tục xử lý như bình thường
    updatedQuery.quantity = roomInfo.length;
    updatedQuery.children = roomInfo[0].children;
    updatedQuery.adults = roomInfo[0].adults;

    setIsSearched(true);
    const url = qs.stringifyUrl(
      {
        url: "/hotel-list",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    navigate(url);
  };

  // TODO làm thanh ẩn hiện
  // const [isVisible, setIsVisible] = useState(true);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;
  //     const isVissibleNow = scrollTop < window.innerHeight * 0.9;
  //     setIsVisible(isVissibleNow);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
    setIsVisible(false);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setIsVisible(true);
  };

  // FIXME test fix
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);
  useEffect(() => {
    if (isExpanded) {
      setIsScrollDisabled(true);
    } else {
      setIsScrollDisabled(false);
    }
  }, [isExpanded]);
  return (
    <>
      {isExpanded && <div className="overlay" />}
      <button
        className={`fixed text-black text-4xl top-3 right-1 z-[999] ${
          isExpanded ? "" : "hidden"
        }`}
        onClick={handleCollapse}
      >
        <AiOutlineClose />
      </button>
      <div
        onClick={handleExpand}
        className={`grid grid-cols-[400px_340px_560px] justify-start border ${
          checkin == "" ? "mt-2" : ""
        } z-[999] border-gary-300  shadow-xl mx-auto text-base max-w-[1300px] fixed bg-white ${
          isExpanded
            ? ` top-20 inset-x-0 z-50 transition-search`
            : `${
                checkin == "" ? "left-[3%] bottom-10" : ""
              }  2xl:left-[15%] transition-search-bottom`
        }`}

        // search-bar ${ isVisible ? "visible" : "hidden" }
      >
        <div className="flex items-center ml-3 gap-2 border-r-[1px] border-gray-300 text-[18px]">
          <p>
            <AiOutlineSearch />
          </p>

          <p className="text-black">Khách sạn Melia Hà Nội Việt Nam</p>
        </div>
        <div className="flex items-center ml-6 gap-2 border-r-[1px] border-gray-300 py-4 text-[18px]">
          <Space direction="vertical" size={12}>
            <RangePicker
              className="
              py-[11px] focus:border-yellow-500 hover:border-yellow-500 border-none"
              disabledDate={disabledDate}
              defaultValue={[dayjs(), dayjs().add(1, "days")]}
              onChange={(dates, dateStrings) => {
                handleExpand();
                setDateRange({
                  startDate: dateStrings[0],
                  endDate: dateStrings[1],
                });
              }}
            />
          </Space>
        </div>
        <div
          className="flex items-center justify-between ml-4 text-[18px] relative font-[Graphik]"
          ref={inputRef}
        >
          <div className="flex items-center gap-2">
            <p>
              <AiOutlineUsergroupDelete />
            </p>
            <div className="flex" onClick={handleRoomLabelClick}>
              {roomInfo.length} Phòng <p className="mx-1">•</p> {totalAdults}{" "}
              Người lớn
              {totalChildren === 0 ? (
                ""
              ) : (
                <span>
                  <span className="mx-1">•</span> {totalChildren} Trẻ em
                </span>
              )}
            </div>
          </div>
          {showAdditionalRooms && (
            <div
              className={`absolute -left-6 top-full bg-white px-2 py-4 translate-x-2 z-[999'] shadow border-t-2 w-[273px] overflow-auto ${
                roomInfo.length === 1 ? "h-72" : "h-96"
              } ${
                showAdditionalRooms ? "border-t-black border" : "border-none"
              } `}
            >
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

                  {roomInfo.length == 1 ? (
                    ""
                  ) : (
                    <button
                      onClick={() => removeRoom(index)}
                      className="text-lg text-blue-500 font-bold"
                    >
                      Xóa phòng
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          <div>
            <Popover content={content} title="Thông báo" trigger="click">
              <button
                className="bg-[#918981] w-[150px] py-4 mr-2 text-white font-[Graphik] text-[15px] leading-6 focus:border-yellow-500 hover:border-yellow-500 rounded transition-all duration-300 focus:outline-none"
                onClick={onSubmit}
              >
                Tìm kiếm
              </button>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
