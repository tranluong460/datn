import { Container, ServiceCard } from "../..";

const serviceData = [
  {
    url: "/images/weather.png",
    title: "Weather",
    desc: "While you are writing css, you can split the code editor to make ",
  },
  {
    url: "/images/guide.png",
    title: "Guide",
    desc: "While you are writing css, you can split the code editor to make ",
  },
  {
    url: "/images/customization.png",
    title: "Customization",
    desc: "While you are writing css, you can split the code editor to make ",
  },
];

const Service = () => {
  return (
    <>
      <Container>
        <hr />
        <div className="flex md:flex-row flex-col md:p-10 p-0 items-center justify-center gap-10">
          <div className="flex flex-col">
            <h5 className="text-[2.2rem] font-medium text-[#ee6e6e] font-Island">
              Dịch vụ
            </h5>

            <h2 className="text-[2.5rem] font-medium text-textLight2nd dark:text-textDark2nd select-none">
              Chúng tôi cung cấp dịch vụ tốt nhất
            </h2>
          </div>

          <div className="flex sm:flex-row flex-col gap-5 select-none">
            {serviceData.map((item) => (
              <ServiceCard
                key={item.title}
                url={item.url}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Service;
