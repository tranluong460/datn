import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Loading } from "../pages";
import { useLoginModal } from "../hooks";
import { useInfoAccountQuery } from "../api";

export const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const loginModal = useLoginModal();
  const { data, isSuccess, isFetching, isLoading } = useInfoAccountQuery("");

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (isSuccess || data) && allowedRoles.includes(data?.data?.role) ? (
    <Outlet />
  ) : isSuccess && data ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <>
      {setTimeout(() => {
        loginModal.onOpen();
      }, 100)}
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};
