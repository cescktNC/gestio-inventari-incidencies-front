import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleCategories.css'

function PlantaList() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/planta/APIlist?page=" + currentPage)
            .then(response => response.json())
            .then(json => {    
                console.log(json)           
                setList(json.list);
                setCurrentPage(json.currentPage);
                setTotalPages(json.totalPages);
            });
    }, [currentPage]);

    return (
        <div>
            <div className="card mt-2 w-100">
                <div className="card-body">
                    <h5 className="card-title">Planta</h5>
                    <div className="mx-auto">
                        <PlantaTable list={list} />
                        <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function PlantaTable({ list }) {

    return (
        <table className="table table-responsive table-striped table-hover ">
            <thead>
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Nom</th>
                    <th scope="col">CodiCentre</th>
                    <th scope="col">Planol</th>
                    <th scope="col" colSpan={2}>
                        <Link to="/home/planta/create" className="btn btn-primary">Nou</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <PlantaTbody list={list}></PlantaTbody>
            </tbody>
        </table>
    )

}

function PlantaTbody({ list }) {

    return list.map((planta, index) => (
        <tr key={index}>
            <td>
                {planta.codi}
            </td>
            <td>
                {planta.nom}
            </td>
            <td>
                {planta.codiCentre}
            </td>
            <td className="W-15">
                <img className="img-fluid mx-auto w-50 h-50" src={'http://localhost:5000/'+ planta.planol} alt="" />
            </td>
            <td className="edit-delete-cell"> 
                <Link className="btn btn-secondary" to={`/home/planta/update/${planta._id}`}>Editar</Link>
                <Link className="btn btn-danger" to={`/home/planta/delete/${planta._id}`}>Eliminar</Link>
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

export default PlantaList;