import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioCodi } from "../../js/comprobacioCampsReserva";

function ReservaUpdate(props) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [comprobacio, setComprobacio] = useState({
    comprobacioCodi: false,
  });

  const [ReservaData, setReservaData] = useState({
    codi: "",
    horainici: "",
    horafi: "",
  });

  const [errorsForm, setErrorsForm] = useState({
    errorCodi: '',
  });

  const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/reserva/APIupdate/${id}`, {
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
console.log(ReservaData)
  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioCodi(ReservaData.codi, { handleComprobacio, handleErrors })
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
                <div className="form-group">
                  <label htmlFor="codi">Codi:</label>
                  <input
                    type="text"
                    id="codi"
                    name="codi"
                    className="form-control"
                    value={ReservaData.codi}
                    onChange={handleChange}
                    onBlur={(e) =>
                      ComprobacioCodi(e.target.value, {
                        handleComprobacio,
                        handleErrors,
                      })
                    }
                    required
                  />
                  {errorsForm.errorCodi && (
                    <p className="error-message">{errorsForm.errorCodi}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="horainici">Hora:</label>
                  <input
                    type="date"
                    id="horainici"
                    name="horainici"
                    className="form-control"
                    value={ReservaData.horainici}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="horafi">Hora Fi:</label>
                  <input
                    type="date"
                    id="horafi"
                    name="horafi"
                    className="form-control"
                    value={ReservaData.horafi}
                    onChange={handleChange}
                    required
                  />
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

export default ReservaUpdate;

