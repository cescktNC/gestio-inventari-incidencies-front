import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PlantaUpdate(props) {
  const { id } = useParams();
  

  const [PlantaData,setPlantaData] = useState({
    nom: "",
    codi: "",
    coidcentre: "",
    planol:""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/centre/update/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    }
    })
      .then((response) => response.json())
      .then((json) => setPlantaData(json));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantaData({ ...PlantaData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/planta/update/${id}`, {
      method: "PUT",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    },
      body: JSON.stringify(PlantaData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/planta");
        } else {
          alert("Error al actualizar la planta");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant planta {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={PlantaData.codi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input
            id="nom"
            name="nom"
            value={PlantaData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="codicentre">Codi Centre:</label>
          <input
            id="codicentre"
            name="codicentre"
            value={PlantaData.codicentre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="planol">Planol:</label>
          <input
            id="planol"
            name="planol"
            value={PlantaData.planol}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default PlantaUpdate;
