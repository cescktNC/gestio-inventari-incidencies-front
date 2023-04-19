import { Route, Routes } from "react-router-dom";

import CentreList from "../components/centreComponent/centreList"
import CentreCreate from "../components/centreComponent/centreCreate"
import CentreDelete from "../components/centreComponent/centreDelete"
import CentreUpdate from "../components/centreComponent/centreUpdate"


function CentreContainer() {

    return (

        <Routes>

            <Route path="/list" element={<CentreList />} />
            <Route path="/create" element={<CentreCreate />} />
            <Route path="/delete/:id" element={<CentreDelete />} />
            <Route path="/update/:id" element={<CentreUpdate />} />

        </Routes>
    )

}
export default CentreContainer;