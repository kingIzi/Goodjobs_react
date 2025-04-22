import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

function CompanyForm({closeModalAddCompany}) {
  const [name, setName] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [companyImage, setCompanyImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("about_company", aboutCompany);
    if (companyImage) {
      formData.append("company_image", companyImage);
    }

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };

    //fetch("https://goodjobs.tradingjournal.app/api/add_job_company/", requestOptions)
    fetch("http://127.0.0.1:8000/api/add_job_company/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      navigate('/dashboard/home/');
      // setIsLoading(false)

  };

  const handleImageChange = (e) => {
    setCompanyImage(e.target.files[0]);
  };

  return (
    <>
     {isLoading === true ? 
        <LoadingIndicator />
       :   <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded text-black" // Updated for black text
      />
      <ReactQuill style={{color: 'black'}} theme="snow" value={aboutCompany} onChange={setAboutCompany} />
      <input 
        type="file" 
        onChange={handleImageChange} 
        className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"/>
      <div className="flex justify-end"> {/* This div wraps the button to align it to the right */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </div>
    </form>}
    </>
  
  );
}

export default CompanyForm;
