import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isRoleFetchedState } from "@/state/isRoleFetched";
import { roleState } from "@/state/role";
import { URLS } from "@/constants/urls";
import { RoleType } from "@/types/Role";

interface ProtectedRouteProps {
  allowedRoles: RoleType[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const role = useRecoilValue(roleState);
  const isRoleFetched = useRecoilValue(isRoleFetchedState);

  if (!isRoleFetched) {
    return <></>;
  }

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  return <Navigate to={URLS.DASHBOARD} />;
};

export default ProtectedRoute;
