import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleCategories.css'

function ReservaList() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/reserva/APIlist?page=" + currentPage)
            .then(response => response.json())
            .then(json => {               
                setList(json.list);
                setCurrentPage(json.currentPage);
                setTotalPages(json.totalPages);
            });
    }, [currentPage]);

    return (
        <div className="d-flex align-items-center ">
            <div className="mx-auto">
                <ReservaTable list={list} />
                <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
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
                    <th scope="col">Hora</th>
                    <th scope="col">Data</th>
                    <th scope="col">DniUsuari</th>
                    <th scope="col">Codi Localitzacio</th>
                    <th scope="col">
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

    return list.map((reserva, index) => (
        <tr key={index}>
            <td>
                {reserva.codi}
            </td>
            <td>
                {reserva.hora}
            </td>
            <td>
                {reserva.data}
            </td>
            <td>
                {reserva.dniUsuari}
            </td>
            <td>
                {reserva.codiLocalitzacio}
            </td>
            <td>
                <Link className="btn btn-secondary" to={`/home/planta/update/${reserva._id}`}>Edit</Link>
            </td>
        </tr>
    ));
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
                    <Link className="page-link" to="?page=1" aria-label="Anterior">
                        <span>Primer</span>
                    </Link>
                </li>
                <li className={`page-item ${parseInt(currentPage) === 1 ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`?page=${currentPage - 1}`} aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Anterior</span>
                    </Link>
                </li>

                <PagesLinks startPage={startPage} endPage={endPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <li className={`page-item ${parseInt(currentPage) === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`?page=${parseInt(currentPage) + 1}`} aria-label="Siguiente">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Següent</span>
                    </Link>
                </li>
                
                <li className={`page-item ${parseInt(currentPage) === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`?page=${totalPages}`} aria-label="Siguiente">
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
                <Link className="page-link" to={`?page=${i}`} onClick={() => setCurrentPage(i)}>{i}</Link>
            </li>
        )
    }

    return pageLinks;
}

export default ReservaList;