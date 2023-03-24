import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/styleLogin.css';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        navigate('/llistatMenu');
    }
        const handleRegisterFormSwitch = () => {
        navigate('/register');
    }

    return (
        <div className="auth-form-container">
            <h2>Inicia Sessió</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correu Electronic</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="exemple@exemple.com" id="email" name="email" />
                <label htmlFor="password">Contrasenya</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Inicia Sessió</button>
            </form>
            <button className="link-btn" onClick={handleRegisterFormSwitch}>No tens compte? Registra't aquí!</button>
        </div>
    )
}

export default Login;