import { useState } from "react";

function CentreCreate(props) {
  const [CentreData, setCentreData] = useState({
    nom: "",
    codi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...CentreData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/centre/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CentreData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/centre");
        } else {
          alert("Error al crear el centre");
        }
      });
  };

  return (
    <div>
      <h1>Crear nou centre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={CentreData.codi}
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
              value={CentreData.nom}
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

export default CentreCreate;