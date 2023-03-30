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
					window.localStorage.setItem('usuariId',json.usuariId);
					window.localStorage.setItem('carrec',json.carrec);
					navigate("/llistatMenu");
				});
		}
	});

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(email);
		setClicked(true);

	};
	function handleRegisterFormSwitch() {
		// navigate("/register");
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
				<label htmlFor="password">Contrasenya</label>
				<input
					value={pass}
					onChange={e => setPass(e.target.value)}
					type="password"
					placeholder="********"
					id="password"
					name="password"
				/>
				<button type="submit">Inicia Sessió</button>
			</form>
			<button className="link-btn" onClick={handleRegisterFormSwitch}>
				No tens compte? Registra't aquí!
			</button>
		</div>
	);
}

export default Login;
