// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['userToken', 'userId', 'userName','phoneNumber']);
    const user = {'userId': cookies.userId, 'userToken': cookies.userToken, 'username': cookies.username,'email': cookies.email}
    const isAuthenticated = cookies.userId !== undefined;


    const login = (userData) => {
      //console.log(`userData`, userData)
      setCookie('userToken', userData.token, { path: '/' });
      setCookie('userId', userData.user_id, { path: '/' });
      setCookie('userName', userData.first_name, { path: '/' });
      setCookie('phoneNumber', userData.phone_number, { path: '/' });

    };
  
    const logout = () => {

      removeCookie('userToken', { path: '/' });
      removeCookie('userId', { path: '/' });
      removeCookie('userName', { path: '/' });
      removeCookie('phoneNumber', { path: '/' });
    };


  
    return (
      <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };