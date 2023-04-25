import { Route, Routes} from "react-router-dom";
import IncidenciaList from "../components/incidenciaComponent.jsx/incidenciaList";
import IncidenciaCreate from "../components/incidenciaComponent.jsx/incidenciaCreate";
import IncidenciaEdit from "../components/incidenciaComponent.jsx/incidenciaEdit";
function IncidenciaContainer(){
    return(
        <Routes>

            <Route path="/list" element={<IncidenciaList />} />
            <Route path="/create" element={<IncidenciaCreate />} /> 
            <Route path="/update/:id" element={<IncidenciaEdit />} />

        </Routes>
    )
}

export default IncidenciaContainer;