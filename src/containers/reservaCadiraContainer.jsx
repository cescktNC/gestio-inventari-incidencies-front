import { Route, Routes } from "react-router-dom";

import ReservaCadiraList from "../components/reservaCadiraComponent/reservaCadiraList";

function ReservaCadiraContainer(){
    return (

        <Routes>

            <Route path="/:id" element={<ReservaCadiraList />} />
            <Route path="/:id/*" element={<ReservaCadiraList />} />
            {/* <Route path="/create" element={<PrestecCreate />} /> */}
            {/* <Route path="/delete/:id" element={<LocalitzacioDelete />} /> */}
            {/* <Route path="/update/:id" element={<PrestecUpdate />} /> */}

        </Routes>
    )
}

export default ReservaCadiraContainer;