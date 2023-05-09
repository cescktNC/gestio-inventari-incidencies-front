import { Route, Routes} from "react-router-dom";
import IncidenciaList from "../components/incidenciaComponent.jsx/incidenciaList";
import IncidenciaCreate from "../components/incidenciaComponent.jsx/incidenciaCreate";
import IncidenciaUpdate from "../components/incidenciaComponent.jsx/incidenciaUpdate";
function IncidenciaContainer(){
    return(
        <Routes>

            <Route path="/list" element={<IncidenciaList />} />
            <Route path="/create" element={<IncidenciaCreate />} /> 
            <Route path="/update/:id" element={<IncidenciaUpdate />} />

        </Routes>
    )
}

export default IncidenciaContainer;