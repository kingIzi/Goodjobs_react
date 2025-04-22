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
import AddJobPostForm from './AddJobPost';
import useJobPostStore from '@/store/jobPostStore';
import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
const JobPost = () => {

  const jobPosts = useJobPostStore(state => state.jobPosts);
  const dataLoading = useJobPostStore(state => state.dataLoading);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const navigate = useNavigate();

    const toggleDeleteModal = (postId) => {
      setPostToDelete(postId);
      setIsDeleteModalOpen(!isDeleteModalOpen);
    };
  
    const handleDelete = async () => {
      if (!postToDelete) return;
      
      try {
        const formdata = new FormData();
formdata.append("job_id", postToDelete);

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};
        const response = await fetch(`http://127.0.0.1:8000/api/delete_job_post/`, requestOptions);
        
        if (response.ok) {
          navigate('/');

        } else {
          console.error('Failed to delete the job post');
        }
      } catch (error) {
        console.error('Error deleting the job post:', error);
      }
    };
  
  
  return (
    <>
    
    <Dialog open={isModalOpen} handler={toggleModal} >
  <DialogHeader>
    Add JobPost
  </DialogHeader>
  <DialogBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
    <AddJobPostForm closeModalAddCompany={isModalOpen} afterSubmit={toggleModal}  />
  </DialogBody>
</Dialog>
   <Dialog open={isDeleteModalOpen} handler={() => toggleDeleteModal(null)}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this job post?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => toggleDeleteModal(null)}>
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>

  
{dataLoading ? <LoadingIndicator />:  <div className="my-4 flex flex-col gap-12">
      <Typography className="font-poppins text-2xl">
                Available Job Posts
      </Typography>
      <Card>
     
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
      <div className="flex justify-end items-start">
  <button onClick={() => setIsModalOpen(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
    Add JobPost
  </button>
</div>
      <table className="w-full min-w-[540px] table-auto">
      <thead>
        <tr>
          {["Company", "Job Title", "Location", "Posted Date","Deadline", "Details"].map((header) => (
            <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
              {/* Assuming Typography is a component you have for text styling */}
              <div className="text-[11px] font-bold uppercase text-blue-gray-400">
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {jobPosts?.map(({ jobID,img, name, job, date,deadline }, key) => (
          <tr key={key}>
            <td className="py-3 px-5">
              <div className="flex items-center gap-4">
                {/* Assuming Avatar is a component you have for rendering images */}
                <img src={img} alt={name} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="font-semibold text-blue-gray">{name}</div>
                </div>
              </div>
            </td>
            <td className="py-3 px-5">
              <div className="text-xs font-semibold text-blue-gray-600">{job[0]}</div>
            </td>
            <td className="py-3 px-5">
              <div className="text-xs font-normal text-blue-gray-500">{job[1]}</div>
            </td>
            <td className="py-3 px-5">
              <div className="text-xs font-semibold text-blue-gray-600">{date}</div>
            </td>
            <td className="py-3 px-5">
              <div className="text-xs font-semibold text-blue-gray-600">{deadline}</div>
            </td>
            <td className="py-3 px-5">
                        <button onClick={() => toggleDeleteModal(jobID)} className="text-xs font-semibold text-red-600">Delete</button>
                      </td>
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

export default JobPost