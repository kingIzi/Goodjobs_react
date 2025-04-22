import {
  HomeIcon,
  UserCircleIcon,
BriefcaseIcon,
CurrencyDollarIcon,
BookOpenIcon,

BuildingOfficeIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ChatBubbleOvalLeftIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, Users } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import JobPost from "./pages/dashboard/JobPost";
import Transaction from "./pages/dashboard/Transaction";
import CompanyForm from "./pages/dashboard/company/CompanyForm";
import CompanyList from "./pages/dashboard/company/CompanyList";
import CV from "./pages/dashboard/CV";
import Tips from "./pages/dashboard/Tips";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "jobposts",
        path: "/jobposts",
        element: <JobPost />,
      },
      {
        icon: <ChatBubbleOvalLeftIcon {...icon} />,
        name: "tips",
        path: "/tips",
        element: <Tips />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users",
        path: "/tables",
        element: <Users />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "cv",
        path: "/cv",
        element: <CV />,
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "transaction",
        path: "/transactions",
        element: <Transaction />,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "companies",
        path: "/companies",
        element: <CompanyList />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
