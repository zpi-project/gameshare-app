import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { Role } from "@/types/Role";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const role = useRecoilValue(roleState);

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  return <Navigate to={URLS.DASHBOARD} />;
};

export default ProtectedRoute;
