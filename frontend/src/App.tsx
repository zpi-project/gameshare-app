import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { roleState } from "@state/role";
import { tokenState } from "@state/token";
import Api from "@api/Api";
import { ThemeProvider } from "@components/ThemeProvider";
import Layout from "@components/Layout";

const queryClient = new QueryClient();

const App: FC = () => {
  const setRole = useSetRecoilState(roleState);
  const token = useRecoilValue(tokenState);

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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
            <Layout />
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
