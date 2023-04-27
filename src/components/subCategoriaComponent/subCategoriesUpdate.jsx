import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SubCategoryUpdate(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState([])
	const [errorBack, setErrorBack] = useState('');


  const [subcategoryData, setsubCategoryData] = useState({
    nom: "",
    codi: "",
    codiCategoria: ""
  });

  useEffect(() => {

    fetch(`http://localhost:5000/categories/APIAlllist`, {
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.list) setCategoryData(json.list,);
      if (json.error) setErrorBack(json.error);

    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/subCategories/APIshow/` + id, {
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => setsubCategoryData(prevState => ({
          ...prevState,
          ...json.subCategoria,
          codi: json.subCategoria.codi.slice(0, json.subCategoria.codi.indexOf('/'))
        })
      ));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsubCategoryData({ ...subcategoryData, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/subCategories/APIupdate/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({subcategoryData}),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.ok) navigate('/home/subcategories/list');
        if (json.error) setErrorBack(json.error);
      });
  };

  return (
    <div>
      <h1>Actualitzant subcategoria {subcategoryData.nom}</h1>
      <form onSubmit={handleSubmit}>
      {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}
        <div>
          <label htmlFor="Nom">Nom:</label>
          <input
            id="nom"
            name="nom"
            className="form-control"
            value={subcategoryData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="codiCategoria">Categoria:</label>
          <select
            id="codiCategoria"
            name="codiCategoria"
            className="form-control"
            value={subcategoryData.codiCategoria}
            onChange={handleChange}
            required
          >
            <SelectCategory categoryData={categoryData} />
          </select>
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

function SelectCategory({categoryData}){
  return categoryData.map((categoryData)=>(
    <option key={categoryData._id} value={`${categoryData._id}`}> {categoryData.nom} </option>
  ));
}

export default SubCategoryUpdate;
