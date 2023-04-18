import { Route, Routes} from "react-router-dom";

import MaterialList from "../components/materialComponent/materialList";
// import UserCreate from "../components/userComponent/userCreate"
// import UserUpdate from "../components/userComponent/userUpdate"
// import UserDelete from '../components/userComponent/userDelete';

function InventoryContainer({user}){

    return(
        <Routes>

            <Route path="/list" element={<MaterialList />} />
            {/* <Route path="/create" element={<UserCreate />} />
            <Route path="/update/:id" element={<UserUpdate />} />
            <Route path="/delete/:id" element={<UserDelete />} /> */}

        </Routes>
    )

}

export default InventoryContainer;