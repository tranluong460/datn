import { useNavigate } from "react-router-dom";

import { MdPayment } from "react-icons/md";
import { AiOutlineUserAdd, AiOutlineLock } from "react-icons/ai";

import { MenuItem, Avatar } from "..";
import { useInfoAccountQuery } from "../../api";

const Sidebar = () => {
  const { data } = useInfoAccountQuery("");

  const navigate = useNavigate();
  return (
    <>
      <div className="hidden md:block">
        <div className="border rounded-xl overflow-hidden border-divideLight dark:border-divideDark bg-light dark:bg-dark min-w-[250px]">
          <div className="flex py-4 items-center gap-3 font-bold border-b border-gray-300 pl-2 dark:border-white">
            <Avatar key={1} imageUser={data?.data?.id_information?.image} />
            <span className="dark:text-white">
              {data?.data?.id_information?.name}
            </span>
          </div>

          <MenuItem
            label="Thông tin cá nhân"
            onClick={() => navigate("/auth")}
            icon={AiOutlineUserAdd}
          />
          <MenuItem
            label="Mật khẩu"
            onClick={() => navigate("/auth/security")}
            icon={AiOutlineLock}
          />
          <MenuItem
            label="Đặt phòng"
            onClick={() => navigate("/auth/booking")}
            icon={MdPayment}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
