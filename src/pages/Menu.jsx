import React, {useState} from 'react';
import MenuContainer from "../containers/menuContainer";
import UserContainer from "../containers/userContainer";
import { useEffect } from "react";
import "../css/styleMenu.css";

export function Menu() {
	const [user, setUser] = useState([]);

	useEffect(() => {
		fetch(
			"http://localhost:5000/usuaris/user/" +
				window.localStorage.getItem("usuariId"),
		)
			.then(response => response.json())
			.then(json => {
				setUser(json.usuari);
			});
	}, []);
  
	return (
		<div className="container">
			<div className="divMenu BG-black">
				<MenuContainer user={user} />
			</div>
			<div className="divContingut">
				<UserContainer user={user} />
			</div>
		</div>
	);

}
