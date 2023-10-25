import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useQuery } from "@tanstack/react-query";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useSetRecoilState, useRecoilState } from "recoil";
import { registerFormOpenState } from "@/state/registerForm";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import Api from "@/api/Api";
import { RoleApi } from "@/api/role/RoleApi";
import { RegisterUserForm } from "@/components/UserForm";
import SideNav from "./SideNav";

const Layout: FC = () => {
  const setRole = useSetRecoilState(roleState);
  const setRegisterFormOpen = useSetRecoilState(registerFormOpenState);
  const [token, setToken] = useRecoilState(tokenState);

  const { data: role } = useQuery({
    queryKey: ["role"],
    queryFn: RoleApi.getRole,
    enabled: token !== null,
    onSuccess: () => {
      setRole("user");
    },
    onError: () => {
      if (token) {
        setRole("guest");
        setRegisterFormOpen(true);
      }
    },
  });

  console.log(role);

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
