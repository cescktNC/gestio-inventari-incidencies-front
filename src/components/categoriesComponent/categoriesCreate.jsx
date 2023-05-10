import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioName } from "../../js/comprobacioCampsMaterials";

function CategoryCreate() {
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
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
    
    ComprobacioName(categoryData.nom, {handleComprobacio, handleErrors});

    if (!Object.values(comprobacio).includes(false)) {
      fetch("http://localhost:5000/categories/APIcreate", {
        method: "POST",
        headers: { 
          "Authorization": "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
          "Accept-Type": "application/json"
        },
        body: JSON.stringify({categoryData: categoryData}),
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate( -1);

        if(json.error) setErrorBack(json.error);
        
      });
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="card-title">Nova Categoria</h5>
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
              value={categoryData.nom}
              onChange={handleChange}
              onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
              required
            />
            {errorsForm.errorName && (<p className="error-error">{errorsForm.errorName}</p>)}
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

export default CategoryCreate;