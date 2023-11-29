import { AttractiveCard } from "../..";

const Attractive = () => {
  const data = [
    {
      url: "1",
      image: "/images/client/home/ha-noi.jpg",
      label: "Hà Nội",
      secondary: "",
    },
    {
      url: "79",
      image: "/images/client/home/ho-chi-minh.jpg",
      label: "Hồ Chí Minh",
    },
    {
      url: "",
      image: "/images/client/home/da-lat.jpeg",
      label: "Đà Lạt",
      row: true,
    },
    {
      url: "",
      image: "/images/client/home/sapa.jpg",
      label: "Sapa",
      col: true,
    },
    {
      url: "",
      image: "/images/client/home/nha-trang.jpg",
      label: "Nha Trang",
      row: true,
    },
    {
      url: "",
      image: "/images/client/home/hai-phong.jpg",
      label: "Hải Phòng",
    },
    {
      url: "",
      image: "/images/client/home/da-nang.jpg",
      label: "Đà Nẵng",
    },
    {
      url: "",
      image: "/images/client/home/vung-tau.jpg",
      label: "Vũng Tàu",
      col: true,
    },
  ];

  return (
    <>
      <div className="py-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-8">
          <div className="mb-5 text-center md:mb-8">
            <h2 className="text-2xl font-bold lg:text-3xl text-texLight dark:text-textDark">
              Điểm đến nổi bật
            </h2>
          </div>

          <div className="grid auto-cols-auto grid-flow-row auto-rows-auto grid-cols-3 lg:gap-5 gap-2">
            {data.map((item) => (
              <AttractiveCard
                key={item.image}
                url={item.url}
                imageUrl={item.image}
                label={item.label}
                secondary={item.secondary}
                col={item.col}
                row={item.row}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Attractive;
