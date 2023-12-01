type FilterDialogProps = {
  isShowRate: boolean;
  isShowDialog: boolean;
  onShowRate: () => void;
  onShowDialog: () => void;
};

const FilterDialog = ({
  isShowRate,
  isShowDialog,
  onShowRate,
  onShowDialog,
}: FilterDialogProps) => {
  if (!isShowDialog) {
    return null;
  }

  return (
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-neutral-800/70 bg-opacity-25"></div>

      <div className="fixed inset-0 z-40 flex">
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-dark py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-textLight dark:text-textDark">
              Lọc
            </h2>
            <div
              onClick={onShowDialog}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-textLight dark:text-textDark hover:text-primary dark:hover:text-primary cursor-pointer"
            >
              <span className="sr-only">Đóng lọc</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <form className="mt-4 border-t border-divideLight dark:border-divideDark">
            <h3 className="sr-only">Danh sách</h3>
            <ul
              role="list"
              className="px-2 py-3 font-medium text-textLight2nd dark:text-textDark2nd"
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

            <div className="border-t border-divideLight dark:border-divideDark px-4 py-6">
              <h3 className="-my-3 flow-root">
                <div
                  onClick={onShowRate}
                  className="flex w-full items-center justify-between bg-backgroundLight dark:bg-backgroundDark px-2 py-3 text-textLight dark:text-textDark cursor-pointer"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterDialog;
