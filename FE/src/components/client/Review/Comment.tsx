import React, { useState } from "react";
import { Progress, Rate } from "antd";

type Props = {};

const Comment = (props: Props) => {
  return (
    <div className="flex mt-3 ml-32">
      <div className="flex flex-col items-center gap-2">
        <p className="text-[#e30019] text-4xl font-semibold leading-[56px] text-left">
          0/5
        </p>
        <span>
          <Rate disabled defaultValue={5} />
        </span>
        <span className="flex gap-1 justify-between">
          <p
            className="flex gap-1 items-center text-[
#111111] font-bold leading-5 text-left text-[14px]"
          >
            (3)
          </p>
          đánh giá & nhận xét
        </span>
      </div>
      <div className="ml-16 w-[50%] flex flex-col gap-2">
        <div className="flex">
          <span className="tracking-widest">5⭐</span>
          <Progress percent={100} />
          <span className="w-24">3 đánh giá</span>
        </div>
        <div className="flex">
          <span className="tracking-widest">4⭐</span>
          <Progress percent={100} />
          <span className="w-24">3 đánh giá</span>
        </div>
        <div className="flex">
          <span className="tracking-widest">3⭐</span>
          <Progress percent={100} />
          <span className="w-24">3 đánh giá</span>
        </div>
        <div className="flex">
          <span className="tracking-widest">2⭐</span>
          <Progress percent={100} />
          <span className="w-24">3 đánh giá</span>
        </div>
        <div className="flex">
          <span className="tracking-widest">1⭐</span>
          <Progress percent={100} />
          <span className="w-24">3 đánh giá</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
