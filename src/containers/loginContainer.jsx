import Login from "../components/login";
import Register from "../components/register";

function loginContainer({currentForm,toggleForm}) {

	return (
		<div>
			{currentForm === "login" ? (
				<Login onFormSwitch={toggleForm} />
			) : (
				<Register onFormSwitch={toggleForm} />
			)}
		</div>
	);
}

export default loginContainer;
