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
      .then((json) => setSessioData(json));
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
        if (json.success) {
          props.history.push("/home/sessio");
        } else {
          alert("Error al eliminar la sessio");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar Sessio {id}</h1>
      <div>
        <p>Estàs a punt d'eliminar la següent sessio:</p>
        <ul>
          <li>Codi: {SessioData.codi}</li>
          <li>Nom: {SessioData.nom}</li>
          <li>codiReserva: {SessioData.codiReserva}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default SessioDelete;
