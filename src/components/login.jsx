import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/styleLogin.css";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [comprobacioEmail, setcomprobacioEmail] = useState(false);
	const [ComprobacioPass, setComprobacioPass] = useState(false);
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (comprobacioEmail && ComprobacioPass) {
			fetch("http://localhost:5000/autenticacions/loginAPI", {
				method: "POST",
				body: JSON.stringify({ email: email, password: pass }),
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => response.json())
			.then((json) => {
				if(json.message !== undefined) setMessage(json.message);
				if(json.errors !== undefined) setErrors(json.errors);
				if(message === '' && errors.length === 0){
					window.localStorage.setItem("id", json.id);
					window.localStorage.setItem("carrec", json.carrec);
					window.localStorage.setItem("token", json.token);
					navigate("/home/user/show");
				}	
			});

			//p&3Y55CSxma6
		}
	}

	function handleRegisterFormSwitch() {
		navigate("/auth/register");
	}

	return (
		<div className="App">
			<div className="auth-form-container">
				<h2>Inicia Sessió</h2>
				<form className="login-form" onSubmit={handleSubmit}>
					{(errors.length !== 0 && (<DivArrayErrors errors={errors} />) )}
					{(message !== '' && (<DivMessage message={message}  />) )}
					<InputEmail email={email} setEmail={setEmail} setcomprobacioEmail={setcomprobacioEmail} />
					<p id="errorEmail" className="error-message"></p>

					<InputPassword pass={pass} setPass={setPass} setComprobacioPass={setComprobacioPass} />
					<p id="errorPassword" className="error-message"></p>
					<button type="submit">Inicia Sessió</button>
				</form>
				<button className="link-btn" onClick={handleRegisterFormSwitch}>
					No tens compte? Registra't aquí!
				</button>
			</div>
		</div>
	);
}

function DivMessage({message}){
	return(
		<div className="alert alert-danger">
			<p className="text-danger">{message}</p>
		</div>
	)
}
//{errors}
function DivArrayErrors({errors}){
	return(
		<ul className="alert alert-danger list-unstyled">
			{errors.map((error, index) => <li key={index}>{error}</li>)}
		</ul>
	)
}

function InputEmail({email, setEmail, setcomprobacioEmail}) {

	return (
		<>
			<label htmlFor="email">Correu Electronic</label>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				onBlur={(e) => ComprobacioEmail(e.target.value, {setcomprobacioEmail})}
				type="email"
				placeholder="exemple@exemple.com"
				id="email"
				name="email"
			/>
		</>
	);
}

function InputPassword({pass, setPass,setComprobacioPass}) {

	return (
		<>
			<label htmlFor="password">Contrasenya</label>
			<input
				value={pass}
				onChange={(e) => setPass(e.target.value)}
				onBlur={(e) => ComprobacioPassword(pass, {setComprobacioPass})}
				type="password"
				placeholder="********"
				pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$'
				id="password"
				name="password"
			/>
		</>
	);
}

//Validació

function ComprobacioEmail(email, {setcomprobacioEmail}) {
	let pattEmail = /^[\w_.+-]+@[\w-]+\.[\w-.]+$/i;
	let errorEmail = document.getElementById("errorEmail");
	errorEmail.innerText = "";

	if (email === "") {
		errorEmail.innerText = "El camp Correu Electronic es obigatori";
		setcomprobacioEmail(false);
		return;
	}

	if (pattEmail.test(email)) setcomprobacioEmail(true) ;
	else {
		errorEmail.innerText = "Format incorrecte";
		setcomprobacioEmail(false) ;
	}
}

function ComprobacioPassword(pass,{setComprobacioPass}) {
	let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
	let errorPass = document.getElementById("errorPassword");
	errorPass.innerText = "";

	if (pass === "") {
		errorPass.innerText = "El camp Contrasenya es obligatori";
		setComprobacioPass(false);
		return;
	}

	if (pattPassword.test(pass)) setComprobacioPass(true);
	else {
		errorPass.innerText =
		"Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
		setComprobacioPass(false);
	}
}

export default Login;
