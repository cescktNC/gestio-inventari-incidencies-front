import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ComprobacioCodi } from "../../js/comprobacioCampsMaterials";

function ExemplarUpdate(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [exemplar, setExemplar] = useState({
        codi:'',
        demarca: false,
        codiMaterial: '',
        codiLocalitzacio : ''
    });

    const [material, setMaterial] = useState([]);
    const [localitzacio, setLocalitzacio] = useState([]);
    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const [comprobacio, setComprobacio] = useState({
        comprobacioCodi: false,
    });

    const [errorsForm, setErrorsForm] = useState({
        errorCodi: '',
    });

    useEffect(()=>{
        fetch("http://localhost:5000/exemplar/APIshow/" + id,{
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.exemplar) setExemplar({
                ...json.exemplar, 
                codi: json.exemplar.codi.slice(0, exemplar.codi.indexOf('/')),
                codiMaterial: json.exemplar.codiMaterial._id,
                codiLocalitzacio: json.exemplar.codiLocalitzacio._id
            })
            
            if(json.error) setErrorBack(json.error)
        });
    }, []);

    useEffect(()=>{
        fetch("http://localhost:5000/materials/material/allList", {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.list) setMaterial(json.list);
            
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
            if(json.list) setLocalitzacio(json.list);
            
            if(json.error) setErrorBack(json.error)
        });
    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!Object.values(comprobacio).includes(false)) {
            fetch("http://localhost:5000/exemplar/APIUpdate/" + id, {
                method: "PUT",
                body: JSON.stringify({ exemplar }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((json) => {

                console.log(json)
                
                if(json.error !== undefined) setErrorBack(json.error);
				
				if(json.errors !== undefined) setErrorsBack(json.errors);

				if (json.ok) navigate(`/home/exemplar/list`);
				
            });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        if(name === 'demarca') {
            setExemplar(preState =>(
                { ...preState, [name]: !exemplar[name]}
            ));
        }

        else setExemplar({ ...exemplar, [name]: value });
        
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
                <h5 className="card-title">Actualitzar Exemplar</h5>
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

                    <InputDemarca
                        demarcaExemplar={exemplar.demarca}
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

function InputDemarca({demarcaExemplar, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="demarca">Estat</label><br/>
            <input 
                type="checkbox" 
                name="demarca" 
                id="demarca" 
                value={demarcaExemplar} 
                onChange={handleChange} 
                checked={demarcaExemplar} 
            /> Baixa
        </div>
    )
}


export default ExemplarUpdate;