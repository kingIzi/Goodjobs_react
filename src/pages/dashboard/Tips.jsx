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
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  
    IconButton,
    Spinner
  } from "@material-tailwind/react";
  import { authorsTableData, projectsTableData } from "@/data";


import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import useTipsStore from '@/store/TipsStore';
import AddTipsForm from './AddTips';

const Tips = () => {

  const tips = useTipsStore(state => state.tips);

  const dataLoading = useTipsStore(state => state.dataLoading);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

  
  return (
    <>
    
    <Dialog open={isModalOpen} handler={toggleModal} >
  <DialogHeader>
    Add Tips
  </DialogHeader>
  <DialogBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
    <AddTipsForm closeModalAddCompany={isModalOpen} afterSubmit={toggleModal}  />
  </DialogBody>
</Dialog>
  
{dataLoading ? <LoadingIndicator />:  <div className="my-4 flex flex-col gap-12">

      <Typography className="font-poppins text-2xl">
        Tips
      </Typography>
      <Card>
     
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <div className="flex justify-end items-start">
  <button onClick={() => setIsModalOpen(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
    Add Tips
  </button>
</div>
<table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {["Image", "Title", "Date", "Content Type", ].map((header) => (
              <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <div className="text-[11px] font-bold uppercase text-blue-gray-400">
                  {header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tips?.map(({ id, image, title, date, content }, key) => (
            <tr key={key}>
              <td className="py-3 px-5">
                <img src={image} alt={title} className="w-12 h-12 rounded-full" />
              </td>
              <td className="py-3 px-5 text-xs font-semibold text-blue-gray-600">{title}</td>
              <td className="py-3 px-5 text-xs font-semibold text-blue-gray-600">{date}</td>
              <td className="py-3 px-5 text-xs font-normal text-blue-gray-500">{content.type}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

      </CardBody>
    </Card>

  </div>}
</>
  )
}

export default Tips