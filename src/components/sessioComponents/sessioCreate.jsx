import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SessioCreate(props) {
  const [SessioData, setSessioData] = useState({
    nom: "",
    codi: "",
    codiReserva: "",
    
  });

  const navigate = useNavigate();

  const [reserves, setReserves] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sessio/APIcreate",{
      method: "GET",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {  
      setReserves(json.reserves);
    });
}, []);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setSessioData({ ...SessioData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/sessio/APIcreate", {
      method: "POST",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
    },
      body: JSON.stringify({SessioData}),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.ok) {
          navigate(-1);
        } else {
          alert("Error al crear la sessio");
        }
      });
  };
  // console.log(SessioData);
  return (
    <main>
      <div className="form-container">
        <div className="image-container">
          <img src="../../images/new.png" alt="" />
        </div>
        <div className="form-group">
          <h3 className=""><strong>New Sessio</strong></h3>
          <form onSubmit={handleSubmit}>
            <InputCodi codi={SessioData.codi} handleChange={handleChange} />
            <InputNom nom={SessioData.nom} handleChange={handleChange} />
            <InputReserva reserves={reserves} codiReserva={SessioData.codiReserva} handleChange={handleChange} />
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </div>
      </div>
    </main>
  );
}

function InputCodi({codi, handleChange}){
  return(
    <div className="form-group">
      <label htmlFor="codi">Codi:</label>
      <input
        className="form-control"
        type="text"
        id="codi"
        name="codi"
        value={codi}
        onChange={handleChange}
        required
      />
    </div>
  )
}

function InputNom({nom, handleChange}){
  return(
    <div className="form-group">
      <label htmlFor="nom">Nom:</label>
      <input
        className="form-control"
        id="nom"
        name="nom"
        value={nom}
        onChange={handleChange}
        required
      />
    </div>
  )
}

function InputReserva({reserves, handleChange, codiReserva}){
  return(
    <div className="form-group">
      <label htmlFor="codiReserva">Codi Reserva:</label>
      <select 
        type="text" 
        id="codiReserva" 
        value={codiReserva} 
        name="codiReserva" 
        className="form-control" 
        onClick={handleChange}
      >
        {reserves.map((reserva, index) => {
          const horaInici = new Date(reserva.horaInici);
          const horaFi = new Date(reserva.horaFi);
          return (
            <option value={`${reserva._id}`} key={reserva.codi}>
              {`Codi ${reserva.codi} - 
              Dia ${horaInici.getDate()}/
              ${horaInici.getMonth() + 1}/
              ${horaInici.getFullYear()} 
              de ${horaInici.getHours()} h 
              a ${horaFi.getHours()} h`}
            </option>
          );
        })}
      </select>
    </div>
  )
}



export default SessioCreate;