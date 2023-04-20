import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryCreate(props) {
  const [categoryData, setCategoryData] = useState({
    nom: "",
    codi: "",
  });

	const [errorBack, setErrorBack] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/categories/APIcreate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({categoryData: categoryData}),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.ok) navigate("/home/categories/list");

        if(json.error) setErrorBack(json.error);
        
      });
  };

  return (
    <div>
      <h1>Crear nueva categoría</h1>
      <form onSubmit={handleSubmit}>
      {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

        <div>
          <label htmlFor="nom">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            className="form-control"
            value={categoryData.codi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="nom">Nom:</label>
            <input
              id="nom"
              name="nom"
              className="form-control"
              value={categoryData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

function DivMessage({message}){
  return(
      <div className="alert alert-danger">
          <p className="text-danger">{message}</p>
      </div>
  )
}

export default CategoryCreate;