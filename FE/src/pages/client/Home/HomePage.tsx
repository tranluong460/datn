import { Attractive, Feedback, Service, Top, Trademark } from "../../../components";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-10">
        <Top />
        <Service />
        <Attractive />
        <Trademark/>
        <Feedback/>
      </div>
    </>
  );
};

export default HomePage;
