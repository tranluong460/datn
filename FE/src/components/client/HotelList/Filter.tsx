const Filter = () => {
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
    </div>
  );
};

export default Filter;
