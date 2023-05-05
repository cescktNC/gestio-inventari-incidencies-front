import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioPlanol } from '../../js/comprobacioCampsPlanta';
import { ComprobacioName } from '../../js/comprobacioCampsMaterials';
function PlantaCreate(props) {
  const navigate = useNavigate();

  const [PlantaData, setPlantaData] = useState({
    nom: "",
    codicentre: "",
    planol: ""
  });

  const [comprobacio, setComprobacio] = useState({
    comprobacioNom: false,
    comprobacioPlanol: false,
  });

  const [errorsForm, setErrorsForm] = useState({
    errorName: '',
    errorPlanol: '',
  });

  const [centres, setCentres] = useState([]);

  const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/centre/APIalllist", {
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
    .then(response => response.json())
    .then(json => {
      if(json.list) {
        setCentres(json.list);
        setPlantaData({...PlantaData, codicentre: json.list[0]._id})
      }
      if(json.error) setErrorBack(json.error)
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', PlantaData.nom);
    formData.append('codiCentre', PlantaData.codicentre);
    formData.append('planol', PlantaData.planol); 

    ComprobacioName(PlantaData.nom, {handleComprobacio, handleErrors}); 
    ComprobacioPlanol(PlantaData.planol, {handleComprobacio, handleErrors}); 

    if (!Object.values(comprobacio).includes(false)) { 
      fetch("http://localhost:5000/planta/APIcreate", {
        method: "POST",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
        },
        body: formData,
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate(-1);

        if(json.error !== undefined) setErrorBack(json.error);
          
        if(json.errors !== undefined) setErrorsBack(json.errors);
        
      });
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'planol') setPlantaData({ ...PlantaData, [name]: files[0] });

    else setPlantaData({ ...PlantaData, [name]: value });
    
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
        <h5 className="card-title">Nova Planta</h5>
      </div>
      <div className="card-body">
        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <form onSubmit={handleSubmit}>
          <InputNom 
            nomPlanta={PlantaData.nom}
            handleChange={handleChange}
            handleComprobacio={handleComprobacio}
            handleErrors={handleErrors}
            ComprobacioName={ComprobacioName}
          />
          {errorsForm.errorName && (<p className="error-message">{errorsForm.errorName}</p>)}

          <SelectCentre
            centres={centres}
            centrePlanta={PlantaData.codicentre}
            handleChange={handleChange}
          />
          <FilePlanol 
            handleChange={handleChange}
            handleComprobacio={handleComprobacio}
            handleErrors={handleErrors}
            ComprobacioPlanol={ComprobacioPlanol}
          />
          {errorsForm.errorPlanol && (<p className="error-message">{errorsForm.errorPlanol}</p>)}
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

function InputNom({nomPlanta, handleChange, handleComprobacio, handleErrors, ComprobacioName}){
  return(
    <div className="form-group">
      <label htmlFor="nom">Nom:</label>
      <input
        id="nom"
        name="nom"
        type="text"
        className="form-control"
        value={nomPlanta}
        onChange={handleChange}
        onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
        required
      />
    </div>
  )
}

function SelectCentre({centres, centrePlanta, handleChange}){
  return (
    <div className="form-group">
      <label htmlFor="codicentre">Codi Centre:</label>
      <select       
        name="codicentre"
        id="codicentre"
        value={centrePlanta}
        onChange={handleChange} 
        className="form-control"
      >
        {
          centres.map((centre, index) =>(
            <option key={index} value={`${centre._id}`}>{centre.nom}</option>
          ))
        }
      </select>
    </div>
  )
}

function FilePlanol({handleChange, handleComprobacio, handleErrors, ComprobacioPlanol}){
  return(
    <div className="form-group">
      <label htmlFor="planol">Planol:</label>
      <input
        id="planol"
        name="planol"
        type="file"
        className="form-control"
        onChange={handleChange}
        onBlur={(e) => ComprobacioPlanol(e.target.files[0], {handleComprobacio, handleErrors})}
        required
      />
  </div>
  )
}

export default PlantaCreate;