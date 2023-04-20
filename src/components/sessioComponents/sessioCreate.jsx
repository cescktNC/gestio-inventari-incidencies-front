import { useState } from "react";

function SessioCreate(props) {
  const [SessioData, setSessioData] = useState({
    nom: "",
    codi: "",
    codiReserva: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessioData({ ...SessioData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/sessio/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(SessioData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/sessio");
        } else {
          alert("Error al crear la sessio");
        }
      });
  };

  return (
    <div>
      <h1>Crear nova sessio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={SessioData.codi}
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
              value={SessioData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="codiReserva">Codi Reserva:</label>
            <input
              id="codiReserva"
              name="codiReserva"
              value={SessioData.codiReserva}
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

export default SessioCreate;