import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/styleLogin.css";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [comprobacioEmail, setcomprobacioEmail] = useState(false);
	const [ComprobacioPass, setComprobacioPass] = useState(false);
	const [userData, setUserData] = useState({ id: '', carrec: '', token: '' });
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		setMessage('');
		setErrors([]);
		setUserData({ id: '', carrec: '', token: '' });
		ComprobacioEmail(email, {setcomprobacioEmail});
		ComprobacioPassword(pass, {setComprobacioPass})

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
				if(json.message !== undefined) {
					setMessage(json.message);
				}
				if(json.errors !== undefined) setErrors(json.errors);

				if (json.id !== undefined) {
					setUserData({
						id: json.id,
						carrec: json.carrec,
						token: json.token
					});
				}
				
			});
		}

	}

	useEffect(() => {
		if (message === "" && errors.length === 0 && userData.id !== '') {
			window.localStorage.setItem("id", userData.id);
			window.localStorage.setItem("carrec", userData.carrec);
			window.localStorage.setItem("token", userData.token);
			navigate("/home/user/show/" + userData.id);
		}
	}, [message, errors, userData]);

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

					<InputEmail  setEmail={setEmail} setcomprobacioEmail={setcomprobacioEmail} />
					<p id="errorEmail" className="error-message"></p>

					<InputPassword setPass={setPass} setComprobacioPass={setComprobacioPass} />
					<p id="errorPassword" className="error-message"></p>
					<button type="submit" className="buttonLR">Inicia Sessió</button>
				</form>
				<button className="link-btn buttonLR" onClick={handleRegisterFormSwitch}>
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


function DivArrayErrors({errors}){
	return(
		<ul className="alert alert-danger list-unstyled">
			{errors.map((error, index) => <li key={index}>{error}</li>)}
		</ul>
	)
}

function InputEmail({ setEmail, setcomprobacioEmail }) {

	return (
		<>
			<label htmlFor="email">Correu Electronic</label>
			<input
				onChange={(e) => {
					setEmail(e.target.value)
					ComprobacioEmail(e.target.value, {setcomprobacioEmail})
				}}
				onBlur={(e) => ComprobacioEmail(e.target.value, {setcomprobacioEmail})}
				type="email"
				placeholder="exemple@exemple.com"
				id="email"
				name="email"
			/>
		</>
	);
}

function InputPassword({ setPass, setComprobacioPass }) {

	return (
		<>
			<label htmlFor="password">Contrasenya</label>
			<input
				onChange={(e) => {
					setPass(e.target.value)
					ComprobacioPassword(e.target.value, {setComprobacioPass})
				}}
				onBlur={(e) => ComprobacioPassword(e.target.value, {setComprobacioPass})}
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
