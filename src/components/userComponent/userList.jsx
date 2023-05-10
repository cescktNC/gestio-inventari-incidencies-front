import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleUser.css'

import {nomesAdmin, nomesEquipDocent, nomesDirector } from "../../js/comprobacioCarrecs"

function UserList(){
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [errorBack, setErrorBack] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/usuaris/user?page=" + currentPage,{
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
        <div className="d-flex align-items-center ">
            <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title">Usuaris</h5>
                    {(errorBack !== '' 
                        ? (<DivError error={errorBack}  />) 
                        : (
                            <div className="mx-auto">
                                <UserTable list={list} />
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

function UserTable({list}){

    return(
        <table className="table table-responsive table-hover ">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Cognoms</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Càrrec</th>
                    <th scope="col">Email</th>
                    <th scope="col">Imatge de perfil</th>
                    <th scope="col" colSpan={3} className="W-15">
                        <Link to="/home/user/create" className="btn btn-primary">Nou</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <UserTbody list={list}></UserTbody>
            </tbody>
        </table>
    )

}

function UserTbody({list}){

    return list.map((user, index) => ( 
        <tr key={index}>
            <td>
                { user.nom }
            </td>
            <td>
                { user.cognoms }
            </td>
            <td>
                { user.dni }
            </td>
            <td>
                { user.carrec }
            </td>
            <td>
                { user.email }
            </td>
            <td className="W-15">
                <img className="img-fluid mx-auto w-50 h-50" src={'http://localhost:5000/'+ user.profilePicture} alt="" />
            </td>
            <td>
                {(nomesAdmin() || nomesEquipDocent()) && (
                    <Link className="btn btn-secondary" to={`/home/user/show/${user._id}`}>Perfil</Link>  
                )}
            </td>
            {(nomesAdmin() || nomesDirector()) && (
                <>
                    <td>
                        <Link className="btn btn-secondary" to={`/home/user/update/${user._id}`}>Editar</Link>
                    </td>
                    <td>
                        <Link className="btn btn-danger" to={`/home/user/delete/${user._id}`}>Eliminar</Link>
                    </td>
                </>
            )}
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

export default UserList;