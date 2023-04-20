import { Route, Routes } from "react-router-dom";

import ExemplarList from "../components/exemplarContainer/exemplarList";

function ExemplarContainer(){
    return (

        <Routes>

            <Route path="/list" element={<ExemplarList />} />
            {/* <Route path="/create" element={<LocalitzacioCreate />} />
            <Route path="/delete/:id" element={<LocalitzacioDelete />} />
            <Route path="/update/:id" element={<LocalitzacioUpdate />} /> */}

        </Routes>
    )
}

export default ExemplarContainer;