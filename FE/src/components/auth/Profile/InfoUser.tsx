import { IUser } from "../../../interface";
import { SecurityPage } from "../../../pages";

type InfoUserProps = {
  user: IUser;
};

const InfoUser = ({ user }: InfoUserProps) => {
  return (
    <div className="mt-5 overflow-hidden bg-light dark:bg-dark p-6 rounded-md shadow-md">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Object.entries({
          Tên: user.id_information.name,
          Email: user.email,
          "Số điện thoại": user.id_information.phone,
          "Địa chỉ": user.id_information.address,
          "Ngày sinh": "",
          "Giới tính": "",
        }).map(([title, content], index) => (
          <div
            key={index}
            className="bg-light dark:bg-dark p-4 rounded-md shadow-md overflow-hidden"
          >
            <dt className="text-sm font-medium text-textLight dark:text-textDark">
              {title}:
            </dt>
            <dd className="mt-1 text-sm text-textLight2nd dark:text-textDark2nd">
              {content ? content : "Không có thông tin"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default InfoUser;
