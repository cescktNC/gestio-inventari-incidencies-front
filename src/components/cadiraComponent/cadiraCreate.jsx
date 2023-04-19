import { useState } from "react";

function CadiraCreate(props) {
  const [CadiraData, setCadiraData] = useState({
    fila: "",
    numero: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCadiraData({ ...CadiraData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/cadira/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CadiraData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/cadira");
        } else {
          alert("Error al crear la cadira");
        }
      });
  };

  return (
    <div>
      <h1>Crear nova cadira</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fila">Fila:</label>
          <input
            type="number"
            id="fila"
            name="fila"
            value={CadiraData.fila}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="numero">Numero:</label>
            <input
              type="number"
              id="numero"
              name="numero"
              value={CadiraData.numero}
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

export default CadiraCreate;