import { FC } from "react";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@components/ThemeProvider";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_AUTH_CLIENT_ID}>
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
