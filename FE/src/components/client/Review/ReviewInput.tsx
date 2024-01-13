import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useGetAllReviewQuery } from "../../../api";
import moment from "moment";
import { useDeleteReviewMutation } from "../../../api";
type Comment = {
  id_user: string;
  createdAt: Date;
  rating: string;
  comment: string;
};

const ReviewInput = ({ data }: any) => {
  console.log("🚀 ~ ReviewInput ~ data:", data);
  const [deleteReview] = useDeleteReviewMutation();

  const removeReview = async (id: string) => {
    try {
      await deleteReview(id);
    } catch (error) {
      console.error("Lỗi khi xóa bình luận", error);
    }
  };
  return (
    <>
      {data?.map((comment: any, index: number) => {
        return (
          <div className="border-b py-4" key={index}>
            <div className="flex gap-4">
              <span className="font-bold">{comment?.id_user?.email}</span>
              <span>{moment(comment?.createdAt).format("DD-MM-YYYY")}</span>
            </div>

            <div className="flex gap-24">
              <Rate disabled defaultValue={comment?.rating} className="flex" />
              {comment?.comment}1
            </div>

            <button
              className="bg-blue-500 p-1 px-2 text-[white] rounded-md mt-2"
              onClick={() => removeReview(comment?._id)}
            >
              xóa bình luận
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ReviewInput;
