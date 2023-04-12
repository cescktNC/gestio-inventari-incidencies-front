import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../css/styleLogin.css';

function Register() {

    const [name, setName] = useState('');
    const [cognoms, setCognoms] = useState('');
    const [dni, setDNI] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm_password, setconfirm_password] = useState('');


    const [comprobacioName, setcomprobacioName]=useState(false);
    const [comprobacioCognoms, setcomprobacioCognoms]=useState(false);
    const [comprobacioDNI, setcomprobacioDNI]=useState(false);
    const [comprobacioEmail, setcomprobacioEmail]=useState(false);
    const [ComprobacioPass, setComprobacioPass]=useState(false);
    const [comprobacioConfirm_pass, setcomprobacioConfirm_pass]=useState(false);

    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
		if (clicked) {
			fetch("http://localhost:5000/autenticacions/registerAPI", {
				method: "POST",
				body: JSON.stringify({ nom: name, cognoms: cognoms, dni:dni, email:email, password: pass, confirm_password: confirm_password }),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(response => response.json())
				.then(json => {
					window.localStorage.setItem("id", json.user._id);
					window.localStorage.setItem("carrec", json.user.carrec);
					navigate("/home/user/show");
				});
		}
	});

    const handleSubmit = (e) => {
        e.preventDefault();

		if (comprobacioName && comprobacioCognoms && comprobacioDNI && 
            comprobacioEmail && ComprobacioPass && comprobacioConfirm_pass) setClicked(true);
		else setClicked(false);
    }
    const handleLoginFormSwitch = () => {
        navigate('/auth/login');
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Registra't</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <InputName name={name} setName={setName} setcomprobacioName={setcomprobacioName} />
                    <p className="error-message" id="errorName"></p>

                    <InputCognoms cognoms={cognoms} setCognoms={setCognoms} setcomprobacioCognoms={setcomprobacioCognoms} />
                    <p className="error-message" id="errorCognoms"></p>

                    <InputDNI dni={dni} setDNI={setDNI} setcomprobacioDNI={setcomprobacioDNI} />
                    <p className="error-message" id="errorDNI"></p>

                    <InputEmail email={email} setEmail={setEmail} setcomprobacioEmail={setcomprobacioEmail} />
                    <p className="error-message" id="errorEmail"></p>

                    <InputPassword pass={pass} setPass={setPass} setComprobacioPass={setComprobacioPass} />
                    <p className="error-message" id="errorPassword"></p>
                    
                    <InputConfPassword 
                        pass={pass} 
                        confirm_password={confirm_password} 
                        setconfirm_password={setconfirm_password} 
                        setcomprobacioConfirm_pass={setcomprobacioConfirm_pass} 
                    />
                    <p className="error-message" id="errorConfPass"></p>
                    <button type="submit">Registra't</button>
                </form>
                <button className="link-btn" onClick={handleLoginFormSwitch}>Tens un compte? Inicia sessió aquí!</button>
            </div>
        </div>
    )
}

function InputName({name, setName, setcomprobacioName}){
    return(
        <>
            <label htmlFor="name">Nom</label>
            <input 
                value={name} 
                name="name" 
                onChange={(e) => setName(e.target.value)} 
                onBlur={(e) => ComprobacioName(e.target.value, {setcomprobacioName})}
                id="name" 
                placeholder="Nom" 
                pattern="^[a-zA-ZÀ-ÿ\s]+$" 
                required
            />
        </>
    )
}

function InputCognoms({cognoms, setCognoms, setcomprobacioCognoms}){
    return(
        <>
            <label htmlFor="cognoms">Cognoms</label>
            <input 
                value={cognoms} 
                name="cognoms" 
                onChange={(e) => setCognoms(e.target.value)} 
                onBlur={(e) => ComprobacioCognoms(e.target.value, {setcomprobacioCognoms})}
                id="cognoms" 
                placeholder="Cognoms" 
                required
            />
        </>
    )
}

function InputDNI({dni, setDNI, setcomprobacioDNI}){
    return(
        <>
            <label htmlFor="dni">DNI</label>
            <input 
                value={dni} 
                name="dni" 
                onChange={(e) => setDNI(e.target.value)} 
                onBlur={(e) => ComprobacioDNI(e.target.value, {setcomprobacioDNI})}
                id="dni" 
                placeholder="11111111S" 
                required
            />
        </>
    )
}

function InputEmail({email, setEmail, setcomprobacioEmail}){
    return(
        <>
            <label htmlFor="email">Correu Electronic</label>
            <input 
                value={email} 
                name="email" 
                onChange={(e) => setEmail(e.target.value)} 
                onBlur={(e) => ComprobacioEmail(e.target.value, {setcomprobacioEmail})}
                id="email" 
                type="email" 
                placeholder="youremail@gmail.com"
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                required
            />
        </>
    )
}

function InputPassword({pass, setPass, setComprobacioPass}){
    return(
        <>
            <label htmlFor="password">Contrasenya</label>
            <input 
                value={pass} 
                name="password" 
                onChange={(e) => setPass(e.target.value)} 
                onBlur={(e) => ComprobacioPassword(e.target.value, {setComprobacioPass})}
                id="password" 
                type="password" 
                placeholder="********"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$"
                required
            />
        </>
    )
}

function InputConfPassword({pass, confirm_password, setconfirm_password, setcomprobacioConfirm_pass}){
    return(
        <>
            <label htmlFor="password">Confirma Contrasenya</label>
            <input 
            value={confirm_password} 
            onChange={(e) => setconfirm_password(e.target.value)} 
            onBlur={(e) => ComprobacioConfPassword(e.target.value, {pass, setcomprobacioConfirm_pass})}
            type="password" placeholder="********" id="password" name="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$" required/>
        </>
    )
}

//Validació

function ComprobacioName(name, {setcomprobacioName}){
    let pattName = /[0-9!@#$%^&*()_\-+={}[\]|:;"'<>,.?/`~¡¿]/g;
    let errorName = document.getElementById('errorName');
    errorName.innerText='';

    if(name === ''){
        errorName.innerText='El camp Nom es obligatori';
        return setcomprobacioName(false);
    }

    if(pattName.test(name)) {
        errorName.innerText='El nom no pot contenir numeros o caracteres especials';
        setcomprobacioName(false);
    }
    else setcomprobacioName(true);
}

function ComprobacioCognoms(cognoms,{setcomprobacioCognoms}){
    let pattCognoms=/[0-9!@#$%^&*()_\-+={}[\]|:;"'<>,.?/`~¡¿]/g;
    let errorCognoms = document.getElementById('errorCognoms');
    errorCognoms.innerText='';

    if(cognoms === ''){
        errorCognoms.innerText='El camp Cognoms es obligatori';
        return setcomprobacioCognoms(false);
    }

    if(pattCognoms.test(cognoms)){
        errorCognoms.innerText='Els cognoms no poden contenir numeros o caracteres especials';
        setcomprobacioCognoms(false);
    }
    else   setcomprobacioCognoms(true);
}

function ComprobacioDNI(dni,{setcomprobacioDNI}){
    let pattDNI = /^[\d]{8}[a-z]{1}$/i;
    let errorDNI = document.getElementById('errorDNI');
    errorDNI.innerText='';

    let letters = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];

    let dniModificat = dni.replaceAll(' ', ''); 
    let lletra = dniModificat.substring(dniModificat.length - 1); 

    dniModificat = dniModificat.substring(0, dniModificat.length - 1);
    let index = dniModificat % 23;


    if(dni === ''){
        errorDNI.innerText='El camp DNI es obigatori';
        return setcomprobacioDNI(false);
    }

    if(!pattDNI.test(dni)){
        errorDNI.innerText='Format incorrecte';
        return setcomprobacioDNI(false);  
    }

    if (letters[index] === lletra) setcomprobacioDNI(true);
    else setcomprobacioDNI(true);
}

function ComprobacioEmail(email,{setcomprobacioEmail}) {
	let pattEmail = /^[\w_.+-]+@[\w-]+\.[\w-.]+$/i;
	let errorEmail = document.getElementById("errorEmail");
	errorEmail.innerText = "";

	if (email === "") {
		errorEmail.innerText = "El camp correu electronic es obigatori";
		return setcomprobacioEmail(false);
	}

	if (pattEmail.test(email)) setcomprobacioEmail(true);
	else {
		errorEmail.innerText = "Format incorrecte";
		setcomprobacioEmail(false);
	}
}

function ComprobacioPassword(pass, {setComprobacioPass}) {
	let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
	let errorPass = document.getElementById("errorPassword");
	errorPass.innerText = "";

	if (pass === "") {
		errorPass.innerText = "El camp contrasenya es obligatori";
		return setComprobacioPass(false);
	}

	if (pattPassword.test(pass)) setComprobacioPass(true);
	else {
		errorPass.innerText = "Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
            setComprobacioPass(false);
	}
}

function ComprobacioConfPassword(confirm_password, {pass, setcomprobacioConfirm_pass}){
    let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
	let errorConfPass = document.getElementById("errorConfPass");
	errorConfPass.innerText = "";

	if (confirm_password === "") {
		errorConfPass.innerText = "El camp confirma contrasenya es obligatori";
		return setcomprobacioConfirm_pass(false);
	}

    if(pass !== confirm_password){
        errorConfPass.innerText = "Les contrasenyas no coincideixen";
		return setcomprobacioConfirm_pass(false);
    }

	if (pattPassword.test(confirm_password)) setcomprobacioConfirm_pass(true);
	else {
		errorConfPass.innerText = "Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
            setcomprobacioConfirm_pass(false);
	}
}

export default Register;
