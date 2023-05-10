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
      if(json.error) setErrorBack(json.error)
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
      if (json.ok) {
        navigate(-1);
      } else {
        setErrorBack(json.error);
      }
    });
};

  return (
    <main>
		<div className="card mt-2">
			<div className="card-body">
      <h5 className="card-title">Eliminar localitzacio:  nom: {LocalitzacioData.nom}, codi: {LocalitzacioData.codi}</h5>
      <div className="alert alert-danger" role="alert">
          Estàs a punt d'eliminar la següent localitzacio:
				</div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <ul>
          <li>Nom: {LocalitzacioData.nom}</li>
          <li>Codi: {LocalitzacioData.codi}</li>
          <li>Planta: {LocalitzacioData.codiPlanta.nom}</li>
          <li>Especial: {LocalitzacioData.especial ? 'Si' : 'No'}</li>
        </ul>
        <p>Estàs segur d'eliminar-lo?</p>
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
      </div>
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

export default LocalitzacioDelete;
