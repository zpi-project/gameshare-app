import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useSetRecoilState, useRecoilState } from "recoil";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import Api from "@/api/Api";
import SideNav from "./SideNav";
import RegisterUserForm from "./UserForm/RegisterUserForm";

const Layout: FC = () => {
  const setRole = useSetRecoilState(roleState);
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode<JwtPayload>(token as string);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        secureLocalStorage.removeItem("token");
        setToken(null);
      } else {
        setToken(token as string);
      }
    }
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
  }, [token]);

  useEffect(() => {
    if (token) {
      setRole("user");
    } else {
      setRole("guest");
    }
  }, [token]);

  return (
    <div className=" flex h-screen w-screen flex-row gap-6 p-6">
      <SideNav />
      <div className="flex-grow">
        <RegisterUserForm />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
