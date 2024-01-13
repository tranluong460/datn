import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useGetAllReviewQuery } from "../../../api";
import moment from "moment";

type Comment = {
  id_user: string;
  createdAt: Date;
  rating: string;
  comment: string;
};

const ReviewInput = ({ data }: any) => {
  return (
    <>
      {data?.map((comment: any, index: number) => {
        return (
          <div className="border-b py-4" key={index}>
            <div className="flex gap-4">
              <span className="font-bold">{comment?.id_user}</span>
              <span>{moment(comment?.createdAt).format("DD-MM-YYYY")}</span>
            </div>

            <div className="flex gap-32">
              <Rate disabled defaultValue={comment?.rating} />
              {comment?.comment}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReviewInput;
