import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleUser.css'

function UserList(){
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetch("http://localhost:5000/usuaris/user?page=" + currentPage)
        .then(response => response.json())
        .then(json => {
            setList(json.list);
            setCurrentPage(json.currentPage);
            setTotalPages(json.totalPages);
        });
    }, [currentPage]);

    console.log(currentPage)
    console.log(totalPages)

    return (
        <div className="d-flex align-items-center ">
            <div className="mx-auto">
                <UserTable list={list} />
                <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

function UserTable({list}){

    return(
    <table className="table table-responsive table-striped table-hover ">
        <thead>
            <tr>
                <th scope="col">Nom</th>
                <th scope="col">Cognoms</th>
                <th scope="col">DNI</th>
                <th scope="col">Càrrec</th>
                <th scope="col">Email</th>
                <th scope="col">Imatge de perfil</th>
                <th scope="col">
                    <Link to="#/create" className="btn btn-primary">Nou</Link>
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

    return list.map((user, index) =>( 
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
            <td>
                <img className="img-fluid mx-auto imgLlistat" src={'http://localhost:5000/'+ user.profilePicture} alt="" />
            </td>
            <td>
                <Link className="btn btn-secondary" to="*/update/{user._id}">Edit</Link>
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
                        <span className="sr-only">Siguiente</span>
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

export default UserList;