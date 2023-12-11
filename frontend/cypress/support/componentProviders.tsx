import { FC, ReactNode } from "react";
import { ThemeProvider } from "@/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import "@/i18n/i18n";
import { queryClient } from "./queryClient";

interface Props {
  children: ReactNode;
}

const ComponentProviders: FC<Props> = ({ children }) => {
  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={""}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Toaster removeAllOnUnmount />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
};

export default ComponentProviders;
