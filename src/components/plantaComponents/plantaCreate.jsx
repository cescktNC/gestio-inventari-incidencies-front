import { useState } from "react";

function PlantaCreate(props) {
  const [PlantaData, setPlantaData] = useState({
    nom: "",
    codi: "",
    codicentre: "",
    planol: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantaData({ ...PlantaData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/planta/create", {
      method: "POST",
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
          alert("Error al crear la planta");
        }
      });
  };

  return (
    <div>
      <h1>Crear nova planta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Codi:</label>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default PlantaCreate;