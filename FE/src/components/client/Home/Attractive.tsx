import { AttractiveCard } from "../..";

const Attractive = () => {
  const data = [
    {
      url: "1",
      image: "/images/ha-noi.jpg",
      label: "Hà Nội",
      secondary: "",
    },
    {
      url: "79",
      image: "/images/ho-chi-minh.jpg",
      label: "Hồ Chí Minh",
    },
    {
      url: "48",
      image: "/images/da-nang.jpg",
      label: "Đà Nẵng",
      row: true,
    },
    {
      url: "77",
      image: "/images/vung-tau.jpg",
      label: "Vũng Tàu",
      col: true,
    },
    // {
    //   url: "",
    //   image: "/images/nha-trang.jpg",
    //   label: "Nha Trang",
    //   row: true,
    // },
    // {
    //   url: "",
    //   image: "/images/hai-phong.jpg",
    //   label: "Hải Phòng",
    // },
    // {
    //   url: "",
    //   image: "/images/da-lat.jpeg",
    //   label: "Đà Lạt",
    // },
    // {
    //   url: "",
    //   image: "/images/sapa.jpg",
    //   label: "Sapa",
    //   col: true,
    // },
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
