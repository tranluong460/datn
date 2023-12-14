type TrademarkCardProps = {
  title: string;
  image: string;
};

const TrademarkCard = ({ title, image }: TrademarkCardProps) => {
  return (
    <>
      <div className=" text-xl font-thin border-x-[1px]">
        <p className="select-none mt-6 mb-16 dark:text-white "> {title}</p>
        <div className="w-full transition-transform transform duration-300 hover:translate-y-6">
          <button>
            <img
              src={image}
              alt=""
              className="w-full h-auto rounded-[10px] border-[1px]"
            />
          </button>
        </div>
      </div>
    </>
  );
};
export default TrademarkCard;
