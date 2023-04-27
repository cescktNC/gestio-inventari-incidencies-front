import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SessioUpdate(props) {
  const { id } = useParams();
  

  const [SessioData,setSessioData] = useState({
    nom: "",
    codi: "",
    codiReserva: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/sessio/update/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => setSessioData(json));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessioData({ ...SessioData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/sessio/update/${id}`, {
      method: "PUT",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
      body: JSON.stringify(SessioData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/sessio");
        } else {
          alert("Error al actualizar la sessio");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant sessio {id}</h1>
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
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default SessioUpdate;
