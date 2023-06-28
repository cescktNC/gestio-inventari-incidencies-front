import { useEffect, useState } from "react";
import { useParams } from "react-router";

import '../../css/styleTicket.css';

function TicketShow() {
    const { id } = useParams();
    const [usuari, setUsuari] = useState([]);
    const [sessio, setSessio] = useState([]);
    const [reserva, setReserva] = useState([]);
    const [cadires, setCadires] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/ticket/APIShow/" + id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) { throw Error(response.statusText) }
            return response.json();
        })
        .then(json => {
            setUsuari(json.usuari);
            setSessio(json.sessio);
            setReserva(json.reserva);
            setCadires(json.cadires);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="taula">
            <div className="card mt-2 w-100">
                <div className="card-body">
                    <div className="container">
                        <h1 className="ticket-titol">ticket</h1>
                        <div className="ticket">
                            <TicketDreta reserva={reserva} />
                            <TicketEsquerra reserva={reserva} usuari={usuari} sessio={sessio} cadires={cadires} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TicketDreta({ reserva }) {
    let horaInici = new Date(reserva.horaInici);
    let mes = getMes(horaInici);
    return (
        <div className="ticket-dreta">
            <h2 className="num">{horaInici.getDate()}</h2>
            <p className="dia">{mes}</p>
        </div>
    )
}

function TicketEsquerra({reserva, usuari, sessio, cadires}) {

    let horaInici = new Date(reserva.horaInici);
    let horaFi = new Date(reserva.horaFi);
    let fila;
    if (cadires.length === 0) {
        fila = 1;
    } else fila = cadires[0].fila;

    // console.log(cadires[0].fila);
    let mes = getMes(horaInici);
    let dia = getDia(horaInici);
    let numero = numeroCadires(cadires, fila);
    

    return (
        <div className="ticket-esquerra">
            <p className="event">{`${usuari.nom} ${usuari.cognoms}`}</p>
            <h2 className="titol">{sessio.nom}</h2>
            <div className="cal">
                <p>{dia} de {mes} {horaInici.getFullYear()}<br/>{horaInici.getHours()}h a {horaFi.getHours()}h</p>
            </div>
            <div className="fix"></div>
            <div className="loc">
                <p>
                    Sala d'Actes<br />
                    Fila: {fila} Número: {numero}
                    {/* <Cadires cadires={cadires} fila={fila}/> */}
                </p>
            </div>
        </div>
    )
}

function numeroCadires(cadires, fila) {
    let numero = "";
    cadires.forEach( (cadira, index) => {
        if (cadira.fila == fila) {
            if (cadires.length == index + 1 || cadires[index+1].fila != cadira.fila) {
                numero += cadira.numero;
            } else {
                numero += cadira.numero + ",";
            }
        } else {
            numero += "\n | Fila: " + cadira.fila + " Número: ";
            if (cadires.length == index + 1 || cadires[index+1].fila != cadira.fila) {
                numero += cadira.numero;
            } else {
                numero += cadira.numero + ",";
            }
            fila = cadira.fila;
        }
    });
    return numero;
}

function getMes(horaInici) {
    let mes;
    if (horaInici.getMonth() == 0) mes = "Gener"
    else if (horaInici.getMonth() == 1) mes = "Febrer"
    else if (horaInici.getMonth() == 2) mes = "Març"
    else if (horaInici.getMonth() == 3) mes = "Abril"
    else if (horaInici.getMonth() == 4) mes = "Maig"
    else if (horaInici.getMonth() == 5) mes = "Juny"
    else if (horaInici.getMonth() == 6) mes = "Juliol"
    else if (horaInici.getMonth() == 7) mes = "Agost"
    else if (horaInici.getMonth() == 8) mes = "Setembre"
    else if (horaInici.getMonth() == 9) mes = "Octubre"
    else if (horaInici.getMonth() == 10) mes = "Novembre"
    else if (horaInici.getMonth() == 11) mes = "Desembre"
    return mes;
}

function getDia(horaInici) {
    let dia;
    if (horaInici.getDay() == 1) dia = "Dilluns"
    else if (horaInici.getDay() == 2) dia = "Dimarts"
    else if (horaInici.getDay() == 3) dia = "Dimecres"
    else if (horaInici.getDay() == 4) dia = "Dijous"
    else if (horaInici.getDay() == 5) dia = "Divendres"
    else if (horaInici.getDay() == 6) dia = "Dissabte"
    else if (horaInici.getDay() == 7) dia = "Diumenge"
    return dia;
}

export default TicketShow;