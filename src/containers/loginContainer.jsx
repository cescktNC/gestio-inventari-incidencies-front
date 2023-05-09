import Login from "../components/login";
import Register from "../components/register";
import { Route, Routes} from "react-router-dom";
import React from 'react';

export function LoginContainer({setIsLoggedIn}) {
	return (

		<Routes>

			<Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

			<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
			<Route path="/*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />


		</Routes>

	);
}

export default LoginContainer;
