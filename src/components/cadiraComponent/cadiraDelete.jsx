import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CadiraDelete(props) {
  const { id } = useParams();

  const navigate = useNavigate();
  

  const [CadiraData, setCadiraData] = useState({
    fila: "",
    numero: "",
  });

	const [errorBack, setErrorBack] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/cadira/APIshow/${id}`,{
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if(json.cadira) setCadiraData(json.cadira);
        if(json.error) setErrorBack(json.error)
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/cadira/APIdelete/${id}`, {
      method: "DELETE",
      headers: { 
        "Authorization": "Bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          navigate(-1);
        } else {
          setErrorBack(json.error)
        }
      });
  };

  return (
    <main>
		<div className="card mt-2">
			<div className="card-body">
				<h5 className="card-title">Eliminar cadira, fila: {CadiraData.fila}, numero: {CadiraData.numero}</h5>
        <div className="alert alert-danger" role="alert">
          Estàs a punt d'eliminar la següent cadira:
				</div>
        {(errorBack !== '' && (<DivError error={errorBack}  />) )}
        <ul>
          <li>Fila: {CadiraData.fila}</li>
          <li>Cadira: {CadiraData.numero}</li>
        </ul>
        <p>Estàs segur d'eliminar-la?</p>
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

export default CadiraDelete;
