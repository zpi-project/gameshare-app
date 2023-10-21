import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import Api from "@/api/Api";
import SideNav from "./SideNav";

const Layout: FC = () => {
  const setRole = useSetRecoilState(roleState);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const value = secureLocalStorage.getItem("token");
    console.log("layout render + token", value);
    // get secure token,
    // based on that - get role from backend, if no, display register form
  }, []);

  useEffect(() => {
    const tokenInterceptor = Api.interceptors.request.use(config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      Api.interceptors.request.eject(tokenInterceptor);
    };
  }, [setRole, token]);

  return (
    <div className=" flex h-screen w-screen flex-row gap-6 p-6">
      <SideNav />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
