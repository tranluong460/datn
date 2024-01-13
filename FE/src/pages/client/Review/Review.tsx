import React, { useEffect, useState } from "react";
import { ReviewInput, Comment } from "../../../components";
import Evaluate from "../../../components/client/Review/Evaluate";
import { useGetAllReviewQuery } from "../../../api";

const Review = ({ dataHotel }: any) => {
  const { data } = useGetAllReviewQuery();
  const [Data, setData] = useState([]);
  const [RatingReview, setReview] = useState([]);

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

      <Comment data={Data} />
      <ReviewInput data={Data} />
      <Evaluate id_hotel={dataHotel} />
    </div>
  );
};

export default Review;
