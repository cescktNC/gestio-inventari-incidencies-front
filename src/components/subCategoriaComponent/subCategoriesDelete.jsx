import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SubCategoryDelete(props) {
  const { id } = useParams();
  

  const [subcategoryData, setsubCategoryData] = useState({
    nom: "",
    codi: "",
    codiCategoria: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/subcategories/${id}`)
      .then((response) => response.json())
      .then((json) => setsubCategoryData(json));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/subcategories/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/subcategories");
        } else {
          alert("Error al eliminar la subcategoría");
        }
      });
  };

  return (
    <div>
      <h1>Eliminar subcategoría {id}</h1>
      <div>
        <p>Estàs a punt d'eliminar la seguent categoria:</p>
        <ul>
          <li>Nom: {subcategoryData.nom}</li>
          <li>Codi: {subcategoryData.codi}</li>
          <li>CodiCategoria: {subcategoryData.codiCategoria}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
}

export default SubCategoryDelete;
