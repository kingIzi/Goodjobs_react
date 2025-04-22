import React from "react";
import {
  Typography,

} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,


} from "@/data";
import {  ChartBarIcon,UserIcon, UserGroupIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import useSummaryStore from "@/store/homeSummaryStore";
import LoadingIndicator from "@/widgets/loading/LoadingIndicator";
// import { formattedPrice } from "@/utils/price/priceFormatter";

export function Home() {
  const summary = useSummaryStore(state => state.summary);
const dataLoading = useSummaryStore(state => state.dataLoading);
const hasError = useSummaryStore(state => state.hasError);
const errorMessage = useSummaryStore(state => state.errorMessage);
const transformedData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Week's Money",
    value: summary?.week_money,
    footer: {
      color: summary?.week_money_percentage?.includes('-') ? 'text-red-500' : 'text-green-500',
      value: summary?.week_money_percentage?.split(' ')[0],
      label: summary?.week_money_percentage?.split(' ').slice(1).join(' ')
    },
  },
  {
    color: "gray",
    icon: UserIcon,
    title: "Today's Users",
    value: summary?.todays_users?.toString(),
    footer: {
      color: summary?.todays_users_percentage?.includes('-') ? 'text-red-500' : 'text-green-500',
      value: summary?.todays_users_percentage?.split(' ')[0],
      label: summary?.todays_users_percentage?.split(' ').slice(1).join(' ')
    },
  },
  {
    color: "gray",
    icon: UserGroupIcon,
    title: "Total Users",
    value: summary?.total_users?.toString(),
    footer: {
      color: summary?.total_users_percentage?.includes('-') ? 'text-red-500' : 'text-green-500',
      value: summary?.total_users_percentage?.split(' ')[0],
      label: summary?.total_users_percentage?.split(' ').slice(1).join(' ')
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total Sales",
    value:  summary?.this_month_sales,
    footer: {
      color: summary?.this_month_sales_percentage?.includes('-') ? 'text-red-500' : 'text-green-500',
      value: summary?.this_month_sales_percentage?.split(' ')[0],
      label: summary?.this_month_sales_percentage?.split(' ').slice(1).join(' ')
    },
  },
];
  return (
    
    <div className="my-4">
    { dataLoading ? <LoadingIndicator />: hasError ? <div className="text-center text-red-500">{errorMessage}</div> :
    <div className="flex flex-col space-y-4">
        <Typography className="font-poppins text-2xl">
          Dashboard
        </Typography>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {transformedData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          ))}
        </div>
      </div>
    }
    </div>
  ); 
}

export default Home;
