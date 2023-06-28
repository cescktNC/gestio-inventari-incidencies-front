import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function  ReservaDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ReservaData, setReservaData] = useState({
    codi: "",
    hora: "",
    data: "",
    dniUsuari: "",
    codiLocalitzacio: ""
  });

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/reserva/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    }
    })
  
      .then((response) => response.json())
      .then((json) => {
        if (json.reserva) setReservaData(json.reserva);
  
        if(json.error !== undefined) setErrorBack(json.error);
      });
    }, [id]);
  const handleDelete = () => {
    fetch(`http://localhost:5000/reserva/delete/${id}`, {
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
      <h5 className="card-title">Eliminar reserva:  nom: {ReservaData.nom}, codi: {ReservaData.codi}</h5>
      <div className="alert alert-danger" role="alert">
          Estàs a punt d'eliminar la següent reserva:
				</div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <ul>
          <li>Codi: {ReservaData.codi}</li>
          <li>Hora: {ReservaData.hora}</li>
          <li>Data: {ReservaData.data}</li>
          <li>Dni Usuari: {ReservaData.dniUsuari}</li>
          <li>Codi Localitzacio: {ReservaData.codiLocalitzacio}</li>
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
export default ReservaDelete;
