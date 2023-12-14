import { useState, useEffect } from "react";
import { Container, Logo } from "../..";
import { motion, AnimatePresence } from "framer-motion";
interface FeedbackItem {
  comment: string;
}
const FeedbackData: FeedbackItem[] = [
  {
    comment:
      "The rooms and large and clean. And the location is fantastic!! Reminds me Rio I guess this is the Rio of Asia. Need to write two hundred words at least don't",
  },
  {
    comment:
      "Khách sạn có hệ thống phòng họp hiện đại, nhân viên phục vụ chu đáo và hỗ trợ lúc cần thiết, màn hình led lớn, chuyên nghiệp, chúng tôi sẽ quay lại vào thời gian tới và ủng hộ thương hiệu mường thanh trên khắp toàn quốc.",
  },
  {
    comment:
      "Phòng ở thoải mái, sạch sẽ. Vợ chồng mình rất hài lòng với dịch vụ của khách sạn và nhân viên phục vụ.... Cảm ơn bạn Kiều nhân viên lễ tân đã giúp đỡ vợ chồng mình rất nhiệt tình trong thời gian mình ở tại khách sạn. Sẽ ở đây khi mình quay lại nha trang!",
  },
  {
    comment:
      "Một nơi rất đáng yêu cho kỳ nghỉ gia đình. căn phòng nhỏ nhưng sạch sẽ và ấm áp trong thời tiết lạnh của Đà Lạt. Dịch vụ tuyệt vời, đội ngũ nhân viên thân thiện và quản lý chu đáo...",
  },
  {
    comment:
      "Hướng ra cửa biển nhật lệ. Xung quanh gần các quán hải sản. Khuân viên có bể bơi. Phòng óc tốt. Nhân viên nhiệt tình chu đáo. Nơi đây đã cho tôi ấn tượng rất tốt. Thật tuyệt khi dừng chân nơi đây.",
  },
];

const Feedback = () => {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prevIndex) =>
        prevIndex === FeedbackData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change comment every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNextClick = () => {
    setCurrentCommentIndex((prevIndex) =>
      prevIndex === FeedbackData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevClick = () => {
    setCurrentCommentIndex((prevIndex) =>
      prevIndex === 0 ? FeedbackData.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container>
      <div className="text-center">
        <Logo url="/" />
      </div>
      <div className="flex mb-10">
        <AnimatePresence exitBeforeEnter={false}>
          <motion.div
            key={currentCommentIndex}
            className="w-[550px] h-full border-x-[2px] p-4"
            initial={{ opacity: 0, x: 550 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -550 }}
            transition={{ duration: 1 }}
          >
            <p className="text-2xl select-none text-center font-medium font-sans md:font-mono text-neutral-500">
              "{FeedbackData[currentCommentIndex].comment}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center ">
        <button onClick={handlePrevClick} className="arrow-button mr-[300px]">
          <span className="text-yellow-500 text-3xl">&larr;</span>
          {/* Mũi tên trái */}
        </button>
        <button onClick={handleNextClick} className="arrow-button">
          <span className="text-yellow-500 text-3xl">&rarr;</span>
          {/* Mũi tên phải */}
        </button>
      </div>
    </Container>
  );
};

export default Feedback;

// import { Container, Logo, FeedbackCard } from "../..";

// const FeedbackData = [
//   {
//     comment:
//       "The rooms and large and clean. And the location is fantastic!! Reminds me Rio I guess this is the Rio of Asia. Need to write two hundred words at least don't",
//   },

//   {
//     comment:
//       "Khách sạn có hệ thống phòng họp hiện đại, nhân viên phục vụ chu đáo và hỗ trợ lúc cần thiết, màn hình led lớn, chuyên nghiệp, chúng tôi sẽ quay lại vào thời gian tới và ủng hộ thương hiệu mường thanh trên khắp toàn quốc.",
//   },
//   {
//     comment:
//       "The rooms and large and clean. And the location is fantastic!! Reminds me Rio I guess this is the Rio of Asia. Need to write two hundred words at least don't",
//   },

//   {
//     comment:
//       "Khách sạn có hệ thống phòng họp hiện đại, nhân viên phục vụ chu đáo và hỗ trợ lúc cần thiết, màn hình led lớn, chuyên nghiệp, chúng tôi sẽ quay lại vào thời gian tới và ủng hộ thương hiệu mường thanh trên khắp toàn quốc.",
//   },
// ];

// const Feedback = () => {
//   return (
//     <>
//       <Container>
//         <div className="text-center mb-8">
//           <Logo url="/" />
//         </div>
//         <div className="flex">
//           <div className="w-[550px] border-x-[2px] p-4">
//             <p className="text-2xl text-center font-medium font-sans md:font-mono text-neutral-500">
//               {FeedbackData.map((item) => (
//                 <FeedbackCard comment={item.comment} />
//               ))}
//             </p>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Feedback;
