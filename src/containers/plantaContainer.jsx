import { Route, Routes } from "react-router-dom";

import PlantaList from "../components/plantaComponents/plantaList"
import PlantaCreate from "../components/plantaComponents/plantaCreate"
import PlantaDelete from "../components/plantaComponents/plantaDelete"
import PlantaUpdate from "../components/plantaComponents/plantaUpdate"


function PlantaContainer() {

    return (

        <Routes>

            <Route path="/list" element={<PlantaList />} />
            <Route path="/create" element={<PlantaCreate />} />
            <Route path="/delete/:id" element={<PlantaDelete />} />
            <Route path="/update/:id" element={<PlantaUpdate />} />

        </Routes>
    )

}
export default PlantaContainer;