import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoryDelete(props) {
  const { id } = useParams();
  

  const [categoryData, setCategoryData] = useState({
    nom: "",
    codi: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/categories/${id}`)
      .then((response) => response.json())
      .then((json) => setCategoryData(json));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/categories/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/categories");
        } else {
          alert("Error al eliminar la categoría");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar categoría {id}</h1>
      <div>
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

export default CategoryDelete;
