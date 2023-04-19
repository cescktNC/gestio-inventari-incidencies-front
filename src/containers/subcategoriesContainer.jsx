import { Route, Routes } from "react-router-dom";

import SubCategoriaList from "../components/subCategoriaComponent/subCategoriesList"
import SubCategoriaCreate from "../components/subCategoriaComponent/subCategoriesCreate"
import SubCategoriaDelete from "../components/subCategoriaComponent/subCategoriesDelete"
import SubCategoriaUpdate from "../components/subCategoriaComponent/subCategoriesUpdate"


function subCategoriaContainer() {

    return (

        <Routes>

            <Route path="/list" element={<SubCategoriaList />} />
            <Route path="/create" element={<SubCategoriaCreate />} />
            <Route path="/delete/:id" element={<SubCategoriaDelete />} />
            <Route path="/update/:id" element={<SubCategoriaUpdate />} />

        </Routes>
    )

}
export default subCategoriaContainer;