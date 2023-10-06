import { FC } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { VITE_CLIENT_ID } from "./constants/env";
import { ThemeProvider } from "@components/ThemeProvider";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark">
          <div className="h-full w-full">
            <Outlet />
          </div>
          </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
