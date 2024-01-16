import { Rate, Space } from "antd";
import React, { useState } from "react";
import { AiOutlineClose, AiTwotoneStar } from "react-icons/ai";
import { useCreateReviewMutation } from "../../../api";
import { Button, Result } from "antd";
const desc = [
  "Rất không hài lòng",
  "Không hài lòng",
  "Bình thường",
  "Tốt",
  "Xuất sắc",
];

const Evaluate = (datahotel: any, data: any) => {
  console.log("🚀 ~ Evaluate ~ userData:", data);
  const [createReview] = useCreateReviewMutation();
  const [value, setValue] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const handleReviewButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmitReview = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!reviewText || value < 1) {
      setError("Vui lòng nhập đánh giá và chọn mức độ đánh giá.");
      return;
    }
    try {
      await createReview({
        rating: value,
        comment: reviewText,
        id_hotel: datahotel?.id_hotel?._id,
      }).unwrap();
      setShowForm(false);
      setValue(0);
      setReviewText("");
      setError("");
    } catch (error: any) {
      setError(error?.data.message);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="relative">
      <div className="mt-10 max-w-[300px] py-4 px-8 text-center rounded-md text-white bg-[#1982f9]">
        <button
          className="flex gap-2 items-center"
          onClick={handleReviewButtonClick}
        >
          <AiTwotoneStar /> Gửi đánh giá của bạn
        </button>
      </div>

      {showForm && (
        <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-xl">
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
            onClick={handleCloseForm}
          ></div>
          <div className="relative bg-white p-8 rounded-md shadow-md">
            <button
              className="absolute top-0 right-0 p-2 text-gray-600"
              onClick={handleCloseForm}
            >
              <AiOutlineClose />
            </button>
            <form className="w-80 mx-auto ">
              <span className="flex gap-2">
                Đánh giá của bạn về:
                <p className="font-bold">{datahotel.id_hotel.name}</p>
              </span>
              <span>
                <p className="font-bold flex flex-col">
                  Mức độ đánh giá:
                  <Space>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span>{desc[value - 1]}</span> : ""}
                  </Space>
                </p>
              </span>

              <div className="flex flex-col mt-4">
                <span>Đánh giá</span>
                <textarea
                  placeholder="Ví dụ: Khách sạn có dịch vụ rất tốt và đẹp"
                  className="py-3 px-4 bg-gray-100 rounded-md w-full"
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <button
                type="button"
                onClick={handleSubmitReview}
                className="mt-4 w-full bg-[#e30019] text-white px-4 py-2 rounded-md font-bold"
              >
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluate;
