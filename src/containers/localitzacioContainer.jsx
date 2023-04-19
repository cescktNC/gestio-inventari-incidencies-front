import { Route, Routes } from "react-router-dom";

import LocalitzacioList from "../components/localitzacioComponent/localitzacioList"
import LocalitzacioCreate from "../components/localitzacioComponent/localitzacioCreate"
import LocalitzacioDelete from "../components/localitzacioComponent/localitzacioDelete"
import LocalitzacioUpdate from "../components/localitzacioComponent/localitzacioUpdate"


function LocalitzacioContainer() {

    return (

        <Routes>

            <Route path="/list" element={<LocalitzacioList />} />
            <Route path="/create" element={<LocalitzacioCreate />} />
            <Route path="/delete/:id" element={<LocalitzacioDelete />} />
            <Route path="/update/:id" element={<LocalitzacioUpdate />} />

        </Routes>
    )

}
export default LocalitzacioContainer;