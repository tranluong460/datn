import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

import { AiOutlineSearch } from "../../../icons";
import { getCityByCode } from "../../../utils";
import { useGetAllProvincesQuery } from "../../../api";
import { useSearchModal } from "../../../hooks";

const Search = () => {
  const searchModal = useSearchModal();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { data: dataProvinces } = useGetAllProvincesQuery("");

  const locationValue = params.get("location");
  const checkinValue = params.get("checkin");
  const checkoutValue = params.get("checkout");
  const roomValue = params.get("room");

  const locationLabel = useMemo(() => {
    const data = dataProvinces || [];
    return locationValue
      ? getCityByCode(Number(locationValue), data)
      : { name: "Vị trí" };
  }, [locationValue, dataProvinces]);

  const durationLabel = useMemo(() => {
    if (checkinValue && checkoutValue) {
      const start = moment(checkinValue).format("DD/MM/YYYY");
      const end = moment(checkoutValue).format("DD/MM/YYYY");

      return `${start} -  ${end}`;
    }

    return "Thời gian";
  }, [checkinValue, checkoutValue]);

  const roomLabel = useMemo(() => {
    if (roomValue) {
      return `${roomValue} phòng`;
    }

    return "Phòng";
  }, [roomValue]);

  return (
    <>
      <div
        onClick={searchModal.onOpen}
        className=""
      >
        <div className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse">
          <div className="text-gray-900 dark:text-white hover:border-b-2 hover:border-orange-500 transition">
           <button>{locationLabel?.name}</button> 
          </div>

          <div className="text-gray-900 dark:text-white hover:border-b-2 hover:border-orange-500 transition">
            <button>{durationLabel}</button>
          </div>

          <div className="text-gray-900 dark:text-white hover:border-b-2 hover:border-orange-500 transition">
            <button className="hidden md:block">{roomLabel}</button>
          </div>

          <div className="p-2 rounded-full bg-backgroundLight dark:bg-backgroundDark">
              <AiOutlineSearch size={20} />
            </div>
        </div>
      </div>
    </>
  );
};

export default Search;
