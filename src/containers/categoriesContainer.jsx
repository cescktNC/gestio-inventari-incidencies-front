import { Route, Routes } from "react-router-dom";

import CategoriaList from "../components/categoriesComponent/categoriaList"
import CategoriaCreate from "../components/categoriesComponent/categoriesCreate"
import CategoriaDelete from "../components/categoriesComponent/categoriesDelete"
import CategoriaUpdate from "../components/categoriesComponent/categoriesUpdate"


function CategoriaContainer() {

    return (

        <Routes>

            <Route path="/list" element={<CategoriaList />} />
            <Route path="/create" element={<CategoriaCreate />} />
            <Route path="/delete/:id" element={<CategoriaDelete />} />
            <Route path="/update/:id" element={<CategoriaUpdate />} />

        </Routes>
    )

}
export default CategoriaContainer;