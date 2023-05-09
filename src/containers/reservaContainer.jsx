import { Route, Routes } from "react-router-dom";

import ReservaList from "../components/reservaComponents/reservaList"
import ReservaCreate from "../components/reservaComponents/reservaCreate"
import ReservaDelete from "../components/reservaComponents/reservaDelete"
import ReservaUpdate from "../components/reservaComponents/reservaUpdate"


function ReservaContainer() {

    return (

        <Routes>

            <Route path="/list" element={<ReservaList />} />
            <Route path="/create" element={<ReservaCreate />} />
            <Route path="/delete/:id" element={<ReservaDelete />} />
            <Route path="/update/:id" element={<ReservaUpdate />} />

        </Routes>
    )

}
export default ReservaContainer;