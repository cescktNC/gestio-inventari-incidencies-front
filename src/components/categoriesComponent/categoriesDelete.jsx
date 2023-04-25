import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CategoryDelete(props) {
  const { id } = useParams();

  const navigate = useNavigate();
  

  const [categoryData, setCategoryData] = useState({
    nom: "",
    codi: "",
  });

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/categories/APIshow/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setCategoryData(json.categoria)
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/categories/APIdelete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) navigate("/home/categories/list");

        if(json.error) setErrorBack(json.error);
        
      });
  };

  return (
    <div>
      <h1>Eliminar categoría {categoryData.nom}</h1>
      <div>
        {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}
        <p>Estàs a punt d'eliminar la seguent categoria:</p>
        <ul>
          <li>Nom: {categoryData.nom}</li>
          <li>Codi: {categoryData.codi}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
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

export default CategoryDelete;
