import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleCategories.css';
// import '../../css/styleSessio.css';

function SessioList() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [errorBack, setErrorBack] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/sessio/APIlist?page=" + currentPage,{
            headers: { 
                "Authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json",
                "Accept-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {               
            if(json.error) setErrorBack(json.error);
            else{
                setList(json.list);
                setCurrentPage(json.currentPage);
                setTotalPages(json.totalPages);
            }
        });
    }, [currentPage]);

    return (
        <div className="taula">
            <div className="card mt-2 w-100">
                <div className="card-body">
                    <h3 className="card-title">Sessió</h3>
                    {(errorBack !== '' 
                        ? (<DivError error={errorBack}  />) 
                        : (
                            <div className="mx-auto">
                                <SessioTable list={list} />
                                <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

function DivError({error}){
    return(
        <div className="alert alert-danger">
            <p className="text-danger">{error}</p>
        </div>
    )
}

function SessioTable({ list }) {

    return (
        <table className="table table-responsive table-hover ">
            <thead>
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Nom</th>
                    <th scope="col" className="text-center">CodiReserva</th>
                    <th scope="col" className="text-center">
                        <Link to="/home/sessio/create" className="btn btn-primary">Nova</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <SessioTbody list={list}></SessioTbody>
            </tbody>
        </table>
    )

}

function SessioTbody({ list }) {

    return list.map((sessio, index) => (
        <tr key={index}>
            <td>
                {sessio.codi}
            </td>
            <td>
                {sessio.nom}
            </td>
            <td className="text-center">
                {sessio.codiReserva.codi}
            </td>
            <td className="edit-delete-cell text-center">
                <Link className="btn btn-secondary" to={`/home/sessio/update/${sessio._id}`}>Edit</Link>
                <Link className="btn btn-warning " to={`/home/reservaCadira/${sessio._id}`}>Cadires</Link>
                <Link className="btn btn-success" to={`/home/tickets/${sessio._id}`}>Tickets</Link>
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

export default SessioList;