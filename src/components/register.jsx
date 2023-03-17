import React, { useState } from "react";
import '../css/styleLogin.css';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [cognoms, setCognoms] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Registra't</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nom" />
            <label htmlFor="cognoms">Cognoms</label>
            <input value={cognoms} name="cognoms" onChange={(e) => setCognoms(e.target.value)} id="cognoms" placeholder="Cognoms" />
            <label htmlFor="email">Correu Electronic</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Contrasenya</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Registra't</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Tens un compte? Inicia sessió aquí!</button>
    </div>
    )
}

export default Register;