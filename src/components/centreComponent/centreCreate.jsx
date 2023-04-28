import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioName } from "../../js/comprobacioCampsMaterials";

function CentreCreate(props) {
  const navigate = useNavigate();
  const [CentreData, setCentreData] = useState({
    nom: "",
  });

  const [comprobacio, setComprobacio] = useState({
    comprobacioNom: false,
  });

  const [errorsForm, setErrorsForm] = useState({
    errorNom: '',
  });

	const [errorBack, setErrorBack] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...CentreData, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioName(CentreData.nom, {handleComprobacio, handleErrors})
    if (!Object.values(comprobacio).includes(false)) {
      fetch("http://localhost:5000/centre/APIcreate", {
        method: "POST",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
        },
        body: JSON.stringify(CentreData),
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          navigate("/home/centre/list");
        } else {
          setErrorBack(json.error);
        }
      });
    }
  };

  return (
    <main>
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="card-title">Nou Centre</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {(errorBack !== '' && (<DivError error={errorBack}  />) )}
            <div className="form-group">
              <label htmlFor="nom">Nom:</label>
              <input
                id="nom"
                name="nom"
                className="form-control"
                value={CentreData.nom}
                onChange={handleChange}
                onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
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

export default CentreCreate;