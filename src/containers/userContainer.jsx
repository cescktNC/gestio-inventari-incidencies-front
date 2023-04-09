import UserShow from "../components/userShow";
import { Route, Routes} from "react-router-dom";

function UserContainer({user}){

    return(
        <Routes>

            <Route path="/show" element={<UserShow user={user}/>} />

        </Routes>
    )

}
export default UserContainer;