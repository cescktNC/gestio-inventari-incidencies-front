import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoryUpdate(props) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/categories/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/categories");
        } else {
          alert("Error al actualizar la categoría");
        }
      });
  };

  return (
    <div>
      <h1>Actualitzant categoria {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codi">Codi:</label>
          <input
            type="text"
            id="codi"
            name="codi"
            value={categoryData.codi}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Nom">Nom:</label>
          <input
            id="nom"
            name="nom"
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

export default CategoryUpdate;
