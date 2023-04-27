import { React, useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioName, ComprobacioCognoms, ComprobacioDNI, 
          ComprobacioEmail, ComprobacioPassword, ComprobacioConfPassword} from "../../js/comprobacioCampsFormulariUser";

import { nomesAdmin } from "../../js/comprobacioCarrecs";

function UserUpdate(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: '',
    cognoms: '',
    dni: '',
    carrec: '',
    email: '',
    password1: '',
    password2: ''
  });

  const [carrecs, setCarrecs] = useState([])
  const carrec = window.localStorage.getItem('carrec');

  const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

  const [comprobacio, setComprobacio] = useState({
    comprobacioName: false,
    comprobacioCognoms: false,
    comprobacioDNI: false,
    comprobacioEmail: false,
    comprobacioPass: true,
    comprobacioConfirmPass: true
  });

  const [errors, setErrors] = useState({
    errorName: '',
    errorCognoms: '',
    errorDNI: '',
    errorEmail:'',
    errorPass: '',
    errorConfPass:''
  });
  
  useEffect(() => {
    if(['Director','Administrador'].includes(carrec)){
      fetch(
        "http://localhost:5000/usuaris/carrecs",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(response => response.json())
      .then(json => {
        setCarrecs(json.carrecs)
      });
    }
  },[carrec])

  useEffect(() => {
    fetch(
      "http://localhost:5000/usuaris/user/" + id,
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
    .then(response => response.json())
    .then(json => {
      const password1 = '';
      const password2 = '';
      const { id, profilePicture, ...userTempo} = json.usuari;
      setUser(prevState => ({ ...prevState, ...userTempo, password1, password2 }));
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(comprobacio).includes(false)) {
      fetch("http://localhost:5000/usuaris/user/" + id, {
        method: "PUT",
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

				if (json.ok) {
          navigate(`/home/user/show/${json.id}`)
				}
      });

    }
  }

  // const handleChangeFile = input => {
	// 	setUser({ ...user, [input.name]: input.files[0] });
	// };

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


  return (
    <main>
      <div className="row">
        <div className="col-md-12">
					<h5>Actualitzar Usuari</h5>
				</div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>

              {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

              {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

              <InputNom 
                nomUser={user.nom} 
                handleChange={handleChange} 
                handleComprobacio={handleComprobacio} 
                handleErrors={handleErrors}
              />
              {errors.errorName && (<p className="error-message">{errors.errorName}</p>)}

              <InputCognoms 
                cognomsUser={user.cognoms} 
                handleChange={handleChange} 
                handleComprobacio={handleComprobacio} 
                handleErrors={handleErrors}
              />
              {errors.errorCognoms && (<p className="error-message">{errors.errorCognoms}</p>)}

              <InputDNI 
                dniUser={user.dni} 
                handleChange={handleChange}  
                handleComprobacio={handleComprobacio} 
                handleErrors={handleErrors}
              />
              {errors.errorDNI && (<p className="error-message" >{errors.errorDNI}</p>)}

              {(carrec !== 'Alumne' && carrec !== 'Professor') && (
                <InputCarrec carrecs={carrecs} carrecUser={user.carrec} handleChange={handleChange} />
              )}

              <InputEmail 
                emailUser={user.email} 
                handleChange={handleChange} 
                handleComprobacio={handleComprobacio} 
                handleErrors={handleErrors}
              />
              {errors.errorEmail && (<p className="error-message">{errors.errorEmail}</p>)}

                {nomesAdmin() && (
                  <div className="form-group card card-body">
                    <InputPassword 
                      userPass={user.password1} 
                      handleChange={handleChange} 
                      handleComprobacio={handleComprobacio} 
                      handleErrors={handleErrors} 
                    />
                    {errors.errorPass && (<p className="error-message" >{errors.errorPass}</p>)}
    
                    <InputConfirmPassword 
                      userPass={user.password1} 
                      userConfirmPass={user.password2} 
                      handleChange={handleChange}
                      handleComprobacio={handleComprobacio} 
                      handleErrors={handleErrors}
                    />
                    {errors.errorConfPass && (<p className="error-message" >{errors.errorConfPass}</p>)}
    
                  </div>
                )}


              {/* <InputprofilePicture userProfile={user.profilePicture} handleChangeFile={handleChangeFile} /> */}

              <button type="submit" className="btn btn-primary">Actualitzar</button>
            </form>
          </div>
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
      <select className="form-control" name="carrec" value={carrecUser} onChange={(e) => handleChange(e.target)}>
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
        name="password1"
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
      <label form="password">Repeteix Contrasenya Nova</label>
      <input
        type="password"
        name="password2"
        className="form-control"
        value={userConfirmPass}
        onChange={(e) => setUserConfirmPass(e.target.value)}
        onBlur={(e) => ComprobacioConfPassword(e.target.value, {userPass, handleComprobacio, handleErrors})}
      />
    </>
  )
}

// function InputprofilePicture({handleChangeFile}){
//   return(
//     <div className="form-group">
//       <label form="profilePicture">Imatge de perfil</label>
//       <input 
//         type="file" 
//         name="profilePicture" 
//         accept="image/png, .jpeg, .jpg" 
//         className="form-control" 
//         onChange={(e) => handleChangeFile(e.target)}
//       />
//     </div>
//   )
// }


export default UserUpdate;