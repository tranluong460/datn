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
  const [showSearch, setShowSearch] = useState(true);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleHideSearch = () => {
    setShowSearch(false);
  };

  const handleShowRoomDetail = () => {
    setShowRoomDetail(true);
  };

  const handleHideRoomDetail = () => {
    setShowRoomDetail(false);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <Top />
        <Service />
        <ComboPrice />
        <Between />
        <Search />

        <div className=" w-full">
          <Map />
        </div>
        <Information />
      </div>
    </>
  );
};

export default HomePage;
