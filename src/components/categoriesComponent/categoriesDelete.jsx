import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryDelete() {
  const { id } = useParams();

  const navigate = useNavigate();
  

  const [categoryData, setCategoryData] = useState({
    nom: "",
    codi: "",
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

  const handleDelete = () => {
    fetch(`http://localhost:5000/categories/APIdelete/${id}`, {
      method: "DELETE",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate(-1);

        if(json.error) setErrorBack(json.error);
        
      });
  };

  return (
    <div>
      <h1>Eliminar categoría {categoryData.nom}</h1>
      <div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <p>Estàs a punt d'eliminar la seguent categoria:</p>
        <ul>
          <li>Nom: {categoryData.nom}</li>
          <li>Codi: {categoryData.codi}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button className="btn btn-primary" onClick={handleDelete}>Eliminar</button>
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

export default CategoryDelete;
