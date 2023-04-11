import { Route, Routes} from "react-router-dom";

import UserShow from "../components/userComponent/userShow";
import UserList from "../components/userComponent/userList";
import UserUpdate from "../components/userComponent/userUpdate"

function UserContainer({user}){

    return(
        <Routes>

            <Route path="/show" element={<UserShow user={user}/>} />
            <Route path="/list" element={<UserList />} />

        </Routes>
    )

}
export default UserContainer;