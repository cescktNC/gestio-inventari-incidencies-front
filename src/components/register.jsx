import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../css/styleLogin.css';

function Register() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [cognoms, setCognoms] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        navigate('/llistatMenu');
    }
    const handleLoginFormSwitch = () => {
        navigate('/login');
    }

    return (
        <div className="auth-form-container">
            <h2>Registra't</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Nom</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Nom" pattern="^[a-zA-ZÀ-ÿ\s]+$" required/>
                {!name && <p className="error-message">El nom es obligatori</p>}
                <label htmlFor="cognoms">Cognoms</label>
                <input value={cognoms} name="cognoms" onChange={(e) => setCognoms(e.target.value)} id="cognoms" placeholder="Cognoms" required/>
                {!cognoms && <p className="error-message">Els cognoms son obligatoris</p>}
                <label htmlFor="email">Correu Electronic</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"/>
                {!email && <p className="error-message">El correu electronic es obligatori</p>}
                <label htmlFor="password">Contrasenya</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$" required/>
                {!pass && <p className="error-message">La contrasenya es obligatoria</p>}
                <button type="submit">Registra't</button>
            </form>
            <button className="link-btn" onClick={handleLoginFormSwitch}>Tens un compte? Inicia sessió aquí!</button>
        </div>
    )
}

export default Register;
