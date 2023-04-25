import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioCodi } from "../../js/comprobacioCampsMaterials";

function ExemplarCreate(){
    const navigate = useNavigate();
    const [material, setMaterial] = useState([]);
    const [localitzacio, setLocalitzacio] = useState([]);
    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const [exemplar, setExemplar] = useState({
        codi:'',
        codiMaterial: '',
        codiLocalitzacio : ''
    });
    
    const [comprobacio, setComprobacio] = useState({
        comprobacioCodi: false,
    });

    const [errorsForm, setErrorsForm] = useState({
        errorCodi: '',
    });

    useEffect(()=>{
        fetch("http://localhost:5000/materials/material/allList", {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.list) {
                setMaterial(json.list);
                setExemplar(preState =>(
                    { ...preState, codiMaterial: json.list[0]._id}
                ))
            }
            
            if(json.error) setErrorBack(json.error)
        });
    
    }, []);

    useEffect(()=>{
        fetch("http://localhost:5000/localitzacio/APIAllList", {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.list) {
                setLocalitzacio(json.list);
                setExemplar(preState =>(
                    { ...preState, codiLocalitzacio: json.list[0]._id}
                ))
            }
            
            if(json.error) setErrorBack(json.error)
        });
    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!Object.values(comprobacio).includes(false)) {
            fetch("http://localhost:5000/exemplar/APICreate", {
                method: "POST",
                body: JSON.stringify({exemplar}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((json) => {
                
                if(json.error !== undefined) setErrorBack(json.error);
				
				if(json.errors !== undefined) setErrorsBack(json.errors);

				if (json.ok) navigate(`/home/exemplar/list`);
				
            });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setExemplar({ ...exemplar, [name]: value });
        
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
                    <h5 className="card-title">Nou Exemplar</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivError error={errorBack}  />) )}

                        <InputCodi 
                            codiExemplar={exemplar.codi} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorCodi && (<p className="error-message">{errorsForm.errorCodi}</p>)}

                        <InputSelectMaterial
                            codiMaterialExemplar={exemplar.codiMaterial} 
                            materials={material}
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />

                        <InputSelectLocalitzacio
                            codiLocalitzacioExemplar={exemplar.codiLocalitzacio} 
                            localitzacions={localitzacio} 
                            handleChange={handleChange} 
                            handleErrors={handleErrors}
                        />

                        <button type="submit" className="btn btn-primary">Crea</button>
                    </form>
                </div>
            </div>
        </main>
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

function InputCodi({codiExemplar, handleChange, handleComprobacio, handleErrors}){

    return(
        <div className="form-group">
            <label form="codi">Codi</label>
            <input
                type="text"
                name="codi"
                value={codiExemplar}
                onChange={handleChange}
                onBlur={(e) => ComprobacioCodi(e.target.value, {handleComprobacio, handleErrors})}
                className="form-control"
                required
            />
        </div>
    )
}

function InputSelectMaterial({codiMaterialExemplar, materials, handleChange}){

    return(

        <div className="form-group">
            <label form="codiMaterial">Material</label>
            <select       
                name="codiMaterial"
                id="codiMaterial"
                value={codiMaterialExemplar}
                onChange={handleChange} 
                className="form-control"
            >
                {
                    materials.map((material, index) =>(
                        <option key={index} value={`${material._id}`}>{material.nom}</option>
                    ))
                }
            </select>
        </div>
        
    )
}

function InputSelectLocalitzacio({codiLocalitzacioExemplar, localitzacions, handleChange}){

    return(

        <div className="form-group">
            <label form="codiLocalitzacio">Localitzacio</label>
            <select       
                name="codiLocalitzacio"
                id="codiLocalitzacio"
                value={codiLocalitzacioExemplar}
                onChange={handleChange} 
                className="form-control"
            >
                {
                    localitzacions.map((localitzacio, index) =>(
                        <option key={index} value={`${localitzacio._id}`}>{localitzacio.nom}</option>
                    ))
                }
            </select>
        </div>
        
    )
}



export default ExemplarCreate;