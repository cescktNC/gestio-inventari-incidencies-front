import { React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioName, ComprobacioCognoms, ComprobacioDNI, 
            ComprobacioEmail, ComprobacioPassword, ComprobacioConfPassword } from "../../js/comprobacioCampsFormulariUser";

function UserUpdate(){
    const [user, setUser] = useState({
        nom: '',
        cognoms: '',
        dni: '',
        carrec: '',
        email: '',
        password: '',
    });

    const [userConfirmPass, setUserConfirmPass] = useState('');
    const [carrecs, setCarrecs] = useState([]);

    const [comprobacio, setComprobacio] = useState({
        comprobacioName: false,
        comprobacioCognoms: false,
        comprobacioDNI: false,
        comprobacioEmail: false,
        comprobacioPass: true,
        comprobacioConfirmPass: true
    });

    const [errorsForm, setErrorsForm] = useState({
        errorName: '',
        errorCognoms: '',
        errorDNI: '',
        errorEmail:'',
        errorPass: '',
        errorConfPass:''
    });

	const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        fetch("http://localhost:5000/usuaris/carrecs", {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            setCarrecs(json.carrecs)
        });
    
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(comprobacio).includes(false)) {
            fetch("http://localhost:5000/usuaris/user", {
                method: "POST",
                body: JSON.stringify({ user: user }),
                headers: { 
                    "Authorization": "Bearer " + window.localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    "Accept-Type": "application/json"
                },
            })
            .then((response) => response.json())
            .then((json) => {
                
                if(json.error !== undefined) setErrorBack(json.error);
				
				if(json.errors !== undefined) setErrorsBack(json.errors);

				if (json.ok) navigate(`/home/user/show/${json.id}`)
				
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
        setErrorsForm({
            ...errorsForm,
            [camp]: valor
        });
    };

    return (
        <main>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">Nou Usuari</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

                        <InputNom 
                            nomUser={user.nom} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorName && (<p className="error-message">{errorsForm.errorName}</p>)}

                        <InputCognoms 
                            cognomsUser={user.cognoms} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorCognoms && (<p className="error-message">{errorsForm.errorCognoms}</p>)}

                        <InputDNI 
                            dniUser={user.dni} 
                            handleChange={handleChange}  
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDNI && (<p className="error-message" >{errorsForm.errorDNI}</p>)}

                        <InputCarrec carrecs={carrecs} carrecUser={user.carrec} handleChange={handleChange} />

                        <InputEmail 
                            emailUser={user.email} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorEmail && (<p className="error-message">{errorsForm.errorEmail}</p>)}

                        <div className="form-group card card-body">
                            <InputPassword 
                                userPass={user.password} 
                                handleChange={handleChange} 
                                handleComprobacio={handleComprobacio} 
                                handleErrors={handleErrors} 
                            />
                            {errorsForm.errorPass && (<p className="error-message" >{errorsForm.errorPass}</p>)}

                            <InputConfirmPassword 
                                userPass={user.password} 
                                userConfirmPass={userConfirmPass} 
                                setUserConfirmPass={setUserConfirmPass}
                                handleComprobacio={handleComprobacio} 
                                handleErrors={handleErrors}
                            />
                            {errorsForm.errorConfPass && (<p className="error-message" >{errorsForm.errorConfPass}</p>)}

                        </div>

                        <button type="submit" className="btn btn-primary">Crea</button>
                    </form>
                </div>
            </div>
        </main>
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

function InputNom({nomUser, handleChange, handleComprobacio, handleErrors}){

    return(
        <div className="form-group">
            <label form="nom">Nom</label>
            <input
            type="text"
            name="nom"
            value={nomUser}
            onChange={(e) => handleChange(e.target)}
            onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
            className="form-control"
            required
            />
        </div>
    )

}

function InputCognoms({cognomsUser, handleChange, handleComprobacio, handleErrors}){
    return(
        <div className="form-group">
            <label form="cognoms">Cognoms</label>
            <input
            type="text"
            name="cognoms"
            value={cognomsUser}
            onChange={(e) => handleChange(e.target)}
            onBlur={(e) => ComprobacioCognoms(e.target.value, {handleComprobacio, handleErrors})}
            className="form-control"
            required
            />
        </div>
    )
}

function InputDNI({dniUser, handleChange, handleComprobacio, handleErrors}){
    return(
        <div className="form-group">
            <label form="dni">DNI</label>
            <input
            type="text"
            name="dni"
            value={dniUser}
            onChange={(e) => handleChange(e.target)}
            onBlur={(e) => ComprobacioDNI(e.target.value, {handleComprobacio, handleErrors})}
            className="form-control"
            required
            />
        </div>
    )
}

function InputCarrec({carrecs, carrecUser, handleChange}){
// No utilitzar selected, prefereix value o defaultValue
    return(
        <div className="form-group">
            <label form="carrec">Càrrec</label><br />
            <select className="form-control" name="carrec" value="Alumne" onChange={(e) => handleChange(e.target)}>
            {carrecs.map((carrec, index) => (
                <option key={index} >{carrec}</option>
            ))}
            </select>
        </div>
    )
}

function InputEmail({emailUser, handleChange, handleComprobacio, handleErrors}){
    return (
        <div className="form-group">
            <label form="email">E-mail</label>
            <input
            type="email"
            name="email"
            value={emailUser}
            onChange={(e) => handleChange(e.target)}
            onBlur={(e) => ComprobacioEmail(e.target.value, {handleComprobacio, handleErrors})}
            className="form-control"
            required
            />
        </div>
    )
}

function InputPassword({userPass, handleChange, handleComprobacio, handleErrors}){
    return(
        <>
            <label form="password">Contrasenya Nova</label>
            <input
            type="password"
            name="password"
            className="form-control"
            value={userPass}
            onChange={(e) => handleChange(e.target)}
            onBlur={(e) => ComprobacioPassword(e.target.value, {handleComprobacio, handleErrors})}
            />
        </>
    )
}

function InputConfirmPassword({userPass, userConfirmPass, setUserConfirmPass, handleComprobacio, handleErrors}){
    return(
        <>
            <label form="confPass">Repeteix Contrasenya Nova</label>
            <input
            type="password"
            name="confPass"
            className="form-control"
            value={userConfirmPass}
            onChange={(e) => setUserConfirmPass(e.target.value)}
            onBlur={(e) => ComprobacioConfPassword(e.target.value, {userPass, handleComprobacio, handleErrors})}
            />
        </>
    )
}

export default UserUpdate;