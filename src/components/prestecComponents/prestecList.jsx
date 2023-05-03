import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleUser.css';
import '../../css/styleExemplar.css';


function PrestecList(){
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetch("http://localhost:5000/prestec/APIlist?page=" + currentPage,{
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
        <div className="d-flex align-items-center ">
            <div className="card mt-2">
                <div className="card-body">
                    <h5 className="card-title">Prestec</h5>
                    <div className="mx-auto">
                        <PrestecTable list={list} />
                        <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PrestecTable({list}){

    return(
        <table className="table table-responsive table-striped table-hover ">
            <thead className="thead-green">
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Data d'inici</th>
                    <th scope="col">Data Retorn</th>
                    <th scope="col">Codi Exemplar</th>
                    <th scope="col">QR Exemplar</th>
                    <th scope="col">DNI Usuari</th>
                    <th scope="col">Estat</th>
                    <th scope="col" colSpan={3} className="W-15">
                        <Link to="/home/prestec/create" className="btn btn-primary">Nou</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <PrestecTbody list={list} />
            </tbody>
        </table>
    )

}

function PrestecTbody({list}){

    return list.map((prestec, index) =>( 
        <tr key={index}>

            <td className="align-middle">
                { prestec.codi }
            </td>
            <td className="align-middle">
                { prestec.dataInici.substring(0, 10).split("-").reverse().join("-") }
            </td>
            <td className="align-middle">
                { prestec.dataRetorn.substring(0, 10).split("-").reverse().join("-") }
            </td>
            <td className="align-middle">
                {prestec.codiExemplar && (
                    prestec.codiExemplar.codi 
                )}
            </td>
            <td className="align-middle SVGcontainer" dangerouslySetInnerHTML={{ __html: (prestec.codiExemplar && (prestec.codiExemplar.qr)) }}>
            </td>
            <td className="align-middle">
                { prestec.dniUsuari.dni }
            </td>
            <td className="align-middle">
                { prestec.estat }
            </td>
            <td className="align-middle">
                <Link className="btn btn-secondary" to={`/home/prestec/update/${prestec._id}`}>Editar</Link>
            </td>
            <td className="align-middle">
                <Link className="btn btn-danger" to={`/home/prestec/delete/${prestec._id}`}>Eliminar</Link>
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

export default PrestecList;