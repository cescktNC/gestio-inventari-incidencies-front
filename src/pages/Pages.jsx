import { Route, Routes, Navigate } from "react-router-dom";
import { Menu } from './Menu';
import { LoginContainer } from "../containers/loginContainer";

function Pages() {
  let isLoggedIn = window.localStorage.getItem('id');

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Navigate to="/home/user/show" />} />
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