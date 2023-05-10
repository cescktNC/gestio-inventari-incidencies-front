import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CentreDelete(props) {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [CentreData, setCentreData] = useState({
    nom: "",
    codi: "",
  });

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/centre/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.centre) setCentreData(json.centre);
      if(json.error) setErrorBack(json.error)
    });
}, [id]);



  const handleDelete = () => {
    fetch(`http://localhost:5000/centre/APIdelete/${id}`, {
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
      <h5 className="card-title">Eliminar centre:  nom: {CentreData.nom}, codi: {CentreData.codi}</h5>
      <div className="alert alert-danger" role="alert">
          Estàs a punt d'eliminar el següent centre:
				</div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <ul>
          <li>Nom: {CentreData.nom}</li>
          <li>Codi: {CentreData.codi}</li>
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

export default CentreDelete;
