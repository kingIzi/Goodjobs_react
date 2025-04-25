import React, { useState, useEffect } from 'react';


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
  import { authorsTableData, projectsTableData } from "@/data";
import useTransactionStore from '@/store/transactionStore';
import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import { BASE_URL } from '@/data/app-constants';
const Transaction = () => {
  const transactions = useTransactionStore(state => state.transactions);
  const dataLoading = useTransactionStore(state => state.dataLoading);
  const hasError = useTransactionStore(state => state.hasError);
  const errorMessage = useTransactionStore(state => state.errorMessage);
  return (
  <div>
    { dataLoading ? <LoadingIndicator />: hasError ? <div className="text-center text-red-500">{errorMessage}</div> : <div className="my-4 flex flex-col gap-12">
    <Typography className="font-poppins text-2xl">
      All Transactions
    </Typography>
    <Card>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          {["User Name", "User Number","Amount", "Payment Number", "Provider", "Status", "Transaction Date"].map((header) => (
            <th key={header} className="border-b border-gray-200 py-3 px-5 text-left text-sm font-bold text-gray-600">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions?.map(({ user, payment_number,amount, provider, is_success, transaction_date }, index) => {
   
          return (
            <tr key={index} className="border-b border-gray-50">
              <td className="py-3 px-5 text-sm text-gray-700">{`${user?.first_name} ${user?.last_name}`}</td>
              <td className="py-3 px-5 text-sm text-gray-700">+{user?.phone_number}</td>
              <td className="py-3 px-5 text-sm text-gray-700">{amount}</td>
              <td className="py-3 px-5 text-sm text-gray-700">+{payment_number}</td>
             
              <td className="py-3 px-5 text-sm text-gray-700">{provider}</td>
              <td className="py-3 px-5 text-sm text-gray-700">{is_success ? 'Success' : 'Failed'}</td>
              <td className="py-3 px-5 text-sm text-gray-700">{new Date(transaction_date).toLocaleDateString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
      </CardBody>
    </Card>
 
  </div>
} </div>
  )
}

export default Transaction