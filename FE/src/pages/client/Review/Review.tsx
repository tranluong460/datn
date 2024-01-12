import React, { useEffect, useState } from "react";
import { ReviewInput, Comment } from "../../../components";
import Evaluate from "../../../components/client/Review/Evaluate";
import { useGetAllReviewQuer } from "../../../api";

const Review = () => {
  const { data } = useGetAllReviewQuery();

  const [Data, setData] = useState([]);
  console.log("🚀 ~ ReviewInput ~ Data:", Data);

  useEffect(() => {
    if (data?.data) {
      setData(data?.data);
    }
  }, [data]);

  return (
    <div className="max-w-screen-xl mx-auto xl:px-8 md:px-6 sm:px-4 px-4 py-10 font-Lato bg-white mt-4 rounded-2xl">
      <div className="text-[#333333] font-semibold leading-7 text-2xl text-left">
        <span>Đánh giá & Nhận xét Khách sạn</span>
      </div>

      <Comment />
      <ReviewInput data={Data} />
      <Evaluate />
    </div>
  );
};

export default Review;
