import { useState } from "react";

function SubCategoryCreate(props) {
  const [subcategoryData, setsubCategoryData] = useState({
    nom: "",
    codi: "",
    codiCategoria:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsubCategoryData({ ...subcategoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/subcategories/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subcategoryData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          props.history.push("/home/subcategories");
        } else {
          alert("Error al crear la subcategoría");
        }
      });
  };

  return (
    <div>
      <h1>Crear nova subcategoria</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Codi:</label>
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
          <div>
            <label htmlFor="nom">Nom:</label>
            <input
              id="nom"
              name="nom"
              value={subcategoryData.nom}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="codiCategoria">codiCtegoria:</label>
            <input
              id="codiCategoria"
              name="codiCategoria"
              value={subcategoryData.codiCategoria}
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

export default SubCategoryCreate;