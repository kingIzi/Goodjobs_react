import {BASE_URL} from '../data/app-constants';


export const fetchUserProfile = async (userID) => {
  const formdata = new FormData();
  formdata.append("user_id", userID);
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    //const response = await fetch("https://goodjobs.tradingjournal.app/api/fetch_user_profiles/", requestOptions);
    //const response = await fetch("http://127.0.0.1:8000/api/fetch_user_profiles/", requestOptions);
    const response = await fetch(`${BASE_URL}/api/fetch_user_profiles/`, requestOptions);
    return response.json();
  };
  