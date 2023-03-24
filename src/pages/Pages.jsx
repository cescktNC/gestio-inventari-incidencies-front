import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu } from './Menu';
import { LoginContainer } from "../containers/loginContainer";

function Pages() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginContainer currentForm={'login'} />}/>
      <Route path="/register" element={<LoginContainer currentForm='register'/>}/>
      <Route path="/llistatMenu" element={<Menu/>}/>
    </Routes>
    </Router>
  );
}

export default Pages;