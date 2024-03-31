import {
  Service,
  Top,
  ComboPrice,
  Map,
  Between,
  Information,
} from "../../../components";
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="z-[10]">
          <Top />
        </div> */}
        <Top />
        <Service />
        <ComboPrice />
        <Between />
        <div className=" w-full">
          <Map />
        </div>
        <Information />
      </div>
    </>
  );
};

export default HomePage;