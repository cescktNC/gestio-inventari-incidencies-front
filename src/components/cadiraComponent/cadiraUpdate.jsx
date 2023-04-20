import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CadiraUpdate(props) {
  const { id } = useParams();
  

  const [CadiraData, setCadiraData] = useState({
    fila: "",
    numero: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/cadira/update/${id}`)
      .then((response) => response.json())
      .then((json) => setCadiraData(json));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCadiraData({ ...CadiraData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/cadira/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CadiraData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/cadira");
        } else {
          alert("Error al actualizar la cadira");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant cadira {id}</h1>
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
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default CadiraUpdate;
