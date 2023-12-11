type FilterProps = {
  isShowRate: boolean;
  onShowRate: () => void;
};

const Filter = ({ isShowRate, onShowRate }: FilterProps) => {
  return (
    <div className="hidden lg:block bg-light dark:bg-dark p-3 rounded-md">
      <h3 className="sr-only">Danh sách</h3>
      <ul
        role="list"
        className="border-b border-divideLight dark:border-divideDark pb-1 text-sm font-medium text-textLight2nd dark:text-textDark2nd"
      >
        <li className="hover:bg-backgroundLight dark:hover:bg-backgroundDark cursor-pointer">
          <span className="block px-2 py-3">Totes</span>
        </li>
        <li className="hover:bg-backgroundLight dark:hover:bg-backgroundDark cursor-pointer">
          <span className="block px-2 py-3">Backpacks</span>
        </li>
        <li className="hover:bg-backgroundLight dark:hover:bg-backgroundDark cursor-pointer">
          <span className="block px-2 py-3">Travel Bags</span>
        </li>
        <li className="hover:bg-backgroundLight dark:hover:bg-backgroundDark cursor-pointer">
          <span className="block px-2 py-3">Hip Bags</span>
        </li>
        <li className="hover:bg-backgroundLight dark:hover:bg-backgroundDark cursor-pointer">
          <span className="block px-2 py-3">Laptop Sleeves</span>
        </li>
      </ul>

      <div className="border-b border-divideLight dark:border-divideDark py-6">
        <h3 className="-my-3 flow-root">
          <div
            onClick={onShowRate}
            className="flex w-full items-center justify-between bg-backgroundLight dark:bg-backgroundDark px-2 py-3 text-sm text-textLight dark:text-textDark cursor-pointer"
          >
            <span className="font-medium text-textLight2nd dark:text-textDark2nd">
              Đánh giá
            </span>
            <span className="ml-6 flex items-center">
              {isShowRate ? (
                <svg
                  className="h-5 w-5 text-textLight2nd dark:text-textDark2nd"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-textLight2nd dark:text-textDark2nd"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              )}
            </span>
          </div>
        </h3>
        {isShowRate && (
          <div className="pt-6">
            <div className="space-y-1">
              <div className="cursor-pointer flex items-center hover:bg-backgroundLight dark:hover:bg-backgroundDark rounded-md">
                <span className="min-w-0 flex-1 text-textLight2nd dark:text-textDark2nd p-2">
                  1 sao
                </span>
              </div>
              <div className="cursor-pointer flex items-center hover:bg-backgroundLight dark:hover:bg-backgroundDark rounded-md">
                <span className="min-w-0 flex-1 text-textLight2nd dark:text-textDark2nd p-2">
                  2 sao
                </span>
              </div>
              <div className="cursor-pointer flex items-center hover:bg-backgroundLight dark:hover:bg-backgroundDark rounded-md">
                <span className="min-w-0 flex-1 text-textLight2nd dark:text-textDark2nd p-2">
                  3 sao
                </span>
              </div>
              <div className="cursor-pointer flex items-center hover:bg-backgroundLight dark:hover:bg-backgroundDark rounded-md">
                <span className="min-w-0 flex-1 text-textLight2nd dark:text-textDark2nd p-2">
                  4 sao
                </span>
              </div>
              <div className="cursor-pointer flex items-center hover:bg-backgroundLight dark:hover:bg-backgroundDark rounded-md">
                <span className="min-w-0 flex-1 text-textLight2nd dark:text-textDark2nd p-2">
                  5 sao
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
