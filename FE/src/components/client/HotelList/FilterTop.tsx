import { useState } from "react";
import { AiOutlineColumnHeight } from "react-icons/ai";
type FilterTopProps = {
  onShowDialog: () => void;
};

const FilterTop = ({ onShowDialog }: FilterTopProps) => {
  const [show, setShow] = useState(false);

  const onToggle = () => {
    setShow(!show);
  };

  return (
    <div className="flex items-center justify-between border-b border-divideLight dark:border-divideDark p-2 bg-light dark:bg-dark rounded-md">
      <div className="flex items-center">
        <div className="relative inline-block text-left">
          <span
            className="group inline-flex justify-center text-sm font-medium text-textLight dark:text-textDark items-center gap-1 mr-2"
            id="menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <AiOutlineColumnHeight />
            Sắp xếp:
          </span>

          <select name="" id="" className="border border-black">
            <option value="1">Giá tăng dần</option>
            <option value="2">Giá giảm dần</option>
          </select>
        </div>

        <button
          onClick={onShowDialog}
          className="-m-2 ml-4 p-2 text-textLight dark:text-textDark hover:text-primary dark:hover:text-primary sm:ml-6 lg:hidden"
        >
          <span className="sr-only">Lọc</span>

          <svg
            className="h-5 w-5"
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterTop;
