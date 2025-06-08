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
import { VerifySignUpOtpCode } from './pages/auth/verify-sign-up-otp'



const AppWrapper = () => {
  const auth = useAuth();
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/dashboard/home/" /> },
    { path: "/dashboard/*", element: auth.isAuthenticated ?  <Dashboard  /> : <Navigate to="/signin" /> },
    { path: "/signin", element:  <SignIn />  },
    { path: '/otp', element: <VerifyOtpCode /> },
    {path: '/signup', element: <SignUp />},
    {path: '/signup-verify', element: <VerifySignUpOtpCode />}
    // ...
  ]);
  return routes;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <AuthProvider>
        <ThemeProvider>
          <AppWrapper />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
