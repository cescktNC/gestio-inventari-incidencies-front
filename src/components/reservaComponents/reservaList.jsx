import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../../css/styleCategories.css'

function ReservaList() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(!searchParams.get('page') ? 1 : searchParams.get('page'));
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/reserva/APIlist?page=" + currentPage,{
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {    
                setList(json.list);
                setCurrentPage(json.currentPage);
                setTotalPages(json.totalPages);
            });
    }, [currentPage]);

    return (
        <div>
            <div className="card mt-2 w-100">
                <div className="card-body">
                    <h5 className="card-title">Reserva</h5>
                    <div className="mx-auto">
                        <ReservaTable list={list} />
                        <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ReservaTable({ list }) {

    return (
        <table className="table table-responsive table-striped table-hover ">
            <thead>
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Hora Inici</th>
                    <th scope="col">Hora Fi</th>
                    <th scope="col">DniUsuari</th>
                    <th scope="col">Codi Localitzacio</th>
                    <th scope="col" colSpan={2}>
                        <Link to="/home/reserva/create" className="btn btn-primary">Nova</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <ReservaTbody list={list}></ReservaTbody>
            </tbody>
        </table>
    )

}

function ReservaTbody({ list }) {
    return list.map((reserva, index) => {
        const timefi = new Date(reserva.horaFi).toLocaleTimeString();
        const timeString = new Date(reserva.horaInici).toLocaleTimeString();
        const formattedHour = timeString.length === 8 ? timeString.substring(0, 5) : timeString.substring(0, 4);

        return (
            <tr key={index}>
                <td>{reserva.codi}</td>
                <td>{formattedHour} h</td>
                <td>{timefi}</td>
                <td>{reserva.dniUsuari.nom}</td>
                <td>{reserva.codiLocalitzacio.nom}</td>
                <td className="edit-delete-cell">
                    <Link className="btn btn-secondary" to={`/home/reserva/update/${reserva._id}`}>Edit</Link>
                    <Link className="btn btn-danger" to={`/home/reserva/delete/${reserva._id}`}>Eliminar</Link>
                </td>
            </tr>
        );
    });
}




function Paginate({currentPage, totalPages, setCurrentPage}){

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage=Math.max(1, endPage - 4);
    }


    return(

        <nav>
            <ul className="pagination">
                <li className={`page-item ${parseInt(currentPage) === 1 ? 'disabled' : ''}`}>
                    <Link className="page-link" to="?page=1" aria-label="Anterior" onClick={() => setCurrentPage(1)}>
                        <span>Primer</span>
                    </Link>
                </li>
                <li className={`page-item ${parseInt(currentPage) === 1 ? 'disabled' : ''}`}>
                    <Link 
                        className="page-link" 
                        to={`?page=${currentPage - 1}`} 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        aria-label="Anterior"
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Anterior</span>
                    </Link>
                </li>

                <PagesLinks startPage={startPage} endPage={endPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <li className={`page-item ${parseInt(currentPage) === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                    <Link 
                        className="page-link" 
                        to={`?page=${parseInt(currentPage) + 1}`} 
                        onClick={() => setCurrentPage(parseInt(currentPage) + 1)} 
                        aria-label="Siguiente"
                    >
                        <span className="sr-only">Següent</span>
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
                
                <li className={`page-item ${parseInt(currentPage) === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`?page=${totalPages}`} onClick={() => setCurrentPage(totalPages)}  aria-label="Siguiente">
                        <span className="sr-only">Ultim</span>
                    </Link>
                </li>    
            </ul>
        </nav>
    )
}

function PagesLinks({startPage, endPage, currentPage, setCurrentPage}){

    let pageLinks = [];

    for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(
            <li className={`page-item ${i === parseInt(currentPage) ? 'active' : ''}`} key={i}>
                <Link className="page-link" to={`?page=${i}`} onClick={() => setCurrentPage(i)} >{i}</Link>
            </li>
        )
    }

    return pageLinks;
}

export default ReservaList;