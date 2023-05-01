import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    useEffect(()=>{
        fetch("http://localhost:5000/materials/material/allList", {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if(json.list) {
                setMaterial(json.list);
                setExemplar(preState =>(
                    { ...preState, codiMaterial: json.list[0]._id}
                ));
            }
            
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
            if(json.list) {
                setLocalitzacio(json.list);
                setExemplar(preState =>(
                    { ...preState, codiLocalitzacio: json.list[0]._id}
                ));
            }
            
            if(json.error) setErrorBack(json.error)
        });
    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/exemplar/APICreate", {
            method: "POST",
            body: JSON.stringify({exemplar}),
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then((response) => response.json())
        .then((json) => {
            
            if(json.error !== undefined) setErrorBack(json.error);
            
            if(json.errors !== undefined) setErrorsBack(json.errors);

            if (json.ok) navigate(`/home/exemplar/list`);
            
        });
        
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setExemplar({ ...exemplar, [name]: value });
        
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