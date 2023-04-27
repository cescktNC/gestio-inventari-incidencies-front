import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ComentariCreate(){
    const {id} = useParams();
    const [comentari, setComentari] = useState({
        descripcio: '',
        codiUsuari: window.localStorage.getItem('id'),
        codiIncidencia: id
    });

    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:5000/comentari/comment/create/"+id, {
            method: "POST",
            body: JSON.stringify({ comentari }),
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
              },
        })
        .then((response) => response.json())
        .then((json) => {
            
            if(json.error) setErrorBack(json.error);

            if(json.errors) setErrorsBack(json.errors);

            if (json.ok) navigate(`/home/comentari/list/` + id);
            
        });

    }

    console.log(comentari)

    const handleChange = input => {
        setComentari({ ...comentari, [input.name]: input.value });
    };

    return(
        <main>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">Nou Comentari</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivMessage error={errorBack}  />) )}

                        <InputComentari 
                            comentari={comentari.descripcio} 
                            handleChange={handleChange} 
                        />

                        <button type="submit" className="btn btn-primary">Crea</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

function DivMessage({error}){
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

function InputComentari({comentari, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="descripcio">Comentari</label>
            <input 
                type="text" 
                name="descripcio" 
                className="form-control"
                value={comentari}
                onChange={(e) => handleChange(e.target)}
            />
        </div>
    )
}

export default ComentariCreate;