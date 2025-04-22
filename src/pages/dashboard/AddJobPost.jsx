import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-tailwindcss-select';
import { Input, Button } from '@material-tailwind/react';
import useCompaniesStore from '@/store/companiesStore';
import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import useCategoriesStore from '@/store/categoriesStore';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submissionData = {
      company_id: selectedCompany.value,
      location,
      job_title: jobTitle,
      job_type: jobType,
      salary_min: salaryMin,
      salary_max: salaryMax,
      job_post_url: jobPostUrl,
      job_description: jobDescription,
      deadline, // Include deadline in submission data
      category_id: selectedCategory.value
    };
    console.log(`Submitting ${JSON.stringify(submissionData)}`);

    //const response = await fetch("https://goodjobs.tradingjournal.app/api/add_job_post/", {
    const response = await fetch("http://127.0.0.1:8000/api/add_job_post/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    const result = await response.json();
    navigate('/');
    setIsJobAdded(true);
  };

  const companiesOption = companies.map((company) => {
    console.log("company", company);
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

  return (
    <div>
      {companiesLoading ? (
        <LoadingIndicator />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            value={selectedCompany}
            onChange={handleCompanyChange}
            options={companiesOption}
            searchInputPlaceholder='Search Companies'
            isSearchable={true}
            placeholder='Select Company'
          />
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categoriesOption}
            searchInputPlaceholder='Search Category'
            isSearchable={true}
            placeholder='Select Category'
          />
          <Input type="text" color="blue" label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          <Input type="text" color="blue" label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input type="text" color="blue" label="Job Type" value={jobType} onChange={(e) => setJobType(e.target.value)} />
          <Input type="number" color="blue" label="Minimum Salary" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
          <Input type="number" color="blue" label="Maximum Salary" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
          <Input type="url" color="blue" label="Job Post URL" value={jobPostUrl} onChange={(e) => setJobPostUrl(e.target.value)} />
          <Input type="date" color="blue" label="Deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} /> {/* New input for deadline */}
          <ReactQuill theme="snow" value={jobDescription} onChange={setJobDescription} />
          <Button type="submit" color="blue" ripple="light">
            Submit Job Post
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddJobPostForm;
