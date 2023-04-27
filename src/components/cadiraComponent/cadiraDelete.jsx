import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CadiraDelete(props) {
  const { id } = useParams();
  

  const [CadiraData, setCadiraData] = useState({
    fila: "",
    numero: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/cadira/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((json) => setCadiraData(json));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/cadira/delete/${id}`, {
      method: "DELETE",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/cadira");
        } else {
          alert("Error al eliminar la cadira");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar cadira {id}</h1>
      <div>
        <p>Estàs a punt d'eliminar el següent centre:</p>
        <ul>
          <li>Fila: {CadiraData.fila}</li>
          <li>Cadira: {CadiraData.numero}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default CadiraDelete;
