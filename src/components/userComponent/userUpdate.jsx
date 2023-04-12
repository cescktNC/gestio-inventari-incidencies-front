
import { useParams } from "react-router-dom";

function UserUpdate(){
    const { id } = useParams();
    return (
        <div>
          <h1>Actualizando usuario {id}</h1>
        </div>
      );
}

export default UserUpdate;