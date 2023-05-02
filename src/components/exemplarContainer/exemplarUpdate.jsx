import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { nomesAdmin, nomesDirector } from "../../js/comprobacioCarrecs";

function ExemplarUpdate(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [exemplar, setExemplar] = useState({
        demarca: false,
        codiMaterial: '',
        codiLocalitzacio : ''
    });

    const [material, setMaterial] = useState([]);
    const [localitzacio, setLocalitzacio] = useState([]);
    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    useEffect(()=>{
        fetch("http://localhost:5000/exemplar/APIshow/" + id,{
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.exemplar) setExemplar(preState => ({
                ...preState,
                codi: json.exemplar.codi.slice(0, json.exemplar.codi.indexOf('/')),
                codiMaterial: json.exemplar.codiMaterial._id,
                codiLocalitzacio: json.exemplar.codiLocalitzacio._id
            }))
            
            if(json.error) setErrorBack(json.error)
        });
    }, [id]);

    useEffect(()=>{
        fetch("http://localhost:5000/materials/APIallList", {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
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
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
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

        fetch("http://localhost:5000/exemplar/APIUpdate/" + id, {
            method: "PUT",
            body: JSON.stringify({ exemplar }),
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            
            if(json.error !== undefined) setErrorBack(json.error);
            
            if(json.errors !== undefined) setErrorsBack(json.errors);

            if (json.ok) navigate(-1);
            
        });
        
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

                    <InputSelectMaterial
                        codiMaterialExemplar={exemplar.codiMaterial} 
                        materials={material}
                        handleChange={handleChange} 
                    />

                    <InputSelectLocalitzacio
                        codiLocalitzacioExemplar={exemplar.codiLocalitzacio} 
                        localitzacions={localitzacio} 
                        handleChange={handleChange} 
                    />

                    {(nomesAdmin() || nomesDirector()) && (
                        <InputDemarca
                            demarcaExemplar={exemplar.demarca}
                            localitzacions={localitzacio} 
                            handleChange={handleChange} 
                        />
                    )}

                    <button type="submit" className="btn btn-primary">Guardar</button>
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