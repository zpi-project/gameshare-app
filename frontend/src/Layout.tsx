import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { googleLogout } from "@react-oauth/google";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useSetRecoilState, useRecoilState } from "recoil";
import { isRoleFetchedState } from "@/state/isRoleFetched";
import { registerFormOpenState } from "@/state/registerForm";
import { roleState } from "@/state/role";
import { tokenState } from "@/state/token";
import Api from "@/api/Api";
import { RoleApi } from "@/api/RoleApi";
import { RegisterUserForm } from "@/components/UserForm";
import SideNav from "./components/SideNav";
import Spinner from "./components/ui/Spinner";

const Layout: FC = () => {
  const setRole = useSetRecoilState(roleState);
  const setIsRoleFetched = useSetRecoilState(isRoleFetchedState);
  const setRegisterFormOpen = useSetRecoilState(registerFormOpenState);
  const [token, setToken] = useRecoilState(tokenState);
  const { i18n } = useTranslation();

  const { refetch, isFetching } = useQuery({
    queryKey: ["role"],
    queryFn: RoleApi.getRole,
    enabled: token !== null,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: ({ name }) => {
      setRole(name);
      if (token) {
        secureLocalStorage.setItem("token", token);
      }
      setIsRoleFetched(true);
    },
    onError: error => {
      if (token) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setRegisterFormOpen(true);
          setIsRoleFetched(true);
        }
      }
    },
  });

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode<JwtPayload>(token as string);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        secureLocalStorage.removeItem("token");
        setToken(null);
        setRole("guest");
        googleLogout();
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
      config.params = {
        ...config.params,
        language: i18n.language,
      };
      return config;
    });

    return () => {
      Api.interceptors.request.eject(tokenInterceptor);
    };
  }, [token]);

  useEffect(() => {
    const tokenInterceptor = Api.interceptors.request.use(config => {
      config.params = {
        ...config.params,
        language: i18n.language,
      };
      return config;
    });

    return () => {
      Api.interceptors.request.eject(tokenInterceptor);
    };
  }, [i18n.language]);

  return (
    <div className=" flex h-screen w-screen flex-row gap-6 p-6">
      <SideNav />
      <div className="h-[calc(100vh-48px)] w-[calc(100vw-140px)]">
        <RegisterUserForm onRegisterSuccess={() => void refetch()} />
        <Outlet />
      </div>
      {isFetching && <Spinner />}
    </div>
  );
};

export default Layout;
