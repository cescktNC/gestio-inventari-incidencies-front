import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { ComprobacioPlanol } from '../../js/comprobacioCampsPlanta';
import { ComprobacioName } from '../../js/comprobacioCampsMaterials';

function PlantaUpdate(props) {
  const { id } = useParams();

  const navigate = useNavigate();
  
  const [PlantaData,setPlantaData] = useState({
    nom: "",
    codi: "",
    coidCentre: "",
    newCodiCentre: "",
    planol:""
  });

  const [centres, setCentres] = useState([]);

  const [comprobacio, setComprobacio] = useState({
    comprobacioNom: true,
    comprobacioPlanol: true,
  });

  const [errorsForm, setErrorsForm] = useState({
    errorName: '',
    errorPlanol: '',
  });

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
      if(json.list) setCentres(json.list);
      
      if(json.error) setErrorBack(json.error)
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/planta/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.planta) setPlantaData({
        ...json.planta,
        codiCentre: json.planta.codiCentre._id,
        newCodicentre: json.planta.codiCentre._id,
        planol: ''
      });

      if(json.error !== undefined) setErrorBack(json.error);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('codi', PlantaData.codi);
    formData.append('nom', PlantaData.nom);
    formData.append('codiCentre', PlantaData.codiCentre);
    formData.append('newCodicentre', PlantaData.newCodicentre);
    if(PlantaData.planol !== '') {
      formData.append('planol', PlantaData.planol); 
      ComprobacioPlanol(PlantaData.planol, {handleComprobacio, handleErrors});
    }
    
    ComprobacioName(PlantaData.nom, {handleComprobacio, handleErrors}); 

    if (!Object.values(comprobacio).includes(false)) { 
      fetch(`http://localhost:5000/planta/APIupdate/${id}`, {
        method: "PUT",
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
            centrePlanta={PlantaData.newCodicentre}
            handleChange={handleChange}
          />
          <FilePlanol 
            handleChange={handleChange}
            handleComprobacio={handleComprobacio}
            handleErrors={handleErrors}
            ComprobacioPlanol={ComprobacioPlanol}
          />
          {errorsForm.errorPlanol && (<p className="error-message">{errorsForm.errorPlanol}</p>)}
          <button type="submit" className="btn btn-primary">Modificar</button>
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
      {Object.values(errors).map((error, index) => <li key={index}>{error}</li>)}
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
      <label htmlFor="newCodicentre">Codi Centre:</label>
      <select       
        name="newCodicentre"
        id="newCodicentre"
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
        />
    </div>
  )
}

export default PlantaUpdate;
