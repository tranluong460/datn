import { useState } from "react";
import {
  Service,
  Top,
  ComboPrice,
  Map,
  Between,
  Information,
  Search,
} from "../../../components";
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <Top />
        <Service />
        <ComboPrice />
        <Between />
        {/* <Search /> */}

        <div className=" w-full">
          <Map />
        </div>
        <Information />
      </div>
    </>
  );
};

export default HomePage;
