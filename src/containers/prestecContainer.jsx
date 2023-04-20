import { Route, Routes } from "react-router-dom";

import PrestecList from "../components/prestecComponents/prestecList";
import PrestecCreate from "../components/prestecComponents/prestecCreate";

function PrestecContainer(){
    return (

        <Routes>

            <Route path="/list" element={<PrestecList />} />
            <Route path="/create" element={<PrestecCreate />} />
            {/* <Route path="/delete/:id" element={<LocalitzacioDelete />} /> */}
            {/* <Route path="/update/:id" element={<LocalitzacioUpdate />} /> */}

        </Routes>
    )
}

export default PrestecContainer;