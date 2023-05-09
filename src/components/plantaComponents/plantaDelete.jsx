import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PlantaDelete(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [PlantaData, setPlantaData] = useState({
    nom: "",
    codi: "",
    codiCentre: {},
    planol: ""
  });

	const [errorBack, setErrorBack] = useState('');


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
      if (json.planta) setPlantaData(json.planta);

      if(json.error !== undefined) setErrorBack(json.error);
    });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/planta/APIdelete/${id}`, {
      method: "DELETE",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.ok) navigate(-1);

      if(json.error !== undefined) setErrorBack(json.error);
    });
  };

  return (
    <div>
      <h1>Eliminar planta {PlantaData.nom}</h1>
      <div>
        {(errorBack.length !== 0 && (<DivError error={errorBack} />) )}
        <p>Estàs a punt d'eliminar la següent planta:</p>
        <ul>
          <li>Nom: {PlantaData.nom}</li>
          <li>Codi: {PlantaData.codi}</li>
          <li>Nom Centre: {PlantaData.codiCentre.nom}</li>
          <li>planol: <img src={ 'http://localhost:5000/' + PlantaData.planol} alt={PlantaData.nom} /></li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

function DivError({error}){
  return(
    <div className="alert alert-danger">
      <p className="text-danger">{error}</p>
    </div>
  )
}

export default PlantaDelete;
