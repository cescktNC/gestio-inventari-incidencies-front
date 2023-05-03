import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioFila, ComprobacioNumero} from "../../js/comprobacioCampsCadira";

function CadiraCreate(props) {
  const navigate = useNavigate();
  const [CadiraData, setCadiraData] = useState({
    fila: "",
    numero: "",
  });

  const [comprobacio, setComprobacio] = useState({
    comprobacioFila: false,
    comprobacioNumero: false
  });

  const [errorsForm, setErrorsForm] = useState({
    errorFila: '',
    errorNumero: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCadiraData({ ...CadiraData, [name]: value });
  };

	const [errorBack, setErrorBack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioFila(CadiraData.fila, {handleComprobacio, handleErrors});
    ComprobacioNumero(CadiraData.numero, {handleComprobacio, handleErrors});

    if (!Object.values(comprobacio).includes(false)) {
      fetch("http://localhost:5000/cadira/APIcreate", {
        method: "POST",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
        },
        body: JSON.stringify({CadiraData}),
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate(-1);
        //props.history.push
        if(json.error) setErrorBack(json.error);
      }
        
    )}
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
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="card-title">Nova cadira</h5>
      </div>
      <div className="card-body">
      <form onSubmit={handleSubmit}>
      {(errorBack !== '' && (<DivError error={errorBack}  />) )}

        <div className="form-group">
          <label htmlFor="fila">Fila:</label>
          <input
            type="number"
            id="fila"
            name="fila"
            className="form-control"
            value={CadiraData.fila}
            onChange={handleChange}
            onBlur={(e) => ComprobacioFila(e.target.value, {handleComprobacio, handleErrors})}
            required
          />
          {errorsForm.errorFila && (<p className="error-message">{errorsForm.errorFila}</p>)}
        </div>
        <div className="form-group">
          <label htmlFor="numero">Numero:</label>
          <input
            type="number"
            id="numero"
            name="numero"
            className="form-control"
            value={CadiraData.numero}
            onChange={handleChange}
            onBlur={(e) => ComprobacioNumero(e.target.value, {handleComprobacio, handleErrors})}
            required
          />
          {errorsForm.errorNumero && (<p className="error-message">{errorsForm.errorNumero}</p>)}
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
      </div>
    </div>

  );
}

function DivError({error}){
  return(
      <div className="alert alert-danger">
          <p className="text-danger">{error}</p>
      </div>
  )
}

export default CadiraCreate;