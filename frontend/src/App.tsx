import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Box sx={{ height: "100vh" }}>
          <Outlet />
        </Box>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
