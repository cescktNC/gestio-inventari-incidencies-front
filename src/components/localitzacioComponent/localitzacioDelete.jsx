import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LocalitzacioDelete(props) {
  const { id } = useParams();
  

  const [LocalitzacioData, setLocalitzacioData] = useState({
    nom: "",
    codi: "",
    codiPlanta: "",
    especial: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/localitzacio/${id}`)
      .then((response) => response.json())
      .then((json) => setLocalitzacioData(json));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/localitzacio/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/localitzacio");
        } else {
          alert("Error al eliminar la localitzacio");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar localitzacio {id}</h1>
      <div>
        <p>Estàs a punt d'eliminar el següent centre:</p>
        <ul>
          <li>Nom: {LocalitzacioData.nom}</li>
          <li>Codi: {LocalitzacioData.codi}</li>
          <li>CodiPlanta: {LocalitzacioData.codiPlanta}</li>
          <li>Especial: {LocalitzacioData.especial}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default LocalitzacioDelete;
