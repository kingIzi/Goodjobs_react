import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import React, { useState, useEffect } from 'react';
import useUserStore from "@/store/userStore";
import Spinner from "@material-tailwind/react";
import LoadingIndicator from "@/widgets/loading/LoadingIndicator";

export function Users() {
  const users = useUserStore(state => state.users);
  const dataLoading = useUserStore(state => state.dataLoading);
  const hasError = useUserStore(state => state.hasError);
  const errorMessage = useUserStore(state => state.errorMessage);

  return (

<div>
{ dataLoading ? <LoadingIndicator />: hasError ? <div className="text-center text-red-500">{errorMessage}</div> :
    <div className="my-8 flex flex-col gap-12">
    <Typography className="font-poppins text-2xl">
      All users
    </Typography>
     <Card>
      
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr className="text-left">
          {["Name", "Email", "Phone Number", "Date Joined"].map((header) => (
            <th key={header} className="border-b border-gray-200 py-3 px-5 text-sm font-bold text-gray-600">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users?.map(({ first_name, last_name, email, user_image, phone_number, date_joined }, index) => (
          <tr key={index} className="border-b border-gray-50">
            <td className="py-3 px-5 flex items-center gap-4">
              <img src={user_image || "https://images.rawpixel.com/image_450/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTExMV8xLWtsaGhqdDhxLmpwZw.jpg"} alt={`${first_name} ${last_name}`} className="w-10 h-10 rounded-full object-cover" />
              <span className="text-sm text-gray-700">{`${first_name} ${last_name}`}</span>
            </td>
            <td className="py-3 px-5 text-sm text-gray-700">{email}</td>
            <td className="py-3 px-5 text-sm text-gray-700">{phone_number || 'N/A'}</td>
            <td className="py-3 px-5 text-sm text-gray-700">{new Date(date_joined).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
        </CardBody>
      </Card>
</div>
 } </div>
        
  );
}

export default Users;
