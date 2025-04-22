import {BASE_URL} from '../data/app-constants'


export const fetchCategories = async () => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    //const response = await fetch("https://goodjobs.tradingjournal.app/api/fetch_job_categories/", requestOptions);
    //const response = await fetch("http://127.0.0.1:8000/api/fetch_job_categories/", requestOptions);
    const response = await fetch(`${BASE_URL}/api/fetch_job_categories/`, requestOptions);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  