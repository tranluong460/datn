import { Rate, Space } from "antd";
import React, { useState } from "react";
import { AiOutlineClose, AiTwotoneStar } from "react-icons/ai";

type Props = {};

const desc = [
  "Rất không hài lòng",
  "Không hài lòng",
  "Bình thường",
  "Tốt",
  "Xuất sắc",
];

const Evaluate = (props: Props) => {
  const [value, setValue] = useState(3);
  const [showForm, setShowForm] = useState(false);

  const handleReviewButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmitReview = (text: any) => {
    console.log(text);
    setShowForm(false);
  };

  return (
    <div className="relative">
      <div className="mt-10 max-w-[300px] py-[10px] px-[58px] text-center rounded-md text-[#ffffff]  bg-[#1982f9]">
        <button
          className="flex gap-2 items-center"
          onClick={handleReviewButtonClick}
        >
          <AiTwotoneStar /> Gửi đánh giá của bạn
        </button>
      </div>

      {showForm && (
        <div className=" top-40 left-1/2 fixed z-40">
          <button className="relative right-0 top-0 z-50">
            <AiOutlineClose />
          </button>
          <form className="   transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md">
            <span className="flex  gap-2">
              Đánh giá của bạn về: <p className="font-bold">Khách sạn Hà Nội</p>
            </span>
            <span>
              <p className="font-bold">
                Mức độ đánh giá:
                <Space>
                  <Rate tooltips={desc} onChange={setValue} value={value} />
                  {value ? <span>{desc[value - 1]}</span> : ""}
                </Space>
              </p>
            </span>

            <div className="flex flex-col">
              <span>Đánh giá</span>
              <input
                type="text"
                placeholder="Ví dụ: Khách sạn có dịch vụ rất tốt và đẹp"
                className="py-3 bg-blue-400"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmitReview}
              className="float-right text-[#ffffff]  bg-[#e30019] px-[18px] py-[12px] rounded-[4px] text-[14px] font-[500]"
            >
              Gửi đánh giá
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Evaluate;
