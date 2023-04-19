import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../css/styleCategories.css'

function SubCategoryList() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/subcategories/APIlist?page=" + currentPage)
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
                <SubcategoryTable list={list} />
                <Paginate currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

function SubcategoryTable({ list }) {

    return (
        <table className="table table-responsive table-striped table-hover ">
            <thead>
                <tr>
                    <th scope="col">Codi</th>
                    <th scope="col">Nom</th>
                    <th scope="col">CodiCategoria</th>
                    <th scope="col">
                        <Link to="/home/subcategories/create" className="btn btn-primary">Nou</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <SubcategoryTbody list={list}></SubcategoryTbody>
            </tbody>
        </table>
    )

}

function SubcategoryTbody({ list }) {

    return list.map((subcategory, index) => (
        <tr key={index}>
            <td>
                {subcategory.codi}
            </td>
            <td>
                {subcategory.nom}
            </td>
            <td>
                {subcategory.codicategoria}
            </td>
            <td>
                <Link className="btn btn-secondary" to={`/home/subcategories/update/${subcategory._id}`}>Edit</Link>
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

function PagesLinks({ startPage, endPage, currentPage, setCurrentPage }) {
    const pageLinks = [];
    for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(
            <li className={`page-item ${i === parseInt(currentPage) ? 'active' : ''}`} key={i}>
                <Link className="page-link" to={`?page=${i}`} onClick={() => setCurrentPage(i)}>{i}</Link>
            </li>
        )
    }

    return pageLinks;
}

export default SubCategoryList;