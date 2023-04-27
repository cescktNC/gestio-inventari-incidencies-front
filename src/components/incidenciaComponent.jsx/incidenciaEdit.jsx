import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function IncidenciaEdit(){
    const { id } = useParams();
    const [incidencia, setIncidencia] = useState({
        codiExemplar: '',
        ubicacio: '',
        codiLocalitzacio: '',
        tipologia: '',
        descrcipcio: '',
        prioritat: ''
    });

    const [tipologies, setTipologies] = useState([]);
    const [localitzacions, setLocalitzacions] = useState([]);
    const [prioritats, setPrioritat] = useState([]);

    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        fetch("http://localhost:5000/incidencies/APIShow/" + id, {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.error) setErrorBack(json.error);
            else{
                setIncidencia(json.incidencia);
            }
        });
    
    }, [id]);

    useEffect(() => {

        fetch("http://localhost:5000/incidencies/APIEnum", {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.error) setErrorBack(json.error);
            else{
                setTipologies(json.tipologia);
                setPrioritat(json.prioritat);
            }
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
                setLocalitzacions(json.list);
                setIncidencia(preState => (
                    { ...preState, codiLocalitzacio: json.list[0]._id}
                ));
            }
            
            if(json.error) setErrorBack(json.error);
        });
    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/incidencies/APIUpdate/" + id, {
            method: "PUT",
            body: JSON.stringify({incidencia}),
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

            if (json.ok) navigate(`/home/incidencia/list`);
            
        });
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setIncidencia({ ...incidencia, [name]: value });
        
    };

    return(
        <main>

            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">Edita Incidencia</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

                        <InputCodiExemplar 
                            codiExemplar={incidencia.codiExemplar}
                            handleChange={handleChange}
                        />

                        <InputUbicacio
                            ubicacio={incidencia.ubicacio}
                            handleChange={handleChange}
                        />

                        <SelectLocalitzacio
                            localitzacions={localitzacions}
                            codiLocalitzacio={incidencia.codiLocalitzacio}
                            handleChange={handleChange}
                        />

                        <SelectTipologia
                            tipologies={tipologies}
                            tipologia={incidencia.tipologia}
                            handleChange={handleChange}
                        />

                        <InputDescripcio
                            descripcio={incidencia.descripcio}
                            handleChange={handleChange}
                        />

                        <SelectPrioritat
                            prioritats={prioritats}
                            prioritat={incidencia.prioritat}
                            handleChange={handleChange}
                        />

                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>
        </main>
    )

}

function DivMessage({message}){
    return(
        <div className="alert alert-danger">
            <p className="text-danger">{message}</p>
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

function InputCodiExemplar({codiExemplar, handleChange}){
    return (
        <div className="form-group">
            <label htmlFor="codiExemplar"> Codi del exemplar</label>
            <input 
                type="text" 
                name="codiExemplar" 
                className="form-control" 
                value={codiExemplar}
                onChange={(e) => handleChange(e)}
            /> 
        </div>
    )
}

function InputUbicacio({ubicacio, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="ubicacio">Ubicació</label>
            <textarea 
                name="ubicacio" 
                className="form-control" 
                value={ubicacio}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

function SelectLocalitzacio({localitzacions, codiLocalitzacio, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="codiLocalitzacio">Localitzacio</label>
            <select       
                name="codiLocalitzacio"
                id="codiLocalitzacio"
                value={codiLocalitzacio}
                onChange={(e) => handleChange(e)}
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

function SelectTipologia({tipologies, tipologia, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="tipologia">Tipologia</label>
            <select       
                name="tipologia"
                id="tipologia"
                value={tipologia}
                onChange={(e) => handleChange(e)}
                className="form-control"
            >
                {
                    tipologies.map((tipologia, index) =>(
                        <option key={index} value={`${tipologia}`}>{tipologia}</option>
                    ))
                }
            </select>
        </div>
    )
}

function InputDescripcio({descripcio, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="descripcio">Descripcio</label>
            <textarea 
                name="descripcio" 
                className="form-control" 
                value={descripcio}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

function SelectPrioritat({prioritats, prioritat, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="prioritat">Prioritat</label>
            <select       
                name="prioritat"
                id="prioritat"
                value={prioritat}
                onChange={(e) => handleChange(e)}
                className="form-control"
            >
                {
                    prioritats.map((prioritat, index) =>(
                        <option key={index} value={`${prioritat}`}>{prioritat}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default IncidenciaEdit;