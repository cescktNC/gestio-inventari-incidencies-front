import { useState } from "react";

function LocalitzacioCreate(props) {
  const [LocalitzacioData, setLocalitzacioData] = useState({
    nom: "",
    codi: "",
    codiPlanta: "",
    especial: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalitzacioData({ ...LocalitzacioData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/localitzacio/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(LocalitzacioData),
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        props.history.push("/home/localitzacio");
      } else {
        alert("Error al crear la localitzacio");
      }
    });
  };

  return (
    <div>
      <h1>Crear nova localitzacio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={LocalitzacioData.codi}
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
              value={LocalitzacioData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="codiplanta">Codi Planta:</label>
            <input
              id="codiplanta"
              name="codiplanta"
              value={LocalitzacioData.codiPlanta}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="especial">Especial:</label>
            <input
              id="especial"
              name="especial"
              value={LocalitzacioData.especial}
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

export default LocalitzacioCreate;