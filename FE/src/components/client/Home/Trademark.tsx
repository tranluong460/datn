import { Container, TrademarkCard } from "../..";

const TrademarkData = [
  {
    image: "https://muongthanh.com/images/trademark/type/2019/05/original/brand_1_1556849367.jpg",
    title: "CÁC THƯƠNG HIỆU"
  },
  {
    image: "https://muongthanh.com/images/trademark/type/2019/05/original/brand_2_1556849374.jpg",
    title: "ĐIỂM ĐẾN"
  },
  {
    image: "https://muongthanh.com/images/trademark/type/2023/10/original/phan-khuc-holiday_1696914758.jpg",
    title: "ƯU ĐÃI"
  },
  {
    image: "https://muongthanh.com/images/trademark/type/2019/05/original/brand_4_1556849388.jpg",
    title: "DỊCH VỤ"
  },
];
const Trademark = () => {
  return (
    <>
      <Container>
        {/*  */} {/* Thương hiệu, ưu đãi, dịch vụ */}
    
        <div className="grid grid-cols-4 gap-0 text-center my-[10px]">
        {TrademarkData.map((item) => (
              <TrademarkCard
                title={item.title}
                image={item.image}
              />
            ))}

        </div>
        {/*  */}
      </Container>
    </>
  );
};

export default Trademark;
