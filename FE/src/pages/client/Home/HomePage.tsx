import { Service, Top, ComboPrice } from "../../../components";
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <Top />
        <Service />
        <ComboPrice />
      </div>
    </>
  );
};

export default HomePage;
