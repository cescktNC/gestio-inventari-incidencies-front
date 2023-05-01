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

    const [comprobacio, setComprobacio] = useState({
        comprobacioDescripcio: false,
    });
    
    const [errorsForm, setErrorsForm] = useState({
        errorDescripcio: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        ComprobacioDescripcio(comentari.descripcio, {handleComprobacio, handleErrors})
        if (!Object.values(comprobacio).includes(false)) {
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

    }

    const handleChange = input => {
        setComentari({ ...comentari, [input.name]: input.value });
    };

    const handleComprobacio = (camp, valor) => {
        setComprobacio({
            ...comprobacio,
            [camp]: valor
        });
    };
    
    const handleErrors = (camp, valor) => {
        setErrorsForm({
            ...errorsForm,
            [camp]: valor
        });
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
                            handleComprobacio={handleComprobacio}
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDescripcio && (<p className="error-message">{errorsForm.errorDescripcio}</p>)}
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

function InputComentari({comentari, handleChange, handleComprobacio, handleErrors}){
    return(
        <div className="form-group">
            <label htmlFor="descripcio">Comentari</label>
            <input 
                type="text" 
                name="descripcio" 
                className="form-control"
                value={comentari}
                onChange={(e) => handleChange(e.target)}
				onBlur={(e) => ComprobacioDescripcio(e.target.value, {handleComprobacio, handleErrors})}
                />
        </div>
    )
}

function ComprobacioDescripcio(descripcio, { handleComprobacio, handleErrors}) {

	if (descripcio === "") {
		handleErrors("errorDescripcio", "El camp Comentari es obigatori");
		handleComprobacio('comprobacioDescripcio', false);
	}
	else handleComprobacio('comprobacioDescripcio', true) ;
	
}

export default ComentariCreate;