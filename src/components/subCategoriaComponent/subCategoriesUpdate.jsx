import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SubCategoryUpdate(props) {
  const { id } = useParams();
  

  const [subcategoryData, setsubCategoryData] = useState({
    nom: "",
    codi: "",
    codiCategoria: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/categories/${id}`)
      .then((response) => response.json())
      .then((json) => setsubCategoryData(json));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsubCategoryData({ ...subcategoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/categories/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subcategoryData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/subcategories");
        } else {
          alert("Error al actualizar la subcategoría");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant subcategoria {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={subcategoryData.codi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Nom">Nom:</label>
          <input
            id="nom"
            name="nom"
            value={subcategoryData.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="codiCategoria">CodiCategoria:</label>
          <input
            id="codiCategoria"
            name="CodiCategoria"
            value={subcategoryData.codiCategoria}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualitzar</button>
      </form>
    </div>
  );
}

export default SubCategoryUpdate;
