import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryUpdate(props) {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    codi: "",
    nom: "",
  });

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/categories/APIshow/${id}`)
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
    fetch(`http://localhost:5000/categories/APIupdate/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({categoryData}),
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
      <h1>Actualitzant categoria {categoryData.nom}</h1>
      <form onSubmit={handleSubmit}>
        {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

        <div>
          <label htmlFor="codi">Codi:</label>
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
          <label htmlFor="Nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            className="form-control"
            value={categoryData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualitzar</button>
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

export default CategoryUpdate;
