import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CentreUpdate(props) {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [centreData, setCentreData] = useState({
    nom: "",
    codi: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/centre/APIshow/${id}`)
      .then((response) => response.json())
      .then((json) => setCentreData(json.centre));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...centreData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/centre/APIupdate/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(centreData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          navigate("/home/centre/list");
        } else {
          alert("Error al actualizar el centre");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant centre {centreData.nom}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={centreData.codi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Nom">Nom:</label>
          <input
            id="nom"
            name="nom"
            value={centreData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default CentreUpdate;
