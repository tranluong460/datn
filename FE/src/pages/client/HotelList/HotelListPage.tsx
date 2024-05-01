import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import moment from "moment";
import { useSearchRoomMutation, useGetAllHotelQuery } from "../../../api";
import { Container, FilterDialog, Search } from "../../../components";
import { Button, Modal, Radio, RadioChangeEvent, Image } from "antd";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useCookies } from "react-cookie";
const HotelListPage = () => {
  const { data } = useGetAllHotelQuery("");
  const [visibleRooms, setVisibleRooms] = useState(5); // Số lượng phòng hiển thị ban đầu

  const handleShowMore = () => {
    // Tăng số lượng phòng hiển thị thêm 2
    setVisibleRooms((prev) => prev + 2);
  };
  // show thông tin khách sạn
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
  const children = searchParams.get("children") || undefined;
  const adults = searchParams.get("adults") || undefined;

  const [search, setSearch] = useSearchRoomMutation();
  const [searchResult, setSearchResult] = useState(null);

  const checkinDate = moment(checkin);
  const checkoutDate = moment(checkout);
  const numberOfDays = checkoutDate.diff(checkinDate, "days");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await search({
          checkin,
          checkout,
          quantity,
          maxPrice,
          minPrice,
          adults,
          children,
        });
        setSearchResult(response?.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [
    checkin,
    checkout,
    quantity,
    search,
    minPrice,
    maxPrice,
    adults,
    children,
  ]);

  const { data: AllHotel } = useGetAllHotelQuery("");
  const [quantityRooms, setQuantityRooms]: any = useState({});
  const increaseRoom = (id: number) => {
    const currentQuantity = quantityRooms[id] || 0;
    const newQuantity = currentQuantity + 1;
    if (newQuantity <= Number(quantity)) {
      setQuantityRooms((prevQuantityRooms: any) => ({
        ...prevQuantityRooms,
        [id]: newQuantity,
      }));
    }
  };

  const decreaseRoom = (id: number) => {
    if (quantityRooms[id] > 1) {
      setQuantityRooms((prevQuantityRooms: any) => ({
        ...prevQuantityRooms,
        [id]: prevQuantityRooms[id] - 1,
      }));
    }
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
  const [, setCookie] = useCookies<string>();
  const bookRoom = (data: any) => {
    const numberOfDays = moment(checkout).diff(moment(checkin), "days");
    const totalPriceEnd = numberOfDays * data?.id_roomType?.price;
    const dataBooking = {
      check_in: checkin,
      check_out: checkout,
      total_price: totalPriceEnd,
      list_room: [
        {
          idRoom: data?._id,
          quantity: quantityRooms[data?._id] || 1,
        },
      ],
      city: 1,
    };

    setCookie("booking", dataBooking, { path: "/" });
    navigate(`/payment/${AllHotel?.data[0]?._id}`);
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
            <Button type="primary" onClick={showModal} className="text-white">
              Thông tin khách sạn
            </Button>
            <Modal
              title="Thông tin khách sạn"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <div>
                <span className="flex gap-1">
                  <h1 className="font-bold">Tên khách sạn:</h1>{" "}
                  {data?.data[0]?.name}
                </span>
                <span className="flex gap-1">
                  <h1 className="font-bold"> Địa chỉ:</h1>{" "}
                  {data?.data[0]?.address}
                </span>
                <span className="">
                  <h1 className="font-bold">Giới thiệu:</h1>
                  <h1>{data?.data[0]?.description}</h1>
                </span>
                <span className="flex gap-1">
                  <h1 className="font-bold">Email:</h1> {data?.data[0]?.email}
                </span>
                <span className="flex gap-1">
                  <h1 className="font-bold">SĐT:</h1>
                  {data?.data[0]?.phone}
                </span>

                <h1>
                  <Image width={200} src={data?.data[0]?.images[0].url} />
                </h1>
              </div>
            </Modal>
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
                        fillRule="evenodd"
                        clipRule="evenodd"
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
            <Link to="/review" className="hover:text-blue-500">
              <button>Xem đánh giá khách sạn</button>
            </Link>
          </div>

          <div className="my-5">
            {searchResult?.data
              ?.slice(0, visibleRooms)
              .map((items: any, index: number) => {
                console.log("🚀 ~ .map ~ items:", items);
                const id = items._id.toString(); // Assume each item has a unique id
                const maxIndex = items.images.length - 1;
                const currentIndex = currentImageIndices[id] || 0;
                return (
                  <div className="flex my-4 border-gray-500 border" key={index}>
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
                          {items.id_roomType.name} ({items.id_roomType.name}{" "}
                          Room)
                        </span>

                        {/* TODO tiện nghi */}
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {items?.id_amenities?.map((amenities: any) => {
                            return (
                              <span
                                className="border-r border-r-gray-500 pr-2 last:border-none"
                                key={amenities?._id}
                              >
                                {amenities?.name}
                              </span>
                            );
                          })}
                        </div>

                        <div className="mt-8 text-[15px] text-[#8C8C8C]">
                          <span className="">
                            {numberOfDays} đêm đã bao gồm thuế
                          </span>
                        </div>

                        <div>
                          <p>
                            {" "}
                            sử dụng cho {items?.id_roomType?.adults} người lớn
                          </p>
                          <p>
                            {" "}
                            sử dụng cho {items?.id_roomType?.children} trẻ em
                          </p>
                          <p>Giường ngủ: {items?.id_roomType?.bed}</p>

                          <div className="flex items-center justify-between">
                            <div>
                              <p> Số lượng phòng muốn đặt</p>
                            </div>

                            <div className="flex gap-2 items-center ">
                              <button
                                className="p-2 bg-blue-500 rounded-full text-white  w-[30px] h-[30px]"
                                onClick={() => decreaseRoom(items._id)}
                              >
                                -
                              </button>
                              {quantityRooms[items._id] || 1}
                              <button
                                className="p-2 bg-blue-500 rounded-full text-white  w-[30px] h-[30px]"
                                onClick={() => increaseRoom(items._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between bg-[#c2c2c2] w-full pb-5 px-10 border-t border-t-slate-300">
                        <div className="flex justify-between border-b-slate-300 border-b py-8">
                          <div className="flex gap-3 ">
                            <div>
                              <Radio.Group value={1}>
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
                          onClick={() => bookRoom(items)}
                        >
                          Đặt phòng
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Kiểm tra nếu còn phòng để hiển thị và nút "Xem thêm" chưa bị ẩn */}
            <div className="text-center">
              {searchResult?.data.length > visibleRooms && (
                <button
                  onClick={handleShowMore}
                  className="bg-blue-500 py-3 px-10 text-white rounded-md my-5"
                >
                  Xem thêm
                </button>
              )}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default HotelListPage;
