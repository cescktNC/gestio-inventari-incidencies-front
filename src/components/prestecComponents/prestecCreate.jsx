import { React, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ComprobacioDNI } from "../../js/comprobacioCampsFormulariUser";
import { ComprobacioDataInici, ComprobacioDataRetorn } from '../../js/comprobacioCampsPrestec'

function PrestecCreate(){
    const [prestec, setPrestec]= useState({
        dni: '',
        dataInici: '',
        dataRetorn: ''
    });

    const [comprobacio, setComprobacio] = useState({
        comprobacioDNI: false,
        comprobacioDataInici: false,
        comprobacioDataRetorn: false
    });

    const [errorsForm, setErrorsForm] = useState({
        errorDNI: '',
        errorDataInici: '',
        errorDataRetorn: ''
    });

	const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        ComprobacioDNI(prestec.dni, {handleComprobacio, handleErrors}); 
        ComprobacioDataInici(prestec.dataInici, {handleComprobacio, handleErrors}); 
        ComprobacioDataRetorn(prestec.dataRetorn, {handleComprobacio, handleErrors}); 
        if (!Object.values(comprobacio).includes(false)) { 
            fetch("http://localhost:5000/prestec/APIcreate", {
                method: "POST",
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

                if (json.ok) navigate(-1)
                
            });
        }

    }
    console.log(comprobacio)

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

    return (
        <main>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">Nou Prestec</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

                        <InputDNI 
                            DNI={prestec.DNI} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDNI && (<p className="error-message">{errorsForm.errorDNI}</p>)}

                        <InputDataInici 
                            dataInici={prestec.dataInici} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDataInici && (<p className="error-message">{errorsForm.errorDataInici}</p>)}

                        <InputDataRetorn 
                            dataInici={prestec.dataInici} 
                            dataRetorn={prestec.dataRetorn} 
                            handleChange={handleChange}  
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDataRetorn && (<p className="error-message" >{errorsForm.errorDataRetorn}</p>)}

                        <button type="submit" className="btn btn-primary">Crea</button>
                    </form>
                </div>
            </div>
        </main>
    );
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

function InputDNI({DNI, handleChange, handleComprobacio, handleErrors}){
    return(
        <div className="form-group">
            <label form="dni">DNI</label>
            <input
                type="text"
                name="dni"
                className="form-control"
                value={DNI}
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioDNI(e.target.value, {handleComprobacio, handleErrors})}
                required
            />
        </div>
    )
}

function InputDataInici({dataInici, handleChange, handleComprobacio, handleErrors}){
    let data = new Date();
    let dia = data.getDate();
    if (dia < 10) dia = '0' + dia;
    let mes = data.getMonth() + 1;
    if (mes < 10) mes = '0' + mes

    let dataActual = data.getFullYear() + '-' + mes + '-' + dia;

    return(
        <div className="form-group">
            <label form="dataInici">Data d'inici</label>
            <input 
                type="date" 
                name="dataInici" 
                id="dataInici" 
                className="form-control"
                value={dataInici}
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioDataInici(e.target.value, {handleComprobacio, handleErrors})}
                min={dataActual}
            />
        </div>
    )
}

function InputDataRetorn({dataInici, dataRetorn, handleChange, handleComprobacio, handleErrors}){
    return(
        <div className="form-group">
            <label form="dataRetorn">Data detorn</label>
            <input 
                type="date" 
                name="dataRetorn" 
                id="dataRetorn" 
                className="form-control"
                value={dataRetorn}
                onChange={(e) => handleChange(e.target)}
                onBlur={(e) => ComprobacioDataRetorn(e.target.value, {dataInici, handleComprobacio, handleErrors})}
                disabled={dataInici === ''}
                min={dataInici}
            />
        </div>
    )
}

export default PrestecCreate;