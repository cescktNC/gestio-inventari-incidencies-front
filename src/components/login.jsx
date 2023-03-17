import React, { useState } from "react";
import '../css/styleLogin.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Inicia Sessió</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correu Electronic</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Contrasenya</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" onClick={() => props.onFormSwitch('menuContainer')}>Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No tens compte? Registra't aquí.</button>
        </div>
    )
}

export default Login;