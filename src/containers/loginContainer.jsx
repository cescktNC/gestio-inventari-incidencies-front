import Login from "../components/login";
import Register from "../components/register";
import { Route, Routes} from "react-router-dom";

export function LoginContainer() {

	return (

		<Routes>

			<Route path="/login" element={<Login />} />

			<Route path="/register" element={<Register />} />

		</Routes>

	);
}

export default LoginContainer;
