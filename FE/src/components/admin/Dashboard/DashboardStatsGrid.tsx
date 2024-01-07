import React from "react";
import { IoBagHandle } from "react-icons/io5";

const DashboardStatsGrid = () => {
  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex border-sky-500 items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>

        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Phòng trống</span>
          <div className="flex  items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              $3425.60
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex border-orange-600 items-center justify-center bg-orange-600">
          <IoBagHandle className="text-2xl text-white" />
        </div>

        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Phòng được đặt
          </span>
          <div className="flex  items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              $3425.60
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex border-yellow-400 items-center justify-center bg-yellow-600">
          <IoBagHandle className="text-2xl text-white" />
        </div>

        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Số lượng khách
          </span>
          <div className="flex  items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              $3425.60
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex border-green-600 items-center justify-center bg-green-600">
          <IoBagHandle className="text-2xl text-white" />
        </div>

        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Khoản thu</span>
          <div className="flex  items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              $3425.60
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default DashboardStatsGrid;

function BoxWrapper({ children }: any) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
