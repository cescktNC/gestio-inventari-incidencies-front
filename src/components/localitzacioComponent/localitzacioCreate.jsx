import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioName } from "../../js/comprobacioCampsMaterials";

function LocalitzacioCreate(props) {
  const [LocalitzacioData, setLocalitzacioData] = useState({
    nom: "",
    codiPlanta: "",
    especial: false
  });

  const [plantes, setPlantes] = useState([]);
  const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

  const [comprobacio, setComprobacio] = useState({
    comprobacioNom: false,
  });

  const [errorsForm, setErrorsForm] = useState({
    errorName: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/planta/APIalllist", {
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(json => {
      if(json.list) {
        setPlantes(json.list);
        setLocalitzacioData(praveState => ({
          ...praveState,
          codiPlanta: json.list[0]._id
        }));
      }
      
      if(json.error) setErrorBack(json.error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioName(LocalitzacioData.nom, {handleComprobacio, handleErrors})
    if (!Object.values(comprobacio).includes(false)) {
      fetch("http://localhost:5000/localitzacio/APIcreate", {
        method: "POST",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
      },
        body: JSON.stringify({LocalitzacioData}),
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate(-1);
        if(json.error) setErrorBack(json.error);
        if(json.errors) setErrorsBack(json.errors);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'especial')setLocalitzacioData({ ...LocalitzacioData, [name]: !LocalitzacioData.especial });
    
    else setLocalitzacioData({ ...LocalitzacioData, [name]: value });
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
    <main className="card mt-4">
      <div className="card-header">
        <h5 className="card-title">Nova Localitzacio</h5>
      </div>
      <div className="card-body">
        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <form onSubmit={handleSubmit}>
          <InputNom 
            nom={LocalitzacioData.nom} 
            handleChange={handleChange} 
            handleComprobacio={handleComprobacio} 
            handleErrors={handleErrors} 
          />
          {errorsForm.errorName && (<p className="error-message">{errorsForm.errorName}</p>)}
          <SelectPlanta 
            plantes={plantes} 
            codiPlanta={LocalitzacioData.codiPlanta} 
            handleChange={handleChange} 
          />
          <CheckEspecial 
            especial={LocalitzacioData.especial} 
            handleChange={handleChange} 
          />
          <button type="submit" className="btn btn-primary">Crear</button>
        </form>
      </div>
    </main>
  );
}

function DivError({error}){
  return(
    <div className="alert alert-danger">
      <p className="text-danger">{error}</p>
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

function InputNom({nom, handleChange, handleComprobacio, handleErrors}){
  return(

    <div className="form-group">
      <label className="form-check-label" htmlFor="nom">Nom:</label>
      <input
        id="nom"
        name="nom"
        className="form-control" 
        value={nom}
        onChange={handleChange}
        onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
        required
      />
    </div>

  )
}

function SelectPlanta({plantes, codiPlanta, handleChange}){
  return(
    <div className="form-group">
      <label className="form-check-label" htmlFor="codiPlanta">Planta</label>
      <select       
        name="codiPlanta"
        id="codiPlanta"
        value={codiPlanta}
        onChange={(e) => handleChange(e)}
        className="form-control"
      >
        {
          plantes.map((planta, index) =>(
            <option key={index} value={`${planta._id}`}>{planta.nom}</option>
          ))
        }
      </select>
  </div>
  )
}

function CheckEspecial({especial, handleChange}){
  return (
    <div className="form-group">
      <label className="form-check-label" htmlFor="especial">Especial:</label>
      <input
        id="especial"
        name="especial"
        type="checkbox"
        className=" form-check-inline form-check-input-sm"
        value={especial}
        onChange={handleChange}
      />
    </div>
  )
}

export default LocalitzacioCreate;