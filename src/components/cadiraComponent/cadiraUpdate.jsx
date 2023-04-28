import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioFila, ComprobacioNumero} from "../../js/comprobacioCampsCadira";

function CadiraUpdate(props) {
  const { id } = useParams();
  
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

	const [errorBack, setErrorBack] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCadiraData({ ...CadiraData, [name]: value });
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

  useEffect(() => {
    fetch(`http://localhost:5000/cadira/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if(json.cadira) setCadiraData(json.cadira);
        if(json.error) setErrorBack(json.error)
      });
  }, [id]);

  console.log(CadiraData)

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioFila(CadiraData.fila, {handleComprobacio, handleErrors});
    ComprobacioNumero(CadiraData.numero, {handleComprobacio, handleErrors});
    fetch(`http://localhost:5000/cadira/APIupdate/${id}`, {
      method: "PUT",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
      body: JSON.stringify({CadiraData}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          navigate("/home/cadira/list");
        } else {
          setErrorBack(json.error);
        }
      });
  };

  return (
    <main>
     <div className="card mt-4">
        <div className="card-header">
					<h5 className="card-title">Actualitzant cadira, fila: {CadiraData.fila}, numero: {CadiraData.numero}</h5>
				</div>
        <div className="row">
          <div className="col-md-12">
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

                <button type="submit" className="btn btn-primary">Actualitzar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function DivError({error}){
  return(
    <div className="alert alert-danger">
      <p className="text-danger">{error}</p>
    </div>
  )
}

export default CadiraUpdate;
