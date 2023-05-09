import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioName } from "../../js/comprobacioCampsMaterials";

function CentreUpdate(props) {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [centreData, setCentreData] = useState({
    nom: "",
  });

  const [comprobacio, setComprobacio] = useState({
    comprobacioNom: false,
  });

  const [errorsForm, setErrorsForm] = useState({
    errorNom: '',
  });

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/centre/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => setCentreData(json.centre));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...centreData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioName(centreData.nom, {handleComprobacio, handleErrors})
    if (!Object.values(comprobacio).includes(false)) {
      fetch(`http://localhost:5000/centre/APIupdate/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
        },
        body: JSON.stringify(centreData),
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          navigate(-1);
        } else {
          setErrorBack(json.error);
        }
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
					<h5 className="card-title">Actualitzar centre: {centreData.nom}</h5>
				</div>
        <div className="card-body">
          {(errorBack !== '' && (<DivError error={errorBack}  />) )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Nom">Nom:</label>
              <input
                id="nom"
                name="nom"
                className="form-control"
                value={centreData.nom}
                onChange={handleChange}
                onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
                required
              />
              {errorsForm.errorName && (<p className="error-message">{errorsForm.errorName}</p>)}
            </div>
            <button type="submit" className="btn btn-primary">Actualitzar</button>
          </form>
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

export default CentreUpdate;
