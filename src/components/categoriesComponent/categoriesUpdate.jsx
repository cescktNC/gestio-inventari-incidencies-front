import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioName } from "../../js/comprobacioCampsMaterials";

function CategoryUpdate() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
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
    fetch(`http://localhost:5000/categories/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setCategoryData(json.categoria)
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobacioName(categoryData.nom, {handleComprobacio, handleErrors})
    if (!Object.values(comprobacio).includes(false)) {
      fetch(`http://localhost:5000/categories/APIupdate/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
        },
        body: JSON.stringify({categoryData}),
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate("/home/categories/list");

        if(json.error) setErrorBack(json.error);

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
					<h5 className="card-title">Actualitzar categotia: {categoryData.nom}</h5>
				</div>
        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}
                <div className="form-group">
                  <label htmlFor="Nom">Nom:</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="form-control"
                    value={categoryData.nom}
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
        </div>
      </div>
    </main> 
  );
}


function DivMessage({message}){
  return(
      <div className="alert alert-danger">
          <p className="text-danger">{message}</p>
      </div>
  )
}

export default CategoryUpdate;
