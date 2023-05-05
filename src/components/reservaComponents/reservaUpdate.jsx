import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioCodi, ComprobacioHora, ComprobacioData } from "../../js/comprobacioCampsReserva";
import { func } from "prop-types";

function ReservaUpdate(props) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [comprobacio, setComprobacio] = useState({
    comprobacioCodi: false,
    comprobacioData: false,
    comprobacioHora: false
  });

  const [ReservaData, setReservaData] = useState({
    codi: "",
    horaInici: "",
    horaFi: "",
  });

  const [errorsForm, setErrorsForm] = useState({
    errorCodi: '',
    errorHora: '',
    errorData: ''
  });

  const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/reserva/APIshow/${id}`, {
      headers: {
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => setReservaData(json.reserva));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservaData({ ...ReservaData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioCodi(ReservaData.codi, { handleComprobacio, handleErrors })
    ComprobacioData(ReservaData.data, { handleComprobacio, handleErrors })
    ComprobacioHora(ReservaData.hora, { handleComprobacio, handleErrors })
    if (!Object.values(comprobacio).includes(false)) {
      fetch(`http://localhost:5000/reserva/APIupdate/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
        },
        body: JSON.stringify({ReservaData}),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.ok) navigate(-1);

          if (json.error) setErrorBack(json.error);

        });
    }
  };

  const handleComprobacio = (camp, valor) => {
    setComprobacio({
      ...comprobacio,
      [camp]: valor
    });
  };

  const handleErrors = (camp, valor) => {
    setErrorsForm({
      ...errorsForm,
      [camp]: valor
    });
  };


  return (
    <main>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title">Actualizar reserva: {ReservaData.codi}</h5>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {errorBack !== '' && <DivError error={errorBack} />}
                <InputCodi 
                  codi={ReservaData.codi} 
                  handleChange={handleChange} 
                  handleComprobacio={handleComprobacio}
                  handleErrors={handleErrors}
                  ComprobacioCodi={ComprobacioCodi}
                />
                  {errorsForm.errorCodi && (
                    <p className="error-message">{errorsForm.errorCodi}</p>
                  )}
                  <InputHoraInici 
                    horaInici={ReservaData.horaInici}
                    handleChange={handleChange}
                  />
                <div className="form-group">
                  <label htmlFor="hora">Hora:</label>
                  <input
                    type="time"
                    id="hora"
                    name="hora"
                    min="08:00"
                    max="22:00"
                    step="1800"
                    className="form-control"
                    value={ReservaData.hora}
                    onChange={handleChange}
                    onBlur={(e) =>
                      ComprobacioHora(e.target.value, {
                        handleComprobacio,
                        handleErrors,
                      })
                    }
                    required
                  />
                  {errorsForm.errorHora && (
                    <p className="error-message">{errorsForm.errorHora}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="data">Data:</label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    className="form-control"
                    value={ReservaData.data}
                    onChange={handleChange}
                    onBlur={(e) =>
                      ComprobacioData(e.target.value, {
                        handleComprobacio,
                        handleErrors,
                      })
                    }
                    required
                  />
                  {errorsForm.errorData && (
                    <p className="error-message">{errorsForm.errorData}</p>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function DivError({ error }) {
  return (
    <div className="alert alert-danger">
      <p className="text-danger">{error}</p>
    </div>
  )
}

function InputCodi ({codi, ComprobacioCodi, handleChange, handleComprobacio, handleErrors}){
  return(
    <div className="form-group">
      <label htmlFor="codi">Codi:</label>
      <input
        type="text"
        id="codi"
        name="codi"
        className="form-control"
        value={codi}
        onChange={handleChange}
        onBlur={(e) =>
          ComprobacioCodi(e.target.value, {
            handleComprobacio,
            handleErrors,
          })
        }
        required
      />
    </div>
  )
}

function InputHoraInici({horaInici, handleChange}) {
  return(
    <div class="form-group">
      <label for="horaInici">Hora Inici</label>
      <input name="horaInici" 
        list="llista-hores-inici" 
        class="form-control" 
        onChange={handleChange} 
      />
      <datalist id="llista-hores-inici">
          <option value="08:00 h" label="De les vuit en punt del matí"></option>
          <option value="09:00 h" label="De les nou en punt del matí"></option>
          <option value="10:00 h" label="De les deu en punt del matí"></option>
          <option value="11:30 h" label="De dos quarts de dotze del matí"></option>
          <option value="12:30 h" label="De dos quarts d'una del matí"></option>
          <option value="13:30 h" label="De dos quarts de dos de la tarda"></option>
          <option value="14:30 h" label="De dos quarts de tres de la tarda"></option>
          <option value="15:00 h" label="De les tres en punt de la tarda"></option>
          <option value="16:00 h" label="De les quatre en punt de la tarda"></option>
          <option value="17:00 h" label="De les cinc en punt de la tarda"></option>
          <option value="18:00 h" label="De les sis en punt de la tarda"></option>
          <option value="19:00 h" label="De les set en punt de la tarda"></option>
          <option value="20:00 h" label="De les vuit en punt de la nit"></option>
          <option value="21:00 h" label="De les nou en punt de la nit"></option>
      </datalist>
  </div>
  )
}

export default ReservaUpdate;

