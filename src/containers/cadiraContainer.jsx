import { Route, Routes } from "react-router-dom";

import CadiraList from "../components/cadiraComponent/cadiraList"
import CadiraCreate from "../components/cadiraComponent/cadiraCreate"
import CadiraDelete from "../components/cadiraComponent/cadiraDelete"
import CadiraUpdate from "../components/cadiraComponent/cadiraUpdate"


function CategoriaContainer() {

    return (

        <Routes>

            <Route path="/list" element={<CadiraList />} />
            <Route path="/create" element={<CadiraCreate />} />
            <Route path="/delete/:id" element={<CadiraDelete />} />
            <Route path="/update/:id" element={<CadiraUpdate />} />

        </Routes>
    )

}
export default CategoriaContainer;