import {React, useState, useEffect} from "react";
import "../../css/styleReservaCadires.css"
import { useParams, useNavigate } from "react-router";

function ReservaCadiraList(){
    const { id } = useParams();
    const idUsuari = window.localStorage.getItem('id');
    const navigate = useNavigate();

    const [cadiraReservades, setCadiraReservades] = useState([]);
    const [cadiresReservadesProvisionalment, setCadiresReservadesProvisionalment] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/reservaCadira/APIlist/" + id,{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {  
            setCadiraReservades(json.cadiresReservades);
            setCadiresReservadesProvisionalment(json.cadiresReservadesProvisionalment);
        });
    }, [id]);

    const reservaProvisional = (fila, cadira) =>{
        fetch(`http://localhost:5000/reservaCadira/APIcreateProvisional/${id}/${fila}${cadira}/${JSON.stringify(cadiresReservadesProvisionalment)}`,{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {  
            setCadiraReservades(json.cadiresReservades);
            setCadiresReservadesProvisionalment(json.cadiresReservadesProvisionalment);
        });
    }

    const eliminar = (fila, cadira) =>{
        fetch(`http://localhost:5000/reservaCadira/APIdeleteProvisional/${id}/${fila}${cadira}/${JSON.stringify(cadiresReservadesProvisionalment)}`,{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {  
            setCadiraReservades(json.cadiresReservades);
            setCadiresReservadesProvisionalment(json.cadiresReservadesProvisionalment);
        });
    }

    const reserva = (e) => {
        fetch(`http://localhost:5000/reservaCadira/APIcreate/${id}/${JSON.stringify(cadiresReservadesProvisionalment)}/${idUsuari}`,{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {  
            if(json.ok) navigate('/home/token/')
        });
    }

    return(
        <main>
            <div className="card mt-2">
                <div className="contenidor card-body">
                    <h5 className="card-title">Cadires Reservades</h5>

                    <div className="escenari">Escenari</div>
                    
                    <div className="cadires">
                        
                        <div className="fila32">
                            <Files 
                                cadiraReservades={cadiraReservades} 
                                cadiresReservadesProvisionalment={cadiresReservadesProvisionalment}
                                reservaProvisional={reservaProvisional}
                                eliminar={eliminar}
                            />
                        </div>
                    </div>
                    <button 
                    className="btn btn-primary reservar card_link" 
                    onClick={() => reserva()}>
                        Reservar
                    </button>
                </div>
            </div>
        </main>
    )
}

function Files({cadiraReservades, cadiresReservadesProvisionalment, reservaProvisional, eliminar}){
    let elements=[], index=0;
    
    for (let fila = 1; fila <= 8; fila++){
        for (let seccio = 1; seccio <= 2; seccio++){
            elements.push(
                <div className="seccio" key={index}>
                    { fila <= 4 ? (
                            <FilesPrincipals 
                                cadiraReservades={cadiraReservades} 
                                cadiresReservadesProvisionalment={cadiresReservadesProvisionalment}
                                fila={fila}
                                seccio={seccio}
                                reservaProvisional={reservaProvisional}
                                eliminar={eliminar}
                            /> 
                        ) : fila <= 6 ? (
                            <FilesSecunadries
                                cadiraReservades={cadiraReservades} 
                                cadiresReservadesProvisionalment={cadiresReservadesProvisionalment}
                                fila={fila}
                                seccio={seccio}
                                reservaProvisional={reservaProvisional}
                                eliminar={eliminar}
                            />      
                        ) : (
                            <FilesTerciaries
                                cadiraReservades={cadiraReservades} 
                                cadiresReservadesProvisionalment={cadiresReservadesProvisionalment}
                                fila={fila}
                                seccio={seccio}
                                reservaProvisional={reservaProvisional}
                                eliminar={eliminar}
                            /> 
                        )
                    }
                </div>
            )
            index++;
        }
    }

    return elements
    
}

function FilesPrincipals({cadiraReservades, cadiresReservadesProvisionalment, fila, seccio, reservaProvisional, eliminar}){
    let cadiraReservadac, cadiraReservadaProvisional, elements=[];
    for (let cadira = 1; cadira <= 16; cadira++) {
        cadiraReservadac = cadiraReservades.find(cadiraReservada => (
            cadiraReservada.idCadira.fila === fila && cadiraReservada.idCadira.numero === (seccio === 1 ? cadira : (cadira + 16))
        ));

        cadiraReservadaProvisional = cadiresReservadesProvisionalment.find(cadiraReservadaProvisional => (
            cadiraReservadaProvisional.idCadira.fila === fila && cadiraReservadaProvisional.idCadira.numero === (seccio === 1 ? cadira : (cadira + 16))
        ));

        
        elements.push(
            <div className="cadira" key={`${seccio}${fila}${cadira}`}>
                { seccio === 1 ? (
                        cadiraReservadac !== undefined ? (
                                <span className="butaca">
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                                </span>
                            ) : cadiraReservadaProvisional !== undefined ? (
                                <span className="butaca" onClick={() => eliminar(fila, cadira)}>
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                                </span>
                            ) : (
                                <span className="butaca" onClick={() => reservaProvisional(fila, cadira)}>
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                                </span>
                            )
                    ) : (
                        cadiraReservadac !== undefined ? (
                            <span className="butaca">
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                            </span>
                        ) : cadiraReservadaProvisional !== undefined ? (
                            <span className="butaca" onClick={() => eliminar(fila, (cadira + 16))}>
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                            </span>
                        ) : (
                            <span className="butaca" onClick={() => reservaProvisional(fila, (cadira + 16))}>
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                            </span>
                        )
                    )
                }

                <div className="fletxa"></div>

                {
                    seccio === 1 ? (
                        <div className="info-cadira">Fila {fila}  Cadira {cadira}</div>
                    ) : (
                        <div className="info-cadira">Fila {fila}  Cadira {(cadira + 14)}</div>
                    )
                }
            </div>
        )
        
    }
    return elements;
}

function FilesSecunadries({cadiraReservades, cadiresReservadesProvisionalment, fila, seccio, reservaProvisional, eliminar}){
    let cadiraReservadac, cadiraReservadaProvisional, elements=[], condicio;
    for (let cadira = 1; cadira <= 15; cadira++) {
        cadiraReservadac = cadiraReservades.find(cadiraReservada => (
            cadiraReservada.idCadira.fila === fila && cadiraReservada.idCadira.numero === (seccio === 1 ? cadira : (cadira + 15))
        ));

        cadiraReservadaProvisional = cadiresReservadesProvisionalment.find(cadiraReservadaProvisional => (
            cadiraReservadaProvisional.idCadira.fila === fila && cadiraReservadaProvisional.idCadira.numero === (seccio === 1 ? cadira : (cadira + 15))
        ));

        condicio = (seccio === 1 && cadira === 1) ? 'desplacament1' : '';
        
        elements.push(
            <div className={`cadira ${condicio}`} key={`${seccio}${fila}${cadira}`}>
                { seccio === 1 ? (
                        cadiraReservadac !== undefined ? (
                                <span className="butaca">
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                                </span>
                            ) : cadiraReservadaProvisional !== undefined ? (
                                <span className="butaca" onClick={() => eliminar(fila, cadira)}>
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                                </span>
                            ) : (
                                <span className="butaca" onClick={() => reservaProvisional(fila, cadira)}>
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                                </span>
                            )
                    ) : (
                        cadiraReservadac !== undefined ? (
                            <span className="butaca">
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                            </span>
                        ) : cadiraReservadaProvisional !== undefined ? (
                            <span className="butaca" onClick={() => eliminar(fila, (cadira + 15))}>
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                            </span>
                        ) : (
                            <span className="butaca" onClick={() => reservaProvisional(fila, (cadira + 15))}>
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                            </span>
                        )
                    )
                }

                <div className="fletxa"></div>

                {
                    seccio === 1 ? (
                        <div className="info-cadira">Fila {fila}  Cadira {cadira}</div>
                    ) : (
                        <div className="info-cadira">Fila {fila}  Cadira {(cadira + 14)}</div>
                    )
                }
            </div>
        )
        
    }

    return elements;
}

function FilesTerciaries({cadiraReservades, cadiresReservadesProvisionalment, fila, seccio, reservaProvisional, eliminar}){
    let cadiraReservadac, cadiraReservadaProvisional, elements=[], condicio;
    for (let cadira = 1; cadira <= 14; cadira++) {
        cadiraReservadac = cadiraReservades.find(cadiraReservada => (
            cadiraReservada.idCadira.fila === fila && cadiraReservada.idCadira.numero === (seccio === 1 ? cadira : (cadira + 14))
        ));

        cadiraReservadaProvisional = cadiresReservadesProvisionalment.find(cadiraReservadaProvisional => (
            cadiraReservadaProvisional.idCadira.fila === fila && cadiraReservadaProvisional.idCadira.numero === (seccio === 1 ? cadira : (cadira + 14))
        ));

        condicio = (seccio === 1 && cadira === 1) ? 'desplacament2' : '';
        
        elements.push(
            <div className={`cadira ${condicio}`} key={`${seccio}${fila}${cadira}`} >
                { seccio === 1 ? (
                        cadiraReservadac !== undefined ? (
                                <span className="butaca">
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                                </span>
                            ) : cadiraReservadaProvisional !== undefined ? (
                                <span className="butaca" onClick={() => eliminar(fila, cadira)}>
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                                </span>
                            ) : (
                                <span className="butaca" onClick={() => reservaProvisional(fila, cadira)}>
                                    <img className="svg" src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                                </span>
                            )
                    ) : (
                        cadiraReservadac !== undefined ? (
                            <span className="butaca">
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                            </span>
                        ) : cadiraReservadaProvisional !== undefined ? (
                            <span className="butaca" onClick={() => eliminar(fila, (cadira + 14))}>
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                            </span>
                        ) : (
                            <span className="butaca" onClick={() => reservaProvisional(fila, (cadira + 14))}>
                                <img className="svg" src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                            </span>
                        )
                    )
                }

                <div className="fletxa"></div>

                {
                    seccio === 1 ? (
                        <div className="info-cadira">Fila {fila}  Cadira {cadira}</div>
                    ) : (
                        <div className="info-cadira">Fila {fila}  Cadira {(cadira + 14)}</div>
                    )
                }
            </div>
        )
        
    }

    return elements;
}

export default ReservaCadiraList;