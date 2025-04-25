import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-tailwindcss-select';
import { Input, Button } from '@material-tailwind/react';
import useCompaniesStore from '@/store/companiesStore';
import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import useCategoriesStore from '@/store/categoriesStore';
import { BASE_URL } from '@/data/app-constants';
import { Controller, useForm } from "react-hook-form";
import { InputFormField,ReactQuillField } from './company/CompanyForm';
import { catchError, delay, finalize, map, of, switchMap, tap } from 'rxjs';
import { Toaster, toast } from 'sonner';


export const SelectInput = React.forwardRef(({ options,label,error, value = "", onChange, ...props }, ref) => {
  const selectedOption = options?.find(option => option.value === value) || null;
  return (
    <div className="flex flex-col w-full">
      <Select
        searchInputPlaceholder={label}
        isSearchable={true}
        placeholder={label} 
        options={options}
        value={selectedOption}
        onChange={(selectedOption) => {
          onChange?.(selectedOption?.value);
        }}
        ref={ref}
        {...props}
      />
      <p className={`text-red-500 text-xs h-4 mt-1 !font-poppins duration-500 ${error?.message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>{error && error?.message}</p>
    </div>
  );
});


const AddJobPostForm = () => {
  const [selectedCompany, setSelectedCompany] = useState({'value': '', 'label': 'Select Company', 'disabled': false});
  const [selectedCategory, setSelectedCategory] = useState({'value': '', 'label': 'Select Category', 'disabled': false});
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [jobPostUrl, setJobPostUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [deadline, setDeadline] = useState(''); // New state for deadline
  const [isLoading, setIsLoading] = useState(false);
  const [isJobAdded, setIsJobAdded] = useState(false);
  const navigate = useNavigate();
  const categories = useCategoriesStore(state => state.categories);
  const companies = useCompaniesStore(state => state.companies);
  const companiesLoading = useCompaniesStore(state => state.dataLoading);
  const [companiesSearchTerm, setSearchTerm] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const submissionData = {
  //     company_id: selectedCompany.value,
  //     location,
  //     job_title: jobTitle,
  //     job_type: jobType,
  //     salary_min: salaryMin,
  //     salary_max: salaryMax,
  //     job_post_url: jobPostUrl,
  //     job_description: jobDescription,
  //     deadline, // Include deadline in submission data
  //     category_id: selectedCategory.value
  //   };
  //   console.log(`Submitting ${JSON.stringify(submissionData)}`);

  //   //const response = await fetch("https://goodjobs.tradingjournal.app/api/add_job_post/", {
  //   const response = await fetch(`${BASE_URL}/api/add_job_post/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(submissionData),
  //   });

  //   const result = await response.json();
  //   navigate('/');
  //   setIsJobAdded(true);
  // };
  const { control,handleSubmit,formState: { errors } } = useForm();

  const companiesOption = companies.map((company) => {
    let label = company.name;
    let value = company.id.toString();

    switch (company.name) {
      case 'National Microfinance Bank':
        label = `🏦 ${company.name}`;
        break;
      case 'Some Other Company':
        label = `🏢 ${company.name}`;
        break;
      default:
        label = `🏛 ${company.name}`;
    }

    return { value, label };
  });

  const handleCompanyChange = value => {
    setSelectedCompany(value);
  };

  const categoriesOption = categories.map((category) => {
    let label = category.name;
    let value = category.id.toString();
    return { value, label };
  });

  const handleCategoryChange = value => {
    setSelectedCategory(value);
  };

  const onSubmit = (form) => {
    of(form).pipe(
      tap((form) => setIsLoading(true)),
      map((form) => ({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })),
      switchMap((formData) => fetch(`${BASE_URL}/api/add_job_post/`,formData)),
      switchMap((res) => res.json()),
      catchError((err) => {
        toast.error(
          'An error occurred on the server. Please contact support or try again.',
          {
            duration: 8000
          }
        );
        throw err;
      })
    ).subscribe({
      next: (value) => window.location.reload()
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller 
        name='company_id'
        defaultValue=''
        control={control}
        rules={{ required: "Please select the company"}}
        render={({ field,fieldState }) => <SelectInput options={companiesOption} label='Select Company' {...field} error={fieldState.error} />}
      />
      <Controller 
        name='category_id'
        defaultValue=''
        control={control}
        rules={{ required: "Please select the category"}}
        render={({ field,fieldState }) => <SelectInput options={categoriesOption} label='Select Category' {...field} error={fieldState.error} />}
      />
      <Controller 
        name='job_title'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide the job title"}} 
        render={({ field,fieldState }) => <InputFormField label="Enter Job title" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='location'
        defaultValue=''
        control={control}
        rules={{ required: "Please enter a job location"}} 
        render={({ field,fieldState }) => <InputFormField label="Enter Job location" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='job_type'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide the job type"}} 
        render={({ field,fieldState }) => <InputFormField label="Enter Job type" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='salary_min'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide entry salary"}} 
        render={({ field,fieldState }) => <InputFormField type="number" label="Salary min" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='salary_max'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide a maximum salary"}} 
        render={({ field,fieldState }) => <InputFormField type="number" label="Salary max" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='job_post_url'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide the job application url"}} 
        render={({ field,fieldState }) => <InputFormField type="url" label="https://" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='deadline'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide a deadline"}} 
        render={({ field,fieldState }) => <InputFormField type="date" label="Deadline" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='job_description'
        defaultValue=''
        control={control}
        rules={{ required: "Please provide a the job description"}} 
        render={({ field,fieldState }) => <ReactQuillField {...field} error={fieldState.error} />} 
      />
       <Button loading={isLoading} disabled={Object.keys(errors).length > 0 || isLoading} className="font-poppins bg-[#071460] hover:bg-[#180463]" type="submit" fullWidth>
          Add Job Post
      </Button>
      <div className="absolute top-0">
         <Toaster position="top-left" richColors />
      </div>
    </form>
  );
};

export default AddJobPostForm;
