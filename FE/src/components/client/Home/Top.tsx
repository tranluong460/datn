import { Container, Search } from "../..";
import { useState, useEffect } from "react";

const Top = () => {
  //TODO test ẩn hiện tìm kiếm
  // const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Kiểm tra điều kiện để ẩn hoặc hiện phần tìm kiếm dựa trên cuộc di chuyển của người dùng
  //     if (window.scrollY < 100) {
  //       setIsSearching(true);
  //     } else {
  //       setIsSearching(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const handleSearch = () => {
  //   // Xử lý khi người dùng nhấn vào nút tìm kiếm
  //   // Đặt trạng thái của phần tìm kiếm để hiển thị ở đầu trang
  //   setIsSearching(true);

  //   const searchDom = document.querySelector(".fixed");
  //   searchDom?.classList.remove("bottom-0");
  //   searchDom?.classList.add("top-24");
  //   // Scroll lên đầu trang
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  // ! end test

  const image = [
    "https://booking.muongthanh.com/images/banners/original/banner-du-lich-kham-pha-2_1696491847.jpg",
    // "https://teccodosonhotel.com.vn/wp-content/uploads/2017/08/anh-1-1470946509186-1200x480.jpg",
    "https://booking.muongthanh.com/images/banners/original/banner-du-lich-ha-noi_1696492424.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Container>
        <div className="flex flex-row max-lg:flex-col p-3 md:p-10">
          <div className="col-span-6 p-5">
            <div className="flex flex-row items-center">
              <h3 className="w-max select-none py-0 px-[0.5rem] pr-[1rem] rounded-[50px] font-medium text-[1.7rem] bg-[#faa935] text-textLight dark:text-textDark font-Island">
                Know Before You Go
              </h3>

              <img
                src="/images/world.png"
                alt="Tour"
                className="w-[2.3rem] h-[2.3rem] select-none"
              />
            </div>

            <h1 className="md:text-[3.2rem] text-[2rem] font-semibold mt-[1rem] mb-[2rem] text-textLight dark:text-textDark select-none">
              Tạo dấu ấn trong kỳ nghỉ của bạn với
              <br className="block sm:hidden" />
              <span className="text-orange-500"> Seven Teen</span>
            </h1>

            <p className="text-[1.1rem] leading-[2rem] text-textLight2nd dark:text-textDark2nd select-none">
              Tận hưởng kỳ nghỉ lý tưởng tại khách sạn chúng tôi - nơi hòa quyện
              giữa tiện nghi hiện đại và không gian thoáng đãng, mang đến cho
              bạn trải nghiệm đáng nhớ. Đặt phòng ngay hôm nay để có cơ hội nhận
              ưu đãi đặc biệt!
            </p>
          </div>

          <div className="flex flex-row gap-5 col-span-2">
            <div className="col-span-2">
              <img
                src="/images/hero-img-1.jpg"
                alt="Hero"
                className="w-[400px] h-[350px] rounded-[20px] border-[1px] object-cover border-divideLight dark:border-divideDark"
              />
            </div>

            <div className="col-span-2 mt-0 lg:mt-6">
              <video
                src="/images/hero-video.mp4"
                controls
                className="w-[400px] h-[350px] rounded-[20px] border-[1px] object-cover border-divideLight dark:border-divideDark"
              />
            </div>

            <div className="col-span-2 mt-0 lg:mt-12">
              <img
                src="/images/hero-img-2.jpg"
                alt="Hero"
                className="w-[400px] h-[350px] rounded-[20px] border-[1px] object-cover border-divideLight dark:border-divideDark"
              />
            </div>
          </div>
        </div>
        <div className="relative ">
          <div className="flex justify-center items-center overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`w-full transition-transform transform ${
                  index === 1
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  transition: "transform 1s, opacity 1s",
                  flex: " 0 0 100%",
                }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={image[(currentImageIndex + index) % image.length]}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Search />
        </div>
      </Container>
    </>
  );
};

export default Top;
