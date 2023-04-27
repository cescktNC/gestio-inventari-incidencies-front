import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SubCategoryCreate(props) {
  const [subcategoryData, setsubCategoryData] = useState({
    nom: "",
    codi: "",
    codiCategoria:""
  });

  const navigate = useNavigate();

  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsubCategoryData({ ...subcategoryData, [name]: value });
  };

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/categories/APIAlllist", {
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.list) setList(json.list);
      if (json.error) setErrorBack(json.error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/subcategories/APIcreate", {
      method: "POST",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
      body: JSON.stringify({subcategoryData}),
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.ok) navigate("/home/subcategories/list");
      if (json.error) setErrorBack(json.error);
    });
  };

  return (
    <div>
      <h1>Crear nova subcategoria</h1>
      <form onSubmit={handleSubmit}>
      {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}
        <div>
          <div>
            <label htmlFor="nom">Nom:</label>
            <input
              id="nom"
              name="nom"
              className="form-control"
              value={subcategoryData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="codiCategoria">Categoria:</label>
            <SelectCategories list={list} handleChange={handleChange} />
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

function SelectCategories({list, handleChange}) {

  return (  
    <select 
      name="codiCategoria" 
      id="codiCategoria" 
      className="form-control" 
      onChange={handleChange}
    >
      {list.map((categoria, index) => <option key={index} value={`${categoria._id}`}>{categoria.nom}</option>)}
    </select>
  )
  
}

export default SubCategoryCreate;