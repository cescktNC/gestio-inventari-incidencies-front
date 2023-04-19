import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CentreDelete(props) {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [CentreData, setCentreData] = useState({
    nom: "",
    codi: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/centre/APIshow/${id}`)
      .then((response) => response.json())
      .then((json) => setCentreData(json.centre));
  }, [id]);


  const handleDelete = () => {
    fetch(`http://localhost:5000/centre/APIdelete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          navigate("/home/centre");
        } else {
          alert("Error al eliminar el centre");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar centre {CentreData.nom}</h1>
      <div>
        <p>Estàs a punt d'eliminar el següent centre:</p>
        <ul>
          <li>Nom: {CentreData.nom}</li>
          <li>Codi: {CentreData.codi}</li>
        </ul>
        <p>Estàs segur d'eliminar-lo?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default CentreDelete;
