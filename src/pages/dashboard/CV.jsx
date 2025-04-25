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

import Spinner from "@material-tailwind/react";
import useUserProfileStore from "@/store/userProfileStore";
import LoadingIndicator from "@/widgets/loading/LoadingIndicator";

export function CV() {
  const cvs = useUserProfileStore(state => state.userProfiles);
  const dataLoading = useUserProfileStore(state => state.dataLoading);
  const hasError = useUserProfileStore(state => state.hasError);
  const errorMessage = useUserProfileStore(state => state.errorMessage);
  return (
    <div>
    { dataLoading ? <LoadingIndicator />: hasError ? <div className="text-center text-red-500">{errorMessage}</div> :
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {cvs.map(({ user, preferred_categories, cv }, index) => (
        <div key={index} className="card bg-white shadow-lg rounded-lg p-6 mb-4">
          <div className="flex gap-4 items-center">
            <img src={user.user_image || "https://via.placeholder.com/150"} alt={`${user.first_name} ${user.last_name}`} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h2 className="text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
              <p>{user.phone_number}</p>
              <a href={cv} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white py-2 px-4 rounded mt-2">View CV</a>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Categories:</h3>
            <ul className="list-disc pl-5">
              {preferred_categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
}
</div>
);
} 

export default CV;
