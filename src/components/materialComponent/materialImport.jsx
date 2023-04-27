import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioFitxer } from '../../js/comprobacioCampsMaterials'

function MaterialImport(){
    const navigate = useNavigate();

    const [material, setMaterial]=useState({
        fitxer: '',
    });

    const [comprobacio, setComprobacio] = useState({
        comprobacioFitxer: false,
    });

    const [errorsForm, setErrorsForm] = useState({
        errorFitxer: '',
    });

    const [errorsBack, setErrorsBack] = useState([]);
    const [errorBack, setErrorBack] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fitxer', material.fitxer);        

        if (!Object.values(comprobacio).includes(false)) {
            fetch("http://localhost:5000/materials/material/import", {
                method: "POST",
                body: formData,
                headers: { 
                    "Authorization": "Bearer " + window.localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    "Accept-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if(json.error !== undefined) setErrorBack(json.error);
				
				if(json.errors !== undefined) setErrorsBack(json.errors);

				if (json.ok) navigate(`/home/material/list`);
				
            });
        }
    }

    console.log(material)

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
        <div className="card mt-4">
			<div className="card-header">
				<h5 className="card-title">Importar materials</h5>
			</div>
			<div className="card-body">

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="fitxer">Fitxer:</label>
						<input 
                            type="file" 
                            name="fitxer" 
                            accept="application/json, text/csv" 
                            className="form-control" 
                            onChange={(e) => setMaterial({...material, fitxer: e.target.files[0]})}
                            onBlur={(e)=>ComprobacioFitxer(e.target.files[0], {handleComprobacio, handleErrors})}
                        />
                        {errorsForm.errorFitxer && (<p className="error-message">{errorsForm.errorFitxer}</p>)}
					</div>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>

                {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                {(errorBack !== '' && (<DivError error={errorBack}  />) )}

			</div>
        </div>

    )
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

export default MaterialImport;