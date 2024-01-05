import { useState } from "react";
import { IUser } from "../../../interface";

type InfoUserProps = {
  user: IUser;
};

const InfoUser = ({ user }: InfoUserProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div
      className="mt-5 overflow-hidden bg-light dark:bg-dark p-6 rounded-md shadow-md"
      key={user._id}
    >
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-light dark:bg-dark p-4 rounded-md shadow-md overflow-hidden flex justify-between align-center">
          <div>
            <dt className="mt-1 font-bold text-sm text-textLight2nd dark:text-textDark2nd">
              Email
            </dt>

            <dd className="text-sm font-medium text-textLight dark:text-textDark">
              {user.email ? user.email : "không có thông tin"}
            </dd>
          </div>
        </div>

        <div className="bg-light dark:bg-dark p-4 rounded-md shadow-md overflow-hidden flex justify-between align-center">
          <div>
            <dt className="mt-1 font-bold text-sm text-textLight2nd dark:text-textDark2nd">
              Địa chỉ
            </dt>
            {isEditing ? (
              <input
                className="outline pl-2 py-1 mt-2 rounded-md"
                placeholder="nhập thông tin địa chỉ"
                type="text"
                value={user.id_information.address}
                onChange={(e) => {
                  //
                }}
              />
            ) : (
              <dd className="text-sm font-medium text-textLight dark:text-textDark">
                {user.id_information.address
                  ? user.id_information.address
                  : "không có thông tin"}
              </dd>
            )}
          </div>
        </div>

        <div className="bg-light dark:bg-dark p-4 rounded-md shadow-md overflow-hidden flex justify-between align-center">
          <div>
            <dt className="mt-1 font-bold text-sm text-textLight2nd dark:text-textDark2nd">
              phone
            </dt>
            {isEditing ? (
              // Trong trường hợp đang chỉnh sửa, hiển thị input để người dùng nhập dữ liệu mới.
              <input
                className="outline pl-2 py-1 mt-2 rounded-md "
                placeholder="nhập số điện thoại"
                type="text"
                value={user.id_information.address}
                onChange={(e) => {
                  /* Xử lý thay đổi giá trị input */
                }}
              />
            ) : (
              // Trong trường hợp xem thông tin, hiển thị giá trị thông tin của người dùng.
              <dd className="text-sm font-medium text-textLight dark:text-textDark">
                {user.id_information.phone
                  ? user.id_information.phone
                  : "không có thông tin"}
              </dd>
            )}
          </div>
        </div>

        <div className="bg-light dark:bg-dark p-4 rounded-md shadow-md overflow-hidden flex justify-between align-center">
          <div>
            <dt className="mt-1 font-bold text-sm text-textLight2nd dark:text-textDark2nd">
              Tên
            </dt>
            {isEditing ? (
              <input
                className="outline pl-2 py-1 mt-2 rounded-md "
                placeholder="Mời nhập tên"
                type="text"
                value={user.id_information.name}
                onChange={(e) => {
                  //
                }}
              />
            ) : (
              <dd className="text-sm font-medium text-textLight dark:text-textDark">
                {user.id_information.name
                  ? user.id_information.name
                  : "không có thông tin"}
              </dd>
            )}
          </div>
        </div>
      </dl>

      <div className="absolute top-11 right-11">
        {isEditing ? (
          <button
            className="mt-1 mr-2 bg-blue-500 py-2 px-4 text-white rounded-sm"
            onClick={handleSaveClick}
          >
            Lưu
          </button>
        ) : (
          <button
            className="mt-1 mr-2 bg-blue-500 py-2 px-4 text-white rounded-sm "
            onClick={handleEditClick}
          >
            Cập nhật thông tin
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoUser;
