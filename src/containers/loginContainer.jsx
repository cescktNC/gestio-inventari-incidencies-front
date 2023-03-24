import Login from "../components/login";
import Register from "../components/register";

export function LoginContainer({currentForm}) {

	return (
		<div>
			{currentForm === "login" ? (
				<Login />
			) : (
				<Register />
			)}
		</div>
	);
}
