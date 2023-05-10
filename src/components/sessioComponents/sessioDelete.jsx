import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SessioDelete(props) {
  const { id } = useParams();
  

  const [SessioData, setSessioData] = useState({
    nom: "",
    codi: "",
    codiReserva: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/sessio/${id}`,{
      headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.sessio) setSessioData(json.sessio);
      if(json.error) setErrorBack(json.error)
    });
}, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/sessio/delete/${id}`, {
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
      <h5 className="card-title">Eliminar sessio:  nom: {SessioData.nom}, codi: {SessioData.codi}</h5>
      <div className="alert alert-danger" role="alert">
          Estàs a punt d'eliminar la següent sessio:
				</div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <ul>
          <li>Codi: {SessioData.codi}</li>
          <li>Nom: {SessioData.nom}</li>
          <li>codiReserva: {SessioData.codiReserva}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
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
export default SessioDelete;
