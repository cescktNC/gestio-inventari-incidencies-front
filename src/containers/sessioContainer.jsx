import { Route, Routes } from "react-router-dom";

import SessioList from "../components/sessioComponents/sessioList"
import SessioCreate from "../components/sessioComponents/sessioCreate"
import SessioDelete from "../components/sessioComponents/sessioDelete"
import SessioUpdate from "../components/sessioComponents/sessioUpdate"


function ReservaContainer() {

    return (

        <Routes>

            <Route path="/list" element={<SessioList />} />
            <Route path="/create" element={<SessioCreate />} />
            <Route path="/delete/:id" element={<SessioDelete />} />
            <Route path="/update/:id" element={<SessioUpdate />} />

        </Routes>
    )

}
export default ReservaContainer;