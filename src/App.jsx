import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SignIn, SignUp } from "./pages/auth";
import { useAuth,AuthProvider } from "./features/auth/AuthenticationContext";
import { useRoutes } from "react-router-dom";
import { VerifyOtpCode } from "./pages/auth/verify-otp-code";
import { ThemeProvider } from "@material-tailwind/react";



const AppWrapper = () => {
  const auth = useAuth();
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/dashboard/home/" /> },
    { path: "/dashboard/*", element: auth.isAuthenticated ?  <Dashboard  /> : <Navigate to="/signin" /> },
    { path: "/signin", element:  <SignIn />  },
    { path: '/otp', element: <VerifyOtpCode /> }
    // {path: '/signin', element: <SignUp />}
    // ...
  ]);
  return routes;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      {/* <AuthProvider>
        <AppWrapper />
      </AuthProvider>       */}
      <AuthProvider>
        <ThemeProvider>
          <AppWrapper />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
