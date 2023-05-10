import {React, useState, useEffect} from "react";
import "../../css/styleReservaCadires.css"
import { useParams } from "react-router";
import { element } from "prop-types";

function ReservaCadiraList(){
    const { id } = useParams();
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
    }, []);
    console.log({cadiraReservades, cadiresReservadesProvisionalment})
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
                                idSessio={id} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

function Files({cadiraReservades, cadiresReservadesProvisionalment, idSessio}){
    
    for (let fila = 1; fila <= 8; fila++){
        for (let seccio = 1; seccio <= 2; seccio++){
            return(
                <div className="seccio">
                    { (fila <= 4) 
                        ? <FilesPrincipals 
                            cadiraReservades={cadiraReservades} 
                            cadiresReservadesProvisionalment={cadiresReservadesProvisionalment}
                            idSessio={idSessio} 
                            fila={fila}
                            seccio={seccio}
                        /> 
                        : ''
                    }
                </div>
            )
        }
    }
    
}

function FilesPrincipals({cadiraReservades, cadiresReservadesProvisionalment, idSessio, fila, seccio}){
    let cadiraReservada, cadiraReservadaProvisional, elements=[];
    for (let cadira = 1; cadira <= 16; cadira++) {
        cadiraReservada = cadiraReservades.find(cadiraReservada => cadiraReservada.idCadira.fila == fila && cadiraReservada.idCadira.numero == cadira); 
        cadiraReservadaProvisional = cadiresReservadesProvisionalment.find(cadiraReservadaProvisional => cadiraReservadaProvisional.idCadira.fila == fila && cadiraReservadaProvisional.idCadira.numero == cadira);

        elements.push(
            <span key={cadira}>
                {
                    seccio === 1 ? (
                        cadiraReservada !== undefined ? (
                            <a className="butaca">
                                <img src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                            </a>
                        ) : cadiraReservadaProvisional !== undefined ? (
                            <a className="butaca" href={`/reservaCadira/eliminarreserva/${idSessio}/${fila}${cadira}/${JSON.stringify(cadiresReservadesProvisionalment)}`}>
                                <img src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                            </a>
                        ) : (
                            <a className="butaca" href={`/reservaCadira/reserva/${idSessio}/${fila}${cadira}/${JSON.stringify(cadiresReservadesProvisionalment)}`}>
                                <img src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                            </a>
                        )
                    ) :  (
                        cadiraReservada !== undefined ? (
                            // sumar a la cadira +16
                            <a className="butaca">
                                <img src="http://localhost:5000/URL/icons/butaca_negra.svg" alt="Butaca" />
                            </a>
                        ) : cadiraReservadaProvisional !== undefined ? (
                            <a className="butaca" href={`/reservaCadira/eliminarreserva/${idSessio}/${fila}${cadira}/${JSON.stringify(cadiresReservadesProvisionalment)}`}>
                                <img src="http://localhost:5000/URL/icons/butaca_groga.svg" alt="Butaca" disabled />
                            </a>
                        ) : (
                            <a className="butaca" href={`/reservaCadira/reserva/${idSessio}/${fila}${cadira}/${JSON.stringify(cadiresReservadesProvisionalment)}`}>
                                <img src="http://localhost:5000/URL/icons/butaca_verda.svg" alt="Butaca" />
                            </a>
                        )
                    )
                }
                <div className="fletxa"></div>
                {
                    seccio === 1 ? (
                        <div className="info-cadira">Fila {fila}  Cadira {cadira}</div>
                    ) : (
                        <div className="info-cadira">Fila {fila}  Cadira {(cadira + 16)}</div>
                    )
                }
            </span>
        )
                 
    }
    console.log(elements[0]);
    return (
        <div className="cadira">
            {elements}
        </div>
    );
}

export default ReservaCadiraList;