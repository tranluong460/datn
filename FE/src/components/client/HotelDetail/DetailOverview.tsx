import {
  BsChat,
  CiLocationOn,
  AiOutlineLock,
  LiaWalletSolid,
  MdManageHistory,
} from "../../../icons";
import { Container } from "../..";

type DetailOverviewProps = {
  name: string;
  description: string;
};

const DetailOverview = ({ name, description }: DetailOverviewProps) => {
  return (
    <>
      <Container>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-auto md:w-[70%] text-justify">
            <div className="box-border">
              <p className="text-textLight2nd dark:text-textDark2nd">
                <strong className="text-textLight dark:text-textDark pr-1">
                  {name}
                </strong>
                {description}
              </p>
            </div>
          </div>

          <div className="w-30 p-8 xl:h-64 lg:h-80 md:h-96 h-auto rounded-md bg-divideLight dark:bg-divideDark">
            <h6 className="text-uppercase text-base font-bold text-textLight dark:text-textDark">
              Vì sao nên chọn Mường Thanh?
            </h6>

            <div className="flex items-center mt-3 text-textLight2nd dark:text-textDark2nd">
              <LiaWalletSolid size={20} />
              <span className="ml-2">Giá không thể tốt hơn</span>
            </div>

            <div className="flex items-center mt-3 text-textLight2nd dark:text-textDark2nd">
              <AiOutlineLock size={20} />
              <span className="ml-2">Đặt phòng an toàn</span>
            </div>

            <div className="flex items-center mt-3 text-textLight2nd dark:text-textDark2nd">
              <MdManageHistory size={20} />
              <span className="ml-2">Quản lý đặt phòng trực tuyến</span>
            </div>

            <div className="flex items-center mt-3 text-textLight2nd dark:text-textDark2nd">
              <CiLocationOn size={20} />
              <span className="ml-2">Tiện nghi và vị trí tuyệt vời</span>
            </div>

            <div className="flex items-center mt-3 text-textLight2nd dark:text-textDark2nd">
              <BsChat size={20} />
              <span className="ml-2">Nhân viên nói tiếng Việt & Anh</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetailOverview;
