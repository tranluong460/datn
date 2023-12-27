import { Container, Search } from "../..";
import { useState, useEffect } from "react";

const Top = () => {
  const image = [
    "https://booking.muongthanh.com/images/banners/original/banner-du-lich-kham-pha-2_1696491847.jpg",
    // "https://teccodosonhotel.com.vn/wp-content/uploads/2017/08/anh-1-1470946509186-1200x480.jpg",
    "https://booking.muongthanh.com/images/banners/original/banner-du-lich-ha-noi_1696492424.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
    }, 4000); // Change image every 3 seconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []); // Re-run the effect when the component mounts

  return (
    <>
      <Container>
      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center">
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
        {/* absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 */}
        <div className="-translate-y-1/3 ">
          <Search/>
        </div>
        </div>
      </Container>
    </>
  );
};

export default Top;
