import {React, useState, useEffect} from "react";
 
import { useParams } from "react-router-dom";

function UserUpdate(){
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [carrecs, setCarrecs] = useState([])
  const carrec = window.localStorage.getItem('carrec');

  
    useEffect(()=>{
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
      setUser(json.usuari);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    // fetch("http://localhost:5000/autenticacions/loginAPI", {
    //   method: "POST",
    //   body: JSON.stringify({ user: user }),
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // .then((response) => response.json())
    // .then((json) => {
      
    // });
  }

  const handleChange = input => {
		setUser({ ...user, [input.name]: input.value });
	};

  return (
    <main>
      <div className="row">
        <div className="col-md-12">
					<h5>Actualitzar Usuari</h5>
				</div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <InputNom nomUser={user.nom} handleChange={handleChange} />
              <InputCognoms cognomsUser={user.cognoms} handleChange={handleChange} />
              <InputDNI dniUser={user.dni} handleChange={handleChange} />
              {(carrec !== 'Alumne' && carrec !== 'Professor') && (
                <InputCarrect carrecs={carrecs} carrecUser={user.carrec} handleChange={handleChange} />
              )}
              <button type="submit" className="btn btn-primary">Actualitzar</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

function InputNom({nomUser, handleChange}){
  
  return(
    <div className="form-group">
      <label form="nom">Nom</label>
      <input
        type="text"
        name="nom"
        value={nomUser}
        onChange={(e) => handleChange(e.target)}
        className="form-control"
        required
      />
    </div>
  )

}

function InputCognoms({cognomsUser, handleChange}){
  return(
    <div className="form-group">
      <label form="cognoms">Cognoms</label>
      <input
        type="text"
        name="cognoms"
        value={cognomsUser}
        onChange={(e) => handleChange(e.target)}
        className="form-control"
        required
      />
    </div>
  )
}

function InputDNI({dniUser, handleChange}){
  return(
    <div className="form-group">
      <label form="dni">DNI</label>
      <input
        type="text"
        name="dni"
        value={dniUser}
        onChange={(e) => handleChange(e.target)}
        className="form-control"
        required
      />
    </div>
  )
}

function InputCarrect({carrecs, carrecUser, handleChange}){
  return(
    <div className="form-group">
      <label form="carrec">Càrrec</label><br />
      <select name="carrec" value={carrecUser} onChange={(e) => handleChange(e.target)}>
        {carrecs.map((carrec, index) => (
          <option key={index}  selected={carrecUser === carrec}>{carrec}</option>
        ))}
      </select>
    </div>
  )
}



export default UserUpdate;