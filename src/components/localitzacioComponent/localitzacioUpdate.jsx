import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LocalitzacioUpdate(props) {
  const { id } = useParams();
  

  const [LocalitzacioData, setLocalitzacioData] = useState({
    nom: "",
    codi: "",
    codiPlanta: "",
    especial: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/localitzacio/update/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    }
    })
      .then((response) => response.json())
      .then((json) => setLocalitzacioData(json));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalitzacioData({ ...LocalitzacioData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/localitzacio/update/${id}`, {
      method: "PUT",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    },
      body: JSON.stringify(LocalitzacioData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/localitzacio");
        } else {
          alert("Error al actualizar la localitzacio");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant localitzacio {id}</h1>
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
          <label htmlFor="Nom">Nom:</label>
          <input
            id="nom"
            name="nom"
            value={LocalitzacioData.nom}
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default LocalitzacioUpdate;
