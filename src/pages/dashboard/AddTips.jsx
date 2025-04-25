import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-tailwindcss-select';
import { Input,Button } from '@material-tailwind/react';
import useCompaniesStore from '@/store/companiesStore';
import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import useCategoriesStore from '@/store/categoriesStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '@/data/app-constants';


const AddTipsForm = () => {




  const [tipTitle, setTipTitle] = useState('');

  const [tipsType, setTipsType] = useState('');


  const [tipsDescription, setTipsDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [tipImage, setTipImage] = useState(null);

  const navigate = useNavigate();




  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    


    const formData = new FormData();

    formData.append("tip_title", tipTitle);
    formData.append("tips_type", 'content');
    formData.append("writing_content", tipsDescription);
      formData.append("tip_image", tipImage);
      const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
      };
  
    //const response = await fetch("https://goodjobs.tradingjournal.app/api/add_tip/",requestOptions);
    //const response = await fetch("http://127.0.0.1:8000/api/add_tip/",requestOptions);
    const response = await fetch(`${BASE_URL}/api/add_tip/`,requestOptions);
    

    const result = await response.json();

    if (result.status === 'success') {
      setIsLoading(false);
      toast('Tip Added Successfully', {
        type: 'success',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setIsLoading(false);
    navigate('/');
    }else{
      setIsLoading(false);
      toast('Error Adding Tip', {
        type: 'error',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    // Handle submission result here, e.g., showing a success message or handling errors
  };


  const handleImageChange = (e) => {
    setTipImage(e.target.files[0]);
  };

  return (
    <div>
     
        <form onSubmit={handleSubmit} className="space-y-4">
         


          <Input type="text" color="blue" label="Tip Title" value={tipTitle} onChange={(e) => setTipTitle(e.target.value)} />


          <ReactQuill theme="snow" value={tipsDescription} onChange={setTipsDescription} />
          <input 
        type="file" 
        onChange={handleImageChange} 
        className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"/>
         {isLoading  === true ? 
        <LoadingIndicator /> :   <Button type="submit" color="blue" ripple="light">
            Submit Tips
          </Button>}
        </form>
      
    </div>
  );
};

export default AddTipsForm;
