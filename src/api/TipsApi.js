import {BASE_URL} from '../data/app-constants';


export const fetchTips = async () => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    //const response = await fetch("https://goodjobs.tradingjournal.app/api/fetch_tips/", requestOptions);
    //const response = await fetch("http://127.0.0.1:8000/api/fetch_tips/", requestOptions);
    const response = await fetch(`${BASE_URL}/api/fetch_tips/`, requestOptions);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  