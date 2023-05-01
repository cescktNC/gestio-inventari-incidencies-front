import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioCodiExemplar } from "../../js/comprovacioCampsIncidencia";

function IncidenciaCreate(){
    const [incidencia, setIncidencia] = useState({
        codiExemplar: '',
        ubicacio: '',
        codiLocalitzacio: '',
        tipologia: 'Altres',
        descripcio: '',
        prioritat: 'Mitjana'
    });

    const [tipologies, setTipologies] = useState([]);
    const [localitzacions, setLocalitzacions] = useState([]);
    const [prioritats, setPrioritat] = useState([]);

    const [comprobacio, setComprobacio] = useState({
        comprobacioCodiExemplar: false,
    });

    const [errorsForm, setErrorsForm] = useState({
        errorCodiExemplar: '',
    });

    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const navigate = useNavigate();
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
            if(json.errors) setErrorsBack(json.errors);
            else{
                setTipologies(json.tipologia);
                setPrioritat(json.prioritat);
            }
        });
    
    }, []);

    useEffect(() => {
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
        ComprobacioCodiExemplar(incidencia.codiExemplar, {handleComprobacio, handleErrors})
        if (!Object.values(comprobacio).includes(false)) {
            fetch("http://localhost:5000/incidencies/APICreate", {
                method: "POST",
                body: JSON.stringify({incidencia}),
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

                if (json.ok) navigate(-1);
                
            });
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setIncidencia({ ...incidencia, [name]: value });
        
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
                    <h5 className="card-title">Nova Incidencia</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivError error={errorBack}  />) )}

                        <InputCodiExemplar 
                            codiExemplar={incidencia.codiExemplar}
                            handleChange={handleChange}
                            handleComprobacio={handleComprobacio}
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorCodiExemplar && (<p className="error-message">{errorsForm.errorCodiExemplar}</p>)}

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

                        <button type="submit" className="btn btn-primary">Save</button>
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

function InputCodiExemplar({codiExemplar, handleChange, handleComprobacio, handleErrors}){
    return (
        <div className="form-group">
            <label htmlFor="codiExemplar"> Codi del exemplar</label>
            <input 
                type="text" 
                name="codiExemplar" 
                className="form-control" 
                value={codiExemplar}
                placeholder="00/00-00/00-00/00/00"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => ComprobacioCodiExemplar(e.target.value, {handleComprobacio, handleErrors})}
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

export default IncidenciaCreate;