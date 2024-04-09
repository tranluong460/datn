import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useSearchRoomMutation } from "../../../api";
import {
  Container,
  Filter,
  FilterDialog,
  FilterTop,
  ListHotel,
  Search,
} from "../../../components";
import { Radio, RadioChangeEvent } from "antd";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const HotelListPage = () => {
  const location = useLocation();
  const params = location.search;
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showRate, setShowRate] = useState(true);
  // const [locationValue, setLocationValue] = useState(params.get("location"));
  // const newUsser = params.get("location");

  const [searchParams] = useSearchParams();

  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const quantity = searchParams.get("quantity") || "";
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;

  const [search, setSearch] = useSearchRoomMutation();
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await search({
          checkin,
          checkout,
          quantity,
          maxPrice,
          minPrice,
        });
        setSearchResult(response?.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [checkin, checkout, quantity, search, minPrice, maxPrice]);

  const [selectedValues, setSelectedValues] = useState(1);
  // Cập nhật onChange function để thay đổi giá trị của radio button cho từng phần tử
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // chuyển ảnh
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const handlePrevImage = (id: number) => {
    setCurrentImageIndices((prevIndices: any) => ({
      ...prevIndices,
      [id]: prevIndices[id] > 0 ? prevIndices[id] - 1 : 0,
    }));
  };

  const handleNextImage = (id: number, maxIndex: number) => {
    setCurrentImageIndices((prevIndices: any) => ({
      ...prevIndices,
      [id]: prevIndices[id] < maxIndex ? prevIndices[id] + 1 : maxIndex,
    }));
  };

  // đặt phòng
  const bookRoom = () => {
    const bookingURL = `http://localhost:5173/booking?checkin=${checkin}&checkout=${checkout}&hotel=660e0d209b3248744855da80`;

    // Chuyển hướng sang trang booking
    window.location.href = bookingURL;
  };

  return (
    <>
      <Search />
      <Container>
        <FilterDialog
          isShowRate={showRate}
          onShowRate={() => setShowRate(!showRate)}
          isShowDialog={showDialog}
          onShowDialog={() => setShowDialog(!showDialog)}
        />

        <section className="max-w-[1400px] mx-auto mb-5 px-16">
          <div className="flex gap-2 shadow-none border-none  decoration-1 underline underline-offset-8 mx-auto mt-24">
            <span className="border-r-gray-500 pr-4 border-r">
              44B đường Lý Thường Kiệt 2RFX+PC Hà Nội
            </span>
            <span>Thông tin khách sạn</span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold my-4 text-2xl">Melia Hà Nội</h1>

            <div>
              <ul className="flex gap-2">
                <li>
                  <span className="rating-image___28LVp">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 14.039l-3.827 5.2.971-6.383-6.383.97L5.961 10l-5.2-3.827 6.383.971-.97-6.383L10 5.961l3.827-5.2-.971 6.383 6.383-.97-5.2 3.826 5.2 3.827-6.383-.971.97 6.383-3.826-5.2z"
                        fill="#C2C2C2"
                      ></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="rating-image___28LVp">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 14.039l-3.827 5.2.971-6.383-6.383.97L5.961 10l-5.2-3.827 6.383.971-.97-6.383L10 5.961l3.827-5.2-.971 6.383 6.383-.97-5.2 3.826 5.2 3.827-6.383-.971.97 6.383-3.826-5.2z"
                        fill="#C2C2C2"
                      ></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="rating-image___28LVp">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 14.039l-3.827 5.2.971-6.383-6.383.97L5.961 10l-5.2-3.827 6.383.971-.97-6.383L10 5.961l3.827-5.2-.971 6.383 6.383-.97-5.2 3.826 5.2 3.827-6.383-.971.97 6.383-3.826-5.2z"
                        fill="#C2C2C2"
                      ></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="rating-image___28LVp">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 14.039l-3.827 5.2.971-6.383-6.383.97L5.961 10l-5.2-3.827 6.383.971-.97-6.383L10 5.961l3.827-5.2-.971 6.383 6.383-.97-5.2 3.826 5.2 3.827-6.383-.971.97 6.383-3.826-5.2z"
                        fill="#C2C2C2"
                      ></path>
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="rating-image___28LVp">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 14.039l-3.827 5.2.971-6.383-6.383.97L5.961 10l-5.2-3.827 6.383.971-.97-6.383L10 5.961l3.827-5.2-.971 6.383 6.383-.97-5.2 3.826 5.2 3.827-6.383-.971.97 6.383-3.826-5.2z"
                        fill="#C2C2C2"
                      ></path>
                    </svg>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* phòng */}
          <div className="flex gap-2 mt-3">
            <span className="border-r-gray-500 border-r pr-2 cursor-pointer">
              Tất cả {searchResult?.data?.length}
            </span>
            <span>Phòng vip</span>
          </div>

          <div className="my-5">
            {searchResult?.data?.map((items: any, index: number) => {
              const id = items._id.toString(); // Assume each item has a unique id
              const maxIndex = items.images.length - 1;
              const currentIndex = currentImageIndices[id] || 0;
              return (
                <div className="flex my-4 border-gray-500 border">
                  <div className="relative max-w-[849px] max-h-[546px]">
                    <img
                      src={items.images[currentIndex].url}
                      alt=""
                      className="w-[849px] h-[500px] object-cover transition-all transition-shadow"
                    />

                    {/* chuyển ảnh */}
                    <div className="absolute  bottom-3 left-10 text-white font-bold text-xl items-center flex gap-1">
                      <button
                        className="text-2xl border border-transparent hover:border-white hover:border hover:rounded-full p-2"
                        onClick={() => handlePrevImage(id)}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                      <span>
                        {currentImageIndices[id] !== undefined
                          ? currentImageIndices[id] + 1
                          : 1}{" "}
                        / {items.images.length}
                      </span>
                      <button
                        className="text-2xl border border-transparent hover:border-white hover:border hover:rounded-full p-2"
                        onClick={() => handleNextImage(id, maxIndex)}
                      >
                        <AiOutlineArrowRight />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col w-full justify-between font-[Graphik,sans-serif] max-w-[600px]">
                    <div className="mt-16 px-10 ">
                      <span className="underline underline-offset-8 decoration-1 inline-flex text-[24px] leading-9 ">
                        Phòng {items.id_roomType.name} ({items.id_roomType.name}{" "}
                        Room)
                      </span>

                      <div className="flex gap-2 mt-2">
                        <span className="border-r border-r-gray-500 pr-2">
                          Giường đôi
                        </span>
                        <span className="border-r border-r-gray-500 pr-2">
                          hoặc 2 giường đơn
                        </span>
                        <span>32 m2</span>
                      </div>

                      <div className="mt-8 text-[15px] text-[#8C8C8C]">
                        <span className="">2 đêm đã bao gồm thuế</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between bg-[#c2c2c2] w-full pb-5 px-10 border-t border-t-slate-300">
                      <div className="flex justify-between border-b-slate-300 border-b py-8">
                        <div className="flex gap-3 ">
                          <div>
                            {/* TODO */}
                            <Radio.Group
                              onChange={onChange}
                              value={selectedValues}
                            >
                              <Radio value={1}></Radio>
                            </Radio.Group>
                          </div>

                          <div className="flex flex-col text-lg">
                            <p> Chỉ phòng lưu trú</p>
                            <p className="">
                              Từ {items.id_roomType.price} VND mỗi đêm
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-[550] text-[16px]">
                            {items.id_roomType.price} VND mỗi đêm
                          </p>
                        </div>
                      </div>

                      <button
                        className="min-w-full bg-[#918981] text-white
                        mb-4 py-4 hover:bg-[#938e83]
                        "
                        onClick={bookRoom}
                      >
                        Đặt phòng
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
};
``;
export default HotelListPage;

{
  /* <Container>
<FilterDialog
  isShowRate={showRate}
  onShowRate={() => setShowRate(!showRate)}
  isShowDialog={showDialog}
  onShowDialog={() => setShowDialog(!showDialog)}
/>

<Container>
  <div className="pt-5">
    <FilterTop onShowDialog={() => setShowDialog(!showDialog)} />
  </div>

  <div className="pb-24 pt-3">
    <h1 id="products-heading" className="sr-only">
      Danh sách phòng
    </h1>

    <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4">
      <Filter
        isShowRate={showRate}
        onShowRate={() => setShowRate(!showRate)}
      />

      <div className="lg:col-span-3">
        <ListHotel listHotel={searchResult?.data} />
      </div>
    </div>
  </div>
</Container>
</Container> */
}
