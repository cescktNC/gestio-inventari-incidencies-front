import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioName, ComprobacioCodi } from "../../js/comprobacioCampsSessio";

function SessioUpdate(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comprobacio, setComprobacio] = useState({
    comprobacioNom: false,
    comprobacioCodi: false
  });
  const [errorsForm, setErrorsForm] = useState({
    errorNom: '',
    errorCodi: ''
  });

  const [SessioData,setSessioData] = useState({
    nom: "",
    codi: "",
  });
	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/sessio/APIupdate/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      setSessioData(json.sessio)
    });
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessioData({ ...SessioData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioName(SessioData.nom, {handleComprobacio, handleErrors})
    ComprobacioCodi(SessioData.codi, {handleComprobacio, handleErrors})
    fetch(`http://localhost:5000/sessio/update/${id}`, {
      method: "PUT",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
      body: JSON.stringify({SessioData}),
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.ok) navigate(-1);

      if(json.error) setErrorBack(json.error);

    });
  }

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
        <h5 className="card-title">Actualitzant sessio {SessioData.nom}</h5>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              {(errorBack !== '' && (<DivError error={errorBack}  />) )}
                <div className="form-group">
                  <label htmlFor="Nom">Nom:</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="form-control"
                    value={SessioData.nom}
                    onChange={handleChange}
                    onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
                    required
                  />
                  {errorsForm.errorNom && (<p className="error-error">{errorsForm.errorNom}</p>)}
                  </div>
                  <div className="form-group">
                  <label htmlFor="codi">Codi:</label>
                  <input
                    type="text"
                    id="codi"
                    name="codi"
                    className="form-control"
                    value={SessioData.codi}
                    onChange={handleChange}
                    onBlur={(e) => ComprobacioCodi(e.target.value, {handleComprobacio, handleErrors})}
                    required
                  />
                  {errorsForm.errorCodi && (<p className="error-error">{errorsForm.errorCodi}</p>)}
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


export default SessioUpdate;
