import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function  ReservaDelete(props) {
  const { id } = useParams();
  const [ReservaData, setReservaData] = useState({
    codi: "",
    hora: "",
    data: "",
    dniUsuari: "",
    codiLocalitzacio: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/reserva/${id}`)
      .then((response) => response.json())
      .then((json) => setReservaData(json));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/reserva/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/reserva");
        } else {
          alert("Error al eliminar la reserva");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar reserva {id}</h1>
      <div>
        <p>Estàs a punt d'eliminar la següent reserva:</p>
        <ul>
          <li>Codi: {RservaData.codi}</li>
          <li>Hora: {ReservaData.hora}</li>
          <li>Data: {ReservaData.data}</li>
          <li>Dni Usuari: {ReservaData.dniUsuari}</li>
          <li>Codi Localitzacio: {ReservaData.codiLocalitzacio}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default ReservaDelete;
