import { Route, Routes, Navigate } from "react-router-dom";
// import { Menu } from './Menu';
import { useEffect, useState } from 'react';
import { LoginContainer } from "../containers/loginContainer";


function Pages() {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  
  useEffect(() =>{
    setIsLoggedIn(window.localStorage.getItem('token'));
  }, [])

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Navigate to={`/home/user/show/${window.localStorage.getItem('id')}`} />} />
          <Route path="/home/*" element={<Menu />} />
        </>
      ) : (
        <Route path="/" element={<Navigate to="/auth/login" />} />
      )}
      <Route path="/auth/*" element={<LoginContainer />} />
    </Routes>
  );
}

export default Pages;