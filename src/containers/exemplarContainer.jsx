import { Route, Routes } from "react-router-dom";

import ExemplarList from "../components/exemplarContainer/exemplarList";
import ExemplarCreate from "../components/exemplarContainer/exemplarCreate";
import ExemplarUpdate from "../components/exemplarContainer/exemplarUpdate";

function ExemplarContainer(){
    return (

        <Routes>

            <Route path="/list" element={<ExemplarList />} />
            <Route path="/create" element={<ExemplarCreate />} />
            {/* <Route path="/delete/:id" element={<LocalitzacioDelete />} /> */}
            <Route path="/update/:id" element={<ExemplarUpdate />} />

        </Routes>
    )
}

export default ExemplarContainer;