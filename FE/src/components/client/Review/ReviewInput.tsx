import { Rate } from "antd";
import React from "react";

type Props = {};
const comment = [
  {
    id: 1,
    id_user: "ddddweee1233445",
    rating: 5,
    name: "nádđ",
    comment: "khách sạn rất đẹp đất nha",
  },
  {
    id: 2,
    id_user: "ddddweee1233445",
    rating: 4,
    name: "nádđ",
    comment: "khách sạn rất đẹp đất nhafff",
  },
  {
    id: 3,
    id_user: "ddddweee1233445",
    rating: 2,
    name: "nádđ",
    comment: "khách sạn rất đẹp đất nhad",
  },
  {
    id: 4,
    id_user: "ddddweee1233445",
    rating: 3,
    name: "nádđ",
    comment: "khách sạn rất đẹp đất nha a",
  },
  {
    id: 5,
    id_user: "ddddweee1233445",
    rating: 2,
    name: "nádđ",
    comment: "khách sạn rất đẹp đất nha s",
  },
  {
    id: 6,
    name: "nádđ",
    id_user: "ddddweee1233445",
    rating: 1,
    comment: "khách sạn rất đẹp đất nha 123",
  },
];
const ReviewInput = (props: Props) => {
  return (
    <>
      {comment.map((comment: any) => {
        return (
          <div className="border-b py-4">
            <div className="flex gap-4">
              <span className="font-bold">{comment.name}</span>
              <span>30-12-2023</span>
            </div>

            <div className="flex gap-36">
              <Rate disabled defaultValue={comment.rating} />
              {comment.comment}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReviewInput;
