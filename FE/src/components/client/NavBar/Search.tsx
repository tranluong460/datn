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
        className="w-full md:w-1/2 py-1 rounded-full cursor-pointer border-[1px] border-divideLight dark:border-divideDark text-textLight dark:text-textDark"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">
            {locationLabel?.name}
          </div>

          <div className="hidden md:block text-sm font-semibold px-6 flex-1 text-center border-x-[1px] border-divideLight dark:border-divideDark">
            {durationLabel}
          </div>

          <div className="text-sm font-semibold pl-6 pr-2 flex flex-row items-center gap-3">
            <div className="hidden md:block">{roomLabel}</div>

            <div className="p-2 rounded-full bg-backgroundLight dark:bg-backgroundDark">
              <AiOutlineSearch size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
