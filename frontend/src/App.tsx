import { FC } from "react";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light">
            <Layout />
          </ThemeProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
};

export default App;
