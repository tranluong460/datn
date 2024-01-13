import { Rate, message } from "antd";

import React, { useEffect, useState } from "react";
import { useGetAllReviewQuery } from "../../../api";
import moment from "moment";
import { useDeleteReviewMutation } from "../../../api";
import toast from "react-hot-toast";
type Comment = {
  id_user: string;
  createdAt: Date;
  rating: string;
  comment: string;
};

const ReviewInput = ({ data }: any) => {
  const [deleteReview] = useDeleteReviewMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const removeReview = async (id: string) => {
    deleteReview(id)
      .unwrap()
      .then(() => {
        toast.success("xóa thành công");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };
  return (
    <>
      {data?.map((comment: any, index: number) => {
        return (
          <div className="border-b py-4" key={index}>
            {contextHolder}
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
