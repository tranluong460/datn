import { Service, Top, ComboPrice } from "../../../components";
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="z-[999]">
          <Top />
        </div>
        <Service />
        <ComboPrice />
      </div>
    </>
  );
};

export default HomePage;
