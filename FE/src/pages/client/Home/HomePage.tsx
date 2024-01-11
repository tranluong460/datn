import {  Service, Top, ComboPrice,  } from "../../../components";
// Attractive,
// Preferential 
// News
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
      
        <Top />
        <Service />
        <ComboPrice />
        {/* <Preferential/> */}
        {/* <Attractive /> */}
        {/* <News/> */}
      </div>
    </>
  );
};

export default HomePage;

