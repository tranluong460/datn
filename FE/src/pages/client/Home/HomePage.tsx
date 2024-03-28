import { Service, Top, ComboPrice, Map, Between, Information } from "../../../components";
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="z-[999]">
          <Top />
        </div>
        <Service />
        <ComboPrice />
        <Between/>
        <div className=" w-full">
          <Map />
        </div>
        <Information/>
      </div>
    </>
  );
};

export default HomePage;

{/* <div className="flex flex-col gap-10">
  <Top />
  <Service />
  <ComboPrice />
  <Map />
</div>; */}
