import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioDataRetorn } from '../../js/comprobacioCampsPrestec'

function PrestecUpdate(){

    const {id} = useParams();

    const [prestec, setPrestec] = useState({
        dni: '',
        dataInici: '',
        dataRetorn: '',
        estat: 'Pendent'
    });

    const [estats, setEstats] = useState([]);

    const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const [comprobacio, setComprobacio] = useState({
        comprobacioDNI: true,
        comprobacioDataInici: true,
        comprobacioDataRetorn: true
    });

    const [errorsForm, setErrorsForm] = useState({
        errorDNI: '',
        errorDataInici: '',
        errorDataRetorn: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/prestec/APIShow/` + id,{
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if(json.error) setErrorBack(json.error);

            if(json.errors) setErrorsBack(json.errors);

            if (json.prestec) setPrestec({
                ...prestec, 
                dni: json.prestec.dniUsuari.dni,
                dataInici: json.prestec.dataInici.substring(0, 10),
                dataRetorn: json.prestec.dataRetorn.substring(0, 10),
                estat: json.prestec.estat
            });
            
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/prestec/APIEstats`,{
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

            if (json.estats) setEstats(json.estats);
            
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('a')
        fetch(`http://localhost:5000/prestec/APIUpdate/` + id, {
            method: "PUT",
            body: JSON.stringify({ prestec }),
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        }) 
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if(json.error) setErrorBack(json.error);

            if(json.errors) setErrorsBack(json.errors);

            if (json.ok) navigate(`/home/prestec/list`)
            
        });
    };

    const handleChange = input => {
        setPrestec({ ...prestec, [input.name]: input.value });
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
                    <h5 className="card-title">Nou Prestec</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

                        <InputDataRetorn 
                            dataInici={prestec.dataInici} 
                            dataRetorn={prestec.dataRetorn} 
                            handleChange={handleChange}  
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDataRetorn && (<p className="error-message" >{errorsForm.errorDataRetorn}</p>)}

                        <InputEstat estats={estats} estatPrestec={prestec.estat} handleChange={handleChange} />


                        <button type="submit" className="btn btn-primary">Crea</button>
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


function InputDataRetorn({dataInici, dataRetorn, handleChange, handleComprobacio, handleErrors}){

    let data = new Date();
    let dia = data.getDate();
    if (dia < 0) dia = '0' + dia;
    let mes = data.getMonth() + 1;
    if (mes < 10) mes = '0' + mes

    let dataActual = data.getFullYear() + '-' + mes + '-' + dia;
    return(
        <div className="form-group">
            <label htmlFor="dataRetorn">Data detorn</label>
            <input 
                type="date" 
                name="dataRetorn" 
                id="dataRetorn" 
                className="form-control"
                value={dataRetorn}
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioDataRetorn(e.target.value, {dataInici, handleComprobacio, handleErrors})}
                min={dataActual}
            />
        </div>
    )
}

function InputEstat({estats, prestecEstats, handleChange}){
    return(
        <div className="form-group">
            <label htmlFor="estat">Estat</label><br />
            <select className="form-control" name="estat" value={prestecEstats} onChange={(e) => handleChange(e.target)}>
                {estats.map((estat, index) => (
                <option key={index} >{estat}</option>
                ))}
            </select>
        </div>
    )
}

export default PrestecUpdate;