import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioName, ComprobacioCognoms, ComprobacioDNI, 
    ComprobacioEmail, ComprobacioPassword, ComprobacioConfPassword} from "../js/comprobacioCampsFormulariUser";

import '../css/styleLogin.css';

function Register() {

    const [user, setUser] = useState({
        nom: '',
        cognoms: '',
        dni: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const [comprobacio, setComprobacio] = useState({
        comprobacioName: false,
        comprobacioCognoms: false,
        comprobacioDNI: false,
        comprobacioEmail: false,
        comprobacioPass: false,
        comprobacioConfirmPass: false
    });

    
    const [errors, setErrors] = useState({
        errorName: '',
        errorCognoms: '',
        errorDNI: '',
        errorEmail:'',
        errorPass: '',
        errorConfPass:''
    });


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nom, cognoms, dni, email, password, confirm_password } = {...user};

        ComprobacioName(nom, {handleComprobacio, handleErrors});
        ComprobacioCognoms(cognoms, {handleComprobacio, handleErrors});
        ComprobacioDNI(dni, {handleComprobacio, handleErrors});
        ComprobacioEmail(email, {handleComprobacio, handleErrors});
        ComprobacioPassword(password, {handleComprobacio, handleErrors});
        ComprobacioConfPassword(confirm_password, {handleComprobacio, handleErrors});

		if (!Object.values(comprobacio).includes(false)) {
                fetch("http://localhost:5000/autenticacions/registerAPI", {
				method: "POST",
				body: JSON.stringify({ nom: nom, cognoms: cognoms, dni: dni, email: email, password: password, confirm_password: confirm_password }),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(response => response.json())
				.then(json => {
                    console.log(json)
                    if(json.error !== undefined) setErrorBack(json.error);

                    if(json.errors !== undefined) setErrorsBack(json.errors);
    
                    if (json.user._id !== undefined) {
                        window.localStorage.setItem("token", json.token);
                        window.localStorage.setItem("id", json.user._id);
                        window.localStorage.setItem("carrec", json.user.carrec);
                        navigate(`/home/user/show/${json.user._id}`);
                    }

				});
            }
    }

    const handleChange = input => {
		setUser({ ...user, [input.name]: input.value });
	};

    const handleComprobacio = (camp, valor) => {
        setComprobacio({
        ...comprobacio,
        [camp]: valor
        });
    };

    const handleErrors = (camp, valor) => {
        setErrors({
        ...errors,
        [camp]: valor
        });
    };

    const handleLoginFormSwitch = () => {
        navigate('/auth/login');
    }

    return (
        <div className="App">
            <div className="auth-form-container">
                <h2>Registra't</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                    {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

                    <InputName name={user.nom} handleChange={handleChange} handleComprobacio={handleComprobacio} handleErrors={handleErrors} />
                    {errors.errorName && (<pre className="error-message">{errors.errorName}</pre>)}

                    <InputCognoms cognoms={user.cognoms} handleChange={handleChange} handleComprobacio={handleComprobacio} handleErrors={handleErrors} />
                    {errors.errorCognoms && (<pre className="error-message">{errors.errorCognoms}</pre>)}

                    <InputDNI dni={user.dni} handleChange={handleChange} handleComprobacio={handleComprobacio} handleErrors={handleErrors} />
                    {errors.errorDNI && (<pre className="error-message" >{errors.errorDNI}</pre>)}

                    <InputEmail email={user.email} handleChange={handleChange} handleComprobacio={handleComprobacio} handleErrors={handleErrors} />
                    {errors.errorEmail && (<pre className="error-message">{errors.errorEmail}</pre>)}

                    <InputPassword pass={user.password} handleChange={handleChange} handleComprobacio={handleComprobacio} handleErrors={handleErrors} />
                    {errors.errorPass && (<pre className="error-message" >{errors.errorPass}</pre>)}
                    
                    <InputConfPassword 
                        userPass={user.password} 
                        confirm_password={user.confirm_password} 
                        handleChange={handleChange} 
                        handleComprobacio={handleComprobacio} 
                        handleErrors={handleErrors} 
                    />
                    {errors.errorConfPass && (<pre className="error-message" >{errors.errorConfPass}</pre>)}

                    <button type="submit" className="buttonLR">Registra't</button>
                </form>
                <button className="link-btn buttonLR" onClick={handleLoginFormSwitch}>Tens un compte? Inicia sessió aquí!</button>
            </div>
        </div>
    )
}

function DivMessage({message}){
    return(
        <div className="alert alert-danger">
            <p className="text-danger">{message}</p>
        </div>
    )
}

function DivArrayErrors({errors}){
    console.log(errors)
    return(
        <ul className="alert alert-danger list-unstyled">
            {errors.map((error, index) => <li key={index}>{error.msg}</li>)}
        </ul>
    )
}



function InputName({name, handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label htmlFor="nom">Nom</label>
            <input 
                value={name} 
                name="nom" 
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
                id="name" 
                placeholder="Nom" 
                pattern="^[a-zA-ZÀ-ÿ\s]+$" 
                required
            />
        </>
    )
}

function InputCognoms({cognoms, handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label htmlFor="cognoms">Cognoms</label>
            <input 
                value={cognoms} 
                name="cognoms" 
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioCognoms(e.target.value, {handleComprobacio, handleErrors})}
                id="cognoms" 
                placeholder="Cognoms" 
                required
            />
        </>
    )
}

function InputDNI({dni, handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label htmlFor="dni">DNI</label>
            <input 
                value={dni} 
                name="dni" 
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioDNI(e.target.value, {handleComprobacio, handleErrors})}
                id="dni" 
                placeholder="11111111S" 
                required
            />
        </>
    )
}

function InputEmail({email, handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label htmlFor="email">Correu Electronic</label>
            <input 
                value={email} 
                name="email" 
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioEmail(e.target.value, {handleComprobacio, handleErrors})}
                id="email" 
                type="email" 
                placeholder="youremail@gmail.com"
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                required
            />
        </>
    )
}

function InputPassword({pass,  handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label htmlFor="password">Contrasenya</label>
            <input 
                value={pass} 
                name="password" 
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioPassword(e.target.value, {handleComprobacio, handleErrors})}
                id="password" 
                type="password" 
                placeholder="********"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$"
                required
            />
        </>
    )
}

function InputConfPassword({userPass, confirm_password, handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label htmlFor="password">Confirma Contrasenya</label>
            <input 
                value={confirm_password} 
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioConfPassword(e.target.value, {userPass, handleComprobacio, handleErrors})}
                type="password" 
                placeholder="********" 
                id="password" 
                name="confirm_password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$" 
                required
            />
        </>
    )
}

export default Register;