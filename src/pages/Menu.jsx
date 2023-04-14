import MenuContainer from "../containers/menuContainer";
import UserContainer from "../containers/userContainer";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/styleMenu.css";

export function Menu() {
	const [user, setUser] = useState([]);
	useEffect(() => {
		fetch(
			"http://localhost:5000/usuaris/user/" + window.localStorage.getItem("id"),
			{
				method: "GET",
				headers: {
					"Authorization": "Bearer " + window.localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			}
		)
		.then(response => response.json())
		.then(json => {
			console.log(json)
			setUser(json.usuari);
		});
	}, []);


	return (

		<div className="containerPrincipal">
			<div className="divMenu BG-black">
				<MenuContainer user={user} />
			</div>
			<div className="container">
				<Routes>
					<Route path="/user/*" element={<UserContainer user={user} />} />
				</Routes>
				
			</div>
		</div>

	);

}


