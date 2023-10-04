import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import { VITE_CLIENT_ID } from "./constants/env";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Box sx={{ height: "100vh" }}>
            <Outlet />
          </Box>
        </SnackbarProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
