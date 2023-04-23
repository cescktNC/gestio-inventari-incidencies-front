import { Route, Routes } from "react-router-dom";

import PrestecList from "../components/prestecComponents/prestecList";
import PrestecCreate from "../components/prestecComponents/prestecCreate";
import PrestecUpdate from "../components/prestecComponents/prestecUpdate";

function PrestecContainer(){
    return (

        <Routes>

            <Route path="/list" element={<PrestecList />} />
            <Route path="/create" element={<PrestecCreate />} />
            {/* <Route path="/delete/:id" element={<LocalitzacioDelete />} /> */}
            <Route path="/update/:id" element={<PrestecUpdate />} />

        </Routes>
    )
}

export default PrestecContainer;