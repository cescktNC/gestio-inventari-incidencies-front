import { Route, Routes } from "react-router-dom";
import ComentariList from "../components/comentariComponent/comentariList";
import ComentariCreate from "../components/comentariComponent/comentariCreate";

function ComentariContainer(){
    return(
        <Routes>

            <Route path="/list/:id" element={<ComentariList />} />
            <Route path="/create/:id" element={<ComentariCreate />} />
            {/* <Route path="/delete/:id" element={<CentreDelete />} /> */}
            {/* <Route path="/update/:id" element={<CentreUpdate />} /> */}

        </Routes>
    )
}

export default ComentariContainer;