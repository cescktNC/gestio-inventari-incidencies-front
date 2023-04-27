import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PlantaDelete(props) {
  const { id } = useParams();
  

  const [PlantaData, setPlantaData] = useState({
    nom: "",
    codi: "",
    codicentre: "",
    planol: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/planta/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    }
    })
      .then((response) => response.json())
      .then((json) => setPlantaData(json));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/planta/delete/${id}`, {
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
          props.history.push("/home/planta");
        } else {
          alert("Error al eliminar la planta");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar planta {id}</h1>
      <div>
        <p>Estàs a punt d'eliminar la següent planta:</p>
        <ul>
          <li>Nom: {PlantaData.nom}</li>
          <li>Codi: {PlantaData.codi}</li>
          <li>codiCentre: {PlantaData.codicentre}</li>
          <li>planol: {PlantaData.planol}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default PlantaDelete;
