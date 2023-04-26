import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

function IncidenciaList(){

    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/incidencies/APIList?page=" + currentPage)
            .then(response => response.json())
            .then(json => {          
                console.log(json)     
                setList(json.list);
                setCurrentPage(json.currentPage);
                setTotalPages(json.totalPages);
            });
    }, [currentPage]);

    return (
        <div className="d-flex align-items-center ">
            <div className="mx-auto">
                <IncidenciaTable list={list} />
                <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

function IncidenciaTable({ list }) {

    return (
        <table className="table table-responsive table-hover ">
            <thead>
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Estat</th>
                    <th scope="col">Data</th>
                    <th scope="col">Tipologia</th>
                    <th scope="col">Descripció</th>
                    <th scope="col">Ubicació</th>
                    <th scope="col">Material</th>
                    <th scope="col">Localització</th>
                    <th scope="col" colSpan={3}>
                        <Link to="/home/incidencia/create" className="btn btn-primary">Nou</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <IncidenciaTbody list={list}></IncidenciaTbody>
            </tbody>
        </table>
    )

}

function IncidenciaTbody({ list }) {

    return list.map((incidencia, index) => (
        <tr key={index}>
            <td>
                {incidencia.codi}
            </td>
            <td>
                {incidencia.estat}
            </td>
            <td>
                {incidencia.data.substring(0, 10)}
            </td>
            <td>
                {incidencia.tipologia}
            </td>
            <td>
                {incidencia.descripcio}
            </td>
            <td>
                {incidencia.ubicacio}
            </td>
            <td>
                {incidencia.codiExemplar !== undefined ? incidencia.codiExemplar.codiMaterial.nom : 'Element no inventariable'}
            </td>
            <td>
                {incidencia.codiLocalitzacio !== undefined ? incidencia.codiLocalitzacio.nom : 'Ubicació no resgistrada'}
            </td>
            <td>
                <Link className="btn btn-secondary" to={`/home/incidencia/update/${incidencia._id}`}>Editar</Link>
            </td>
            <td>
                <Link className="btn btn-secondary" to={`/home/comentari/list/${incidencia._id}`}>Comentar</Link>
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

export default IncidenciaList;