import { useState } from "react";

function ReservaCreate(props) {
  const [ReservaData, setReservaData] = useState({
    codi: "",
    hora: "",
    data: "",
    dniUsuari: "",
    codiLocalitzacio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservaData({ ...ReservaData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/reserva/create", {
      method: "POST",
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
          alert("Error al crear la reserva");
        }
      });
  };

  return (
    <div>
      <h1>Crear nova reserva</h1>
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
          <div>
            <label htmlFor="hora">Hora:</label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={ReservaData.hora}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="data">Data:</label>
            <input
              type="date"
              id="data"
              name="data"
              value={ReservaData.data}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
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
        </div>
        <div>
          <div>
            <label htmlFor="codiLocalitzacio">Codi Localitzacio:</label>
            <input
              id="codiLocalitzacio"
              name="codiLocalitzacio"
              value={ReservaData.codiLocalitzacio}
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

export default ReservaCreate;