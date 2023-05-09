import { Route, Routes} from "react-router-dom";

import UserShow from "../components/userComponent/userShow";
import UserList from "../components/userComponent/userList";
import UserCreate from "../components/userComponent/userCreate"
import UserUpdate from "../components/userComponent/userUpdate"
import UserDelete from '../components/userComponent/userDelete';

function UserContainer({user}){

    return(
        <Routes>

            <Route path="/show/:id" element={<UserShow user={user}/>} />
            <Route path="/list" element={<UserList />} />
            <Route path="/create" element={<UserCreate />} />
            <Route path="/update/:id" element={<UserUpdate />} />
            <Route path="/delete/:id" element={<UserDelete />} />

        </Routes>
    )

}
export default UserContainer;