import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

function ComentariList(){
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(!searchParams.get('page') ? 1 : searchParams.get('page'));
    const [totalPages, setTotalPages] = useState(0);

	const [errorBack, setErrorBack] = useState('');
    
    useEffect(() => {
        fetch("http://localhost:5000/comentari/comment/list/" + id + "?page="+currentPage,{
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
    }, [currentPage, id]);

    return(
        <div className="d-flex align-items-center ">
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="card-title">Comentaris</h5>
                {(errorBack !== '' 
                    ? (<DivError error={errorBack}  />) 
                    : (
                        <div className="mx-auto">
                            <ComentariTable list={list} id={id} />
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

function ComentariTable({list, id}){

    return(
        <table className="table table-responsive table-striped table-hover ">
            <thead className="thead-green">
                <tr>
                    <th scope="col">Codi incidencia</th>
                    <th scope="col">Nom d'usuari</th>
                    <th scope="col">Data</th>
                    <th scope="col">Descripcio</th>
                    <th scope="col">
                        <Link to={"/home/comentari/create/" + id} className="btn btn-primary">Nou</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <ComentariTbody list={list}></ComentariTbody>
            </tbody>
        </table>
    )

}

function ComentariTbody({list}){

    return list.map((comentari, index) =>( 
        <tr key={index}>
            <td>
                { comentari.codiIncidencia.codi }
            </td>
            <td>
                { comentari.codiUsuari.nom }
            </td>
            <td>
                { comentari.data.substring(0, 10).split("-").reverse().join("-") }
            </td>
            <td>
                { comentari.descripcio }
            </td>   
            <td></td> 
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

export default ComentariList;