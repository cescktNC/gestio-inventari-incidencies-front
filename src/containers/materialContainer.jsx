import { Route, Routes} from "react-router-dom";

import MaterialList from "../components/materialComponent/materialList";
import MaterialCreate from "../components/materialComponent/materialCreate";
import MaterialUpdate from "../components/materialComponent/materialUpdate";
import MaterialDelete from "../components/materialComponent/materialDelete";
import MaterialImport from "../components/materialComponent/materialImport";

function MaterialContainer(){

    return(
        <Routes>

            <Route path="/list" element={<MaterialList />} />
            <Route path="/create" element={<MaterialCreate />} />
            <Route path="/import" element={<MaterialImport />} />
            <Route path="/update/:id" element={<MaterialUpdate />} />
            <Route path="/delete/:id" element={<MaterialDelete />} />

        </Routes>
    )

}

export default MaterialContainer;