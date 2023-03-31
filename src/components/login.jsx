import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/styleLogin.css";

function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [clicked, setClicked] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (clicked) {
			fetch("http://localhost:5000/autenticacions/loginAPI", {
				method: "POST",
				body: JSON.stringify({ email: email, password: pass }),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(response => response.json())
				.then(json => {
					window.localStorage.setItem("usuariId", json.usuariId);
					window.localStorage.setItem("carrec", json.carrec);
					navigate("/llistatMenu");
				});
		}
	});

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(email);
		let comprobacioEmail = ComprobacioEmail(email);
		let ComprobacioPass = ComprobacioPassword(pass);
		if (comprobacioEmail && ComprobacioPass) setClicked(true);
		else setClicked(false);
	};
	function handleRegisterFormSwitch() {
		navigate("/register");
	}

	return (
		<div className="auth-form-container">
			<h2>Inicia Sessió</h2>
			<form className="login-form" onSubmit={handleSubmit}>
				<label htmlFor="email">Correu Electronic</label>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					type="email"
					placeholder="exemple@exemple.com"
					id="email"
					name="email"
				/>
				<p id="errorEmail" className="error-message"></p>
				<label htmlFor="password">Contrasenya</label>
				<input
					value={pass}
					onChange={e => setPass(e.target.value)}
					type="password"
					placeholder="********"
					id="password"
					name="password"
				/>
				<p id="errorPassword" className="error-message"></p>
				<button type="submit">Inicia Sessió</button>
			</form>
			<button className="link-btn" onClick={handleRegisterFormSwitch}>
				No tens compte? Registra't aquí!
			</button>
		</div>
	);
}

function ComprobacioEmail(email) {
	let pattEmail = /^[\w_.+-]+@[\w-]+\.[\w-.]+$/i;
	let errorEmail = document.getElementById("errorEmail");
	errorEmail.innerText = "";

	if (email === "") {
		errorEmail.innerText = "El camp email es obigatori";
		return false;
	}

	if (pattEmail.test(email)) return true;
	else {
		errorEmail.innerText = "Format incorrecte";
		return false;
	}
}

function ComprobacioPassword(pass) {
	let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
	let errorPass = document.getElementById("errorPassword");
	errorPass.innerText = "";

	if (pass === "") {
		errorPass.innerText = "El camp password es obligatori";
		return false;
	}

	if (pattPassword.test(pass)) return true;
	else {
		errorPass.innerText =
			"Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
		return false;
	}
}

export default Login;
