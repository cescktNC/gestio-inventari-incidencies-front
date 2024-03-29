import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MaterialDelete(props) {
    const { id } = useParams();

    const navigate = useNavigate();

    const [material, setMaterial]=useState({
        codi: '',
        nom: '',
        descripcio: '',
        preuCompra: '',
        anyCompra: '',
        fotografia: '',
        codiSubCategoria: ''
    });

    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/materials/APIshow/" + id, {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.material) {
                setMaterial({
                    ...material, 
                    ...json.material, 
                    anyCompra: json.material.anyCompra.substring(0, 10),
                })
            }
            if(json.error) setErrorBack(json.error);
            if(json.errors) setErrorsBack(json.errors);
        });
    }, [id]);

    const handleDelete = () => {
        fetch(`http://localhost:5000/materials/APidelete/${id}`, {
        method: "DELETE",
        headers: { 
            "Authorization": "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json",
            "Accept-Type": "application/json"
        }
        })
        .then((response) => response.json())
        .then((json) => {
          if (json.ok) {
            navigate(-1);
          } else {
            setErrorBack(json.error);
          }
        });
    };


    return (
        <main>
		<div className="card mt-2">
			<div className="card-body">
      <h5 className="card-title">Eliminar material:  nom: {material.nom}, codi: {material.codi}</h5>
      <div className="alert alert-danger" role="alert">
            <p>Estàs a punt d'eliminar el següent material:</p>
            </div>
            {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

            {(errorBack !== '' && (<DivError error={errorBack}  />) )}
                <ul>
                    <li>Nom: {material.nom}</li>
                    <li>Codi: {material.codi}</li>
                    <li>Descripció: {material.descripcio}</li>
                    <li>preu de compra: {material.preuCompra}</li>
                    <li>Any de compra: {material.anyCompra}</li>
                    <li>
                        Fotografia: <img className="img-fluid mx-auto w-50 h-50" src={'http://localhost:5000/' + material.fotografia} alt="" />
                    </li>
                    <li>Subcategoria: {material.codiSubCategoria.nom}</li>
                </ul>
                <p>Estàs segur d'eliminar-lo?</p>
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
      </div>
    </div>
    </main>
  );
}


function DivError({error}){
  return(
    <div className="alert alert-danger">
      <p className="text-danger">{error}</p>
    </div>
  )
}


function DivArrayErrors({errors}){
    return(
        <ul className="alert alert-danger list-unstyled">
            {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
    )
}

export default MaterialDelete;
