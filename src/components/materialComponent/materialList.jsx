import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MaterialList(){
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetch("http://localhost:5000/materials/material?page=" + currentPage)
        .then(response => response.json())
        .then(json => {
            setList(json.list);
            setCurrentPage(json.currentPage);
            setTotalPages(json.totalPages);
        });
    }, [currentPage]);

    return(
        <div className="d-flex align-items-center ">
            <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title">Usuaris</h5>
                    <div className="mx-auto">
                        <MaterialTable list={list} />
                        <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function MaterialTable({list}){

    return(
        <table className="table table-responsive table-striped table-hover ">
            <thead className="thead-green">
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Descripció</th>
                    <th scope="col">Preu de compra</th>
                    <th scope="col">Any de compra</th>
                    <th scope="col">Fotografia</th>
                    <th scope="col">Nom Categoria</th>
                    <th scope="col">
                        <Link to="/home/material/create" className="btn btn-primary">Nou</Link>
                    </th>
                    <th scope="col">
                        <Link to="/materials/import" class="btn btn-primary">Importar</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <MaterialTbody list={list}></MaterialTbody>
            </tbody>
        </table>
    )

}

function MaterialTbody({list}){

    return list.map((material, index) =>( 
        <tr key={index}>
            <td>
                { material.codi }
            </td>
            <td>
                { material.nom }
            </td>
            <td>
                { material.descripcio }
            </td>
            <td>
                { material.preuCompra + '€' }
            </td>
            <td>
                { material.anyCompra.substring(0, 4) }
            </td>
            <td className="W-15">
                <img className="img-fluid mx-auto w-50 h-50" src={'http://localhost:5000/'+ material.fotografia} alt="" />
            </td>
            <td>
                { material.codiSubCategoria.nom }
            </td>
            <td>
                <Link className="btn btn-secondary" to={`/home/material/show/${material._id}`}>Perfil</Link>  
            </td>        
            <td>
                <Link className="btn btn-secondary" to={`/home/material/update/${material._id}`}>Editar</Link>
            </td>
            <td>
                <Link className="btn btn-danger" to={`/home/material/delete/${material._id}`}>Eliminar</Link>
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
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        aria-label="Siguiente"
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Següent</span>
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

export default MaterialList;