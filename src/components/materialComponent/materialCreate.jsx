import { React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function MaterialCreate(){
    const [material,setMaterial]=useState({
        codi: '',
        nom: '',
        descripcio: '',
        preuCompra: '',
        anyCompra: '',
        fotografia: '',
        codiSubCategoria: ''
    });

    const [subCategories, setSubCategories] = useState({
        codi: '',
        nom: '',
    });

    const [comprobacio, setComprobacio] = useState({
        comprobacioCodi: false,
        comprobacioNoms: false,
        comprobacioDescripcio: false,
        comprobacioPreuCompra: false,
        comprobacioFotografia: false,
        comprobacioCodiSubCategoria: false
    });

    const [errorsForm, setErrorsForm] = useState({
        errorcodi: '',
        errorNom: '',
        errorDescripcio: '',
        errorAnyCompra:'',
        errorFotografia: '',
        errorCodiSubcategoria:''
    });

	const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');
    
    // useEffect(()=>{

    //     fetch("http://localhost:5000/subcategories/API", {
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //         setSubCategories(json.carrecs)
    //     });
    
    // },[]);


}

export default MaterialCreate;