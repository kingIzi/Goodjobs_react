import {BASE_URL} from '../data/app-constants'

export const loginUser = (form) => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("status", 'staff');
    const options = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };
    return fetch(`${BASE_URL}/api/auth/login/`,options);
    //return fetch("http://127.0.0.1:8000/api/auth/login/", options);
};

export const verifyLoginOtp = (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const options = {
    method: "POST",
    body: formData,
    redirect: "follow"
  };
  return fetch(`${BASE_URL}/api/auth/verify_login_otp/`,options);
  //return fetch("http://127.0.0.1:8000/api/auth/verify_login_otp/", options);
};


export const signup = (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const options = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };
    return fetch(`${BASE_URL}/api/auth/signup/`,options);
};

export const verifySignUp = (form) => {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const options = {
    method: "POST",
    body: formData,
    redirect: "follow"
  };
  return fetch(`${BASE_URL}/api/auth/verify_signup_otp/`,options);
};