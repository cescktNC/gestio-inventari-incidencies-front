import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { nomesAdmin } from "../../js/comprobacioCarrecs";

function ExemplarShow(){
    const { id } = useParams();
    
    const [exemplar, setExemplar] = useState({
        codi: '',
        demarca: false,
        qr: '',
        codiMaterial: {},
        codiLocalitzacio: {}
    });

	const [errorBack, setErrorBack] = useState('');

    useEffect(()=>{
        fetch("http://localhost:5000/exemplar/APIshow/" + id, {
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.exemplar) setExemplar(json.exemplar)
            
            if(json.error) setErrorBack(json.error)
        });
    }, []);


    return(

        <main>
            <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title">Informació dels exemplars</h5>

                    {(errorBack !== '' && (<DivError error={errorBack} />) )}

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Codi</th>
                                <th scope="col">Estat</th>
                                <th scope="col">Nom del Material</th>
                                <th scope="col">Nom de la Localitzacio</th>
                                <th scope="col">Imatge</th>
                                <th scope="col">Operacions</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    {exemplar.codi}
                                </td>
                                <td>
                                    { exemplar.demarca ? 'Baixa' : 'Alta' }
                                </td>
                                <td>
                                    { exemplar.codiMaterial.nom }
                                </td>
                                <td>
                                    { exemplar.codiLocalitzacio.nom }
                                </td>
                                <td>
                                    <img className="w-25" src={`http://localhost:5000/${exemplar.codiMaterial.fotografia}`}
                                        alt={exemplar.codiMaterial.nom} />
                                </td>

                                <td>
                                
                                    {(nomesAdmin() && !exemplar.demarca) && (
                                        <Link className="btn btn-secondary" to={`/home/exemplar/update/${exemplar._id}`}>Editar</Link>
                                    )}

                                    <a className="btn btn-info card-link"
                                        href={"data:image/svg+xml;utf8," + encodeURIComponent(exemplar.qr)}
                                        download="qr.svg" >Descargar QR</a>

                                </td>


                            </tr>

                        </tbody>
                    </table>


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

export default ExemplarShow;