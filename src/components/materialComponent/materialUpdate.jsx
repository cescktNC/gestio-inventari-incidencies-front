import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ComprobacioName, ComprobacioDescripcio, ComprobacioAnyCompra, 
    ComprobacioFotografia, ComprobacioPreuCompra } from "../../js/comprobacioCampsMaterials";

function MaterialUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [material, setMaterial] = useState({
        nom: '',
        descripcio: '',
        preuCompra: '',
        anyCompra: '',
        fotografia: '',
        codiSubCategoria: {},
        newCodiSubCategoria: ''
    });

    const [subCategories, setSubCategories] = useState([]);

    const [comprobacio, setComprobacio] = useState({
        comprobacioNom: true,
        comprobacioDescripcio: true,
        comprobacioPreuCompra: true,
        comprobacioFotografia: true,
        comprobacioAnyCompra: true,
    });

    const [errorsForm, setErrorsForm] = useState({
        errorNom: '',
        errorDescripcio: '',
        errorAnyCompra:'',
        errorPreuCompra:'',
        errorFotografia: '',
        errorCodiSubcategoria:''
    });

	const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/materials/APIshow/" + id, {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.material) {
                setMaterial({
                    ...material, 
                    ...json.material, 
                    anyCompra: json.material.anyCompra.substring(0, 10), 
                    codiSubCategoria: json.material.codiSubCategoria._id,
                    newCodiSubCategoria: json.material.codiSubCategoria._id,
                    fotografia: ''
                })
            }
            if(json.error) setErrorBack(json.error)
        });
    }, []);
    
    useEffect(() => {
        fetch("http://localhost:5000/subcategories/APIAlllist", {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.list) setSubCategories(json.list);
            
            if(json.error) setErrorBack(json.error)
        });
    
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', material.nom);
        formData.append('descripcio', material.descripcio);
        formData.append('preuCompra', material.preuCompra);
        formData.append('anyCompra', material.anyCompra);
        if(material.fotografia !== '') {
            formData.append('fotografia', material.fotografia);
            ComprobacioFotografia(material.fotografia, {handleComprobacio, handleErrors}); 
        }
        formData.append('codiSubCategoria', material.codiSubCategoria);   
        formData.append('newCodiSubCategoria', material.newCodiSubCategoria);   
        
        ComprobacioName(material.nom, {handleComprobacio, handleErrors}); 
        ComprobacioDescripcio(material.descripcio, {handleComprobacio, handleErrors}); 
        ComprobacioAnyCompra(material.anyCompra, {handleComprobacio, handleErrors}); 
        ComprobacioPreuCompra(material.preuCompra, {handleComprobacio, handleErrors});


        if (!Object.values(comprobacio).includes(false)) {
            fetch("http://localhost:5000/materials/APIupdate/" + id, {
                method: "PUT",
                body: formData,
                headers: { 
                    "Authorization": "Bearer " + window.localStorage.getItem("token"),
                }
            })
            .then((response) => response.json())
            .then((json) => {
                
                if(json.error !== undefined) setErrorBack(json.error);
				
				if(json.errors !== undefined) setErrorsBack(json.errors);

				if (json.ok) navigate(-1);
				
            });
        }
    }


    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'fotografia') {
            setMaterial({ ...material, [name]: files[0] });
        } else {
            setMaterial({ ...material, [name]: value });
        }
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
                    <h5 className="card-title">Editar Material</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} >
                        {(errorsBack.length !== 0 && (<DivArrayErrors errors={errorsBack} />) )}

                        {(errorBack !== '' && (<DivError error={errorBack}  />) )}

                        <InputNom 
                            nomMaterial={material.nom} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorName && (<p className="error-message">{errorsForm.errorName}</p>)}

                        <InputDescripcio
                            descripcioMaterial={material.descripcio} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorDescripcio && (<p className="error-message">{errorsForm.errorDescripcio}</p>)}

                        <InputPreuCompra
                            preuCompraMaterial={material.preuCompra} 
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorPreuCompra && (<p className="error-message">{errorsForm.errorPreuCompra}</p>)}

                        <InputAnyCompra 
                            anyCompraMaterial={material.anyCompra} 
                            handleChange={handleChange}  
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorAnyCompra && (<p className="error-message" >{errorsForm.errorAnyCompra}</p>)}

                        <InputFotografia 
                            handleChange={handleChange}  
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorFotografia && (<p className="error-message" >{errorsForm.errorFotografia}</p>)}

                        <InputSubCategoria 
                            newCodiSubCategoriaMaterial={material.newCodiSubCategoria} 
                            subCategories={subCategories}
                            handleChange={handleChange} 
                            handleComprobacio={handleComprobacio} 
                            handleErrors={handleErrors}
                        />
                        {errorsForm.errorCodiSubcategoria && (<p className="error-message">{errorsForm.errorCodiSubcategoria}</p>)}

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

function InputNom({nomMaterial, handleChange, handleComprobacio, handleErrors}){

    return(
        <div className="form-group">
            <label form="nom">Nom</label>
            <input
                type="text"
                name="nom"
                value={nomMaterial}
                onChange={handleChange}
                onBlur={(e) => ComprobacioName(e.target.value, {handleComprobacio, handleErrors})}
                className="form-control"
                required
            />
        </div>
    )
}

function InputDescripcio({descripcioMaterial, handleChange, handleComprobacio, handleErrors}){

    return(
        <div className="form-group">
            <label form="descripcio">Descripció</label>
            <input
                type="text"
                name="descripcio"
                value={descripcioMaterial}
                onChange={handleChange}
                onBlur={(e) => ComprobacioDescripcio(e.target.value, {handleComprobacio, handleErrors})}
                className="form-control"
                required
            />
        </div>
    )
}

function InputPreuCompra({preuCompraMaterial, handleChange, handleComprobacio, handleErrors}){

    return(
        <div className="form-group">
            <label form="preuCompra">Preu de compra</label>
            <input
                type="number"
                name="preuCompra"
                value={preuCompraMaterial}
                onChange={handleChange}
                onBlur={(e) => ComprobacioPreuCompra(e.target.value, {handleComprobacio, handleErrors})}
                className="form-control"
                min="0"
                required
            />
        </div>
    )
}

function InputAnyCompra({anyCompraMaterial, handleChange, handleComprobacio, handleErrors}){

    let data = new Date();
    let dia = data.getDate();
    if (dia < 0) dia = '0' + dia;
    let mes = data.getMonth() + 1;
    if (mes < 10) mes = '0' + mes

    let dataActual = data.getFullYear() + '-' + mes + '-' + dia;

    return(
        <div className="form-group">
            <label form="anyCompra">Data de compra</label>
            <input
                type="date"
                name="anyCompra"
                value={anyCompraMaterial}
                onChange={handleChange}
                onBlur={(e) => ComprobacioAnyCompra(e.target.value, {handleComprobacio, handleErrors})}
                className="form-control"
                max={dataActual}
                required
            />
        </div>
    )
}

function InputFotografia({ handleChange, handleComprobacio, handleErrors}){

    return(
        <div className="form-group">
            <label form="fotografia">Fotografia</label>
            <input
                type="file"
                name="fotografia"
                accept="image/png, .jpeg, .jpg"
                onChange={handleChange}
                className="form-control"
            />
        </div>
    )
}

function InputSubCategoria({newCodiSubCategoriaMaterial, subCategories, handleChange, handleComprobacio, handleErrors}){

    return(

        <div className="form-group">
            <label form="newCodiSubCategoria">SubCategoria</label>
            <select       
                name="newCodiSubCategoria"
                id="newCodiSubCategoria"
                value={newCodiSubCategoriaMaterial}
                onChange={handleChange} 
                onBlur={(e) => ComprobacioFotografia(e.target.value, {handleComprobacio, handleErrors})}
                className="form-control"
            >
                {
                    subCategories.map((subCategoria, index) =>(
                        <option key={index} value={`${subCategoria._id}`}>{subCategoria.nom}</option>
                    ))
                }
            </select>
        </div>
        
    )
}

export default MaterialUpdate;
