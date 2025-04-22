import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Week's Money",
    value: "2,000 Tsh",
    footer: {
      color: "text-green-500",
      value: "100%",
      label: "than last week",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Today's Users",
    value: "3",
    footer: {
      color: "text-green-500",
      value: "+50%",
      label: "than last yesterday",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total Users",
    value: "122",
    footer: {
      color: "text-red-500",
      value: "3%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total Sales",
    value: "8,000 Tsh",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
