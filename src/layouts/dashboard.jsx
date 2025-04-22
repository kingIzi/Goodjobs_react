import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useFetchUsers } from "@/hooks/useUsersData";
import { useFetchTransactions } from "@/hooks/useTransactionsData";
import { useFetchJobPosts } from "@/hooks/useJobPostsData";
import { useFetchCompanies } from "@/hooks/useCompaniesData";
import { useFetchSummary } from "@/hooks/useSummaryData";
import { useFetchCategories } from "@/hooks/useCategoriesData";
import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import { useAuth } from "@/features/auth/AuthenticationContext";
import { useFetchTips } from "@/hooks/useTipsData";

export function Dashboard() {
  const heheheTheColor = '#6873C2';
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const auth = useAuth()
  const userID = auth?.user?.userId
  useFetchSummary(userID)
  useFetchJobPosts(userID)
  useFetchTips()
  useFetchCompanies(userID)
  useFetchCategories(userID)
  useFetchUsers(userID)
  useFetchTransactions(userID)
  useFetchUserProfileData(userID)

  return (
    <div className="min-h-screen min-w-full flex flex-col lg:flex-row">
      <div className="lg:w-96 w-full">
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
        />
      </div>
      <div className="w-full lg:pl-0 pl-4 pr-4">
        <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
