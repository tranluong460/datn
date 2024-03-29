import { Route, Routes } from "react-router-dom";

import {
  AmenitiesManager,
  BaseAdmin,
  BookingManager,
  DashboardManage,
  HotelManager,
  Page404,
  RoomManager,
  RoomTypeManage,
  UserManager,
} from "..";
import CommentManage from "./Comment/CommentManage";

const RouteAdmin = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseAdmin />}>
          <Route index element={<DashboardManage />} />
          <Route path="/amenities-manager" element={<AmenitiesManager />} />
          <Route path="/booking-manager" element={<BookingManager />} />
          <Route path="/hotel-manager" element={<HotelManager />} />
          <Route path="/room-manager" element={<RoomManager />} />
          <Route path="/user-manager" element={<UserManager />} />
          <Route path="/roomType-manager" element={<RoomTypeManage />} />
          <Route path="/comment-manager" element={<CommentManage />} />
        </Route>

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default RouteAdmin;
