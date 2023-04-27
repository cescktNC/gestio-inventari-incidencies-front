import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReservaUpdate(props) {
  const { id } = useParams();
  

  const [ReservaData,setReservaData] = useState({
    codi: "",
    hora: "",
    data: "",
    dniUsuari:"",
    codiLocalitzacio:""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/reserva/update/${id}`,{
      headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => setReservaData(json));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservaData({ ...ReservaData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/reserva/update/${id}`, {
      method: "PUT",
      headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
      },
      body: JSON.stringify(ReservaData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/reserva");
        } else {
          alert("Error al actualizar la reserva");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant reserva {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={ReservaData.codi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hora">Hora:</label>
          <input
            id="hora"
            name="hora"
            value={ReservaData.hora}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="data">Data:</label>
          <input
            id="data"
            name="data"
            value={ReservaData.data}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dniUsuari">Dni Usuari:</label>
          <input
            id="dniUsuari"
            name="dniUsuari"
            value={ReservaData.dniUsuari}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="codilocalitzacio">Codi Localitzacio:</label>
          <input
            id="codilocalitzacio"
            name="codilocalitzacio"
            value={ReservaData.codiLocalitzacio}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default ReservaUpdate;
