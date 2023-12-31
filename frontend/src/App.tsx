import { FC } from "react";
import Layout from "@/Layout";
import { ThemeProvider } from "@/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import "@/i18n/i18n";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storageKey="vite-ui-theme">
            <Layout />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
};

export default App;
