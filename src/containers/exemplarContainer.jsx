import { Route, Routes } from "react-router-dom";

import ExemplarList from "../components/exemplarContainer/exemplarList";
import ExemplarCreate from "../components/exemplarContainer/exemplarCreate";
import ExemplarUpdate from "../components/exemplarContainer/exemplarUpdate";
import ExemplarShow from "../components/exemplarContainer/exemplarShow";
import ExemplarImport from "../components/exemplarContainer/exemplarImport";

function ExemplarContainer(){
    return (

        <Routes>

            <Route path="/list" element={<ExemplarList />} />
            <Route path="/create" element={<ExemplarCreate />} />
            <Route path="/import" element={<ExemplarImport />} />
            <Route path="/show/:id" element={<ExemplarShow />} />
            <Route path="/update/:id" element={<ExemplarUpdate />} />

        </Routes>
    )
}

export default ExemplarContainer;