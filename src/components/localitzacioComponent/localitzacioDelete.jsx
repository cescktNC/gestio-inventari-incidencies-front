import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function LocalitzacioDelete(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [LocalitzacioData, setLocalitzacioData] = useState({
    nom: "",
    codi: "",
    codiPlanta: "",
    especial: ""
  });

	const [errorBack, setErrorBack] = useState('');


  useEffect(() => {
    fetch(`http://localhost:5000/localitzacio/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      } 
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.localitzacio) setLocalitzacioData(json.localitzacio);
      if(json.error) setErrorBack(json.error);
    });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/localitzacio/APIdelete/${id}`, {
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
        if(json.error) setErrorBack(json.error);
      });
  };

  return (
    <div>
      <h1>Eliminar localitzacio {LocalitzacioData.nom}</h1>
      <div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <p>Estàs a punt d'eliminar el següent centre:</p>
        <ul>
          <li>Nom: {LocalitzacioData.nom}</li>
          <li>Codi: {LocalitzacioData.codi}</li>
          <li>Planta: {LocalitzacioData.codiPlanta.nom}</li>
          <li>Especial: {LocalitzacioData.especial ? 'Si' : 'No'}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
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

export default LocalitzacioDelete;
