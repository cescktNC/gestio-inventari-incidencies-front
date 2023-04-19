import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';


function UserDelete(){
    const { id } = useParams();
	const [errorBack, setErrorBack] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
    e.preventDefault();
        fetch("http://localhost:5000/usuaris/user/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.error !== undefined) setErrorBack(json.error);
            if(json.ok) navigate("/home/user/list")
        });
    }

    return(
        <main>
        <div className="card mt-4">
            <div className="card-header">
                <h5 className="card-title">Eliminar usuari</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="alert alert-danger" role="alert">
                        Estàs segur d'eliminar aquest usuari?
                    </div>	
                    <button type="submit" className="btn btn-danger">Delete</button>
                </form>

                {(errorBack !== '' && (<DivMessage message={errorBack}  />) )}

            </div>
        </div>
    </main>
    )
}

function DivMessage({message}){
    return(
        <div className="alert alert-primary mt-2">
            <p className="text-danger">{message}</p>
        </div>
    )
}


export default UserDelete;