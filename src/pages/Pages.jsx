// import Menu from "./Menu";
import {React, useState} from 'react';
import Login from '../containers/loginContainer';

function Pages() {
  const [currentForm, setCurrentForm] = useState("login");

	const toggleForm = formName => {
		setCurrentForm(formName);
	};

  return (
    <div>
      <Login toggleForm={toggleForm} currentForm={currentForm}/>
        {/* <Menu /> */}
    </div>
  );
}

export default Pages;