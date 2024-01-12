import React from "react";
import { ReviewInput, Comment } from "../../../components";
import Evaluate from "../../../components/client/Review/Evaluate";

type Props = {};

const Review = (props: Props) => {
  return (
    <div className="max-w-screen-xl mx-auto xl:px-8 md:px-6 sm:px-4 px-4 py-10 font-Lato bg-white mt-4 rounded-2xl">
      <div className="text-[#333333] font-semibold leading-7 text-2xl text-left">
        <span>Đánh giá & Nhận xét Khách sạn</span>
      </div>

      <Comment />

      <ReviewInput />
      <Evaluate />
    </div>
  );
};

export default Review;
