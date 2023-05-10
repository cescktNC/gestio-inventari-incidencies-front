import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function TicketList() {
    
    const { idSessio } = useParams();
    const [tickets, setList] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/ticket/APIlist/" + idSessio, {
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
            setList(json.tickets);
        })
        .catch(error => console.error('Error:', error));
    }, [idSessio]);
    
    return (
        <div className="taula">
            <div className="card mt-2 w-100">
                <div className="card-body">
                    <h3 className="card-title">Tickets</h3>
                    <div className="mx-auto">
                        <TicketTable tickets={tickets} />
                    </div>
                </div>
            </div>
        </div>
    );
}
    
function TicketTable({ tickets }) {

    return (
        <table className="table table-responsive table-striped table-hover ">
            <thead>
                <tr>
                    <th scope="col" className="text-center">Número de Tiquet</th>
                    <th scope="col" className="text-center">Email</th>
                    <th scope="col" className="text-center"></th>
                </tr>
            </thead>
            <tbody>
                <TicketTbody tickets={tickets}></TicketTbody>
            </tbody>
        </table>
    )

}

function TicketTbody({ tickets }) {
    
    return tickets.map((ticket, index) => (
        <tr key={index}>
            <td className="text-center">
                {ticket.numero}
            </td>
            <td className="text-center">
                {ticket.idUsuari.email}
            </td>
            <td className="edit-delete-cell text-center">
                <Link className="btn btn-secondary" to={`/home/tickets/show/${ticket._id}`}>Mostrar</Link>
            </td>
        </tr>
    ));
}


export default TicketList;