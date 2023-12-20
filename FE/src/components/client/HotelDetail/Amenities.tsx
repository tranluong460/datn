import {
  AiFillCar,
  AiFillCalendar,
  AiFillLock,
  AiFillHeart,
  AiFillHome,
} from "react-icons/ai";

type Amenities = {
  _id: string;
  name: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Featuress = {
  name: string;
  surcharge: boolean;
};

const Amenities = ({ amenities }: { amenities: Amenities[] }) => {
  const iconsMap: Record<string, JSX.Element> = {
    "Phòng tắm": <AiFillHome />,
    "Chỗ đậu xe": <AiFillCar />,
    "An ninh": <AiFillLock />,
    "Dịch vụ doanh nhân": <AiFillCalendar />,
    "Chăm sóc sức khỏe": <AiFillHeart />,
  };
  const Icon = (icon: string) => iconsMap[icon] || null;

  const sortedAmenities = amenities.slice().sort((a, b) => {
    console.log(a, b);
    return b.features.length - a.features.length;
  });

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-10 font-[Lato]">
      <h1 className="font-bold text-[24px] mb-8">Các dịch vụ/tiện ích khác</h1>

      <div className="flex">
        {sortedAmenities.map((data: Amenities) => (
          <div
            key={data._id}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4 ${
              data.features.length <= 2 ? "md:w-full" : ""
            }`}
          >
            <div className="item">
              <div className="inline-block">
                <div className="flex items-center gap-1">
                  {Icon(data.name)}
                  <span>{data.name}</span>
                </div>
                <ul className="translate-x-5">
                  {data.features.map(
                    (ani: string | Featuress, index: number) => (
                      <li key={index} className="flex gap-2">
                        <li className="list-disc">
                          {typeof ani === "string" ? ani : ani.name}
                        </li>
                        {typeof ani !== "string" && ani.surcharge ? (
                          <span className="bg-gray-300 py-1 px-1 mb-1 text-[11.25px]">
                            Phụ phí
                          </span>
                        ) : (
                          ""
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
