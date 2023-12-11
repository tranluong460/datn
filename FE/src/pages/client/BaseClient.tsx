import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  CalendarRangerModal,
  Footer,
  LoginModal,
  NavBar,
  RegisterModal,
  SearchModal,
} from "../../components";

const BaseClient = () => {
  return (
    <>
      <div className="bg-backgroundLight dark:bg-backgroundDark">
        <Toaster />
        <NavBar />
        <CalendarRangerModal />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default BaseClient;
