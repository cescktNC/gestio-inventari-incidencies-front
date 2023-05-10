import { Route, Routes, Navigate } from "react-router-dom";
import { Menu } from './Menu';
import { useState, React, useEffect } from 'react';
import { LoginContainer } from "../containers/loginContainer";
import { guardarCarrec } from "../js/comprobacioCarrecs";

function Pages() {
  const [isLoggedIn, setIsLoggedIn] = useState('');

  useEffect(() => {

    if(window.localStorage.getItem('token')) {
      setIsLoggedIn(window.localStorage.getItem('token'));
      guardarCarrec();
    }
  }, [])

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/home/*" element={<Menu setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/*" element={<Navigate to={`/home/user/show/${window.localStorage.getItem('id')}`} />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<LoginContainer setIsLoggedIn={setIsLoggedIn} />} />
        </>
      )}

    </Routes>

  );
}

export default Pages;