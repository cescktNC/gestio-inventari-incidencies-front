import MenuContainer from "../containers/menuContainer";
import UserContainer from "../containers/userContainer";
import { useEffect, useState, React } from "react";
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

	console.log(user);

	// const user = {
	// 	nom: "Francesc",
	// 	cognoms: "Navarro",
	// 	dni: "11112222S",
	// 	carrec: "Professor",
	// 	email: "cesccat82@gmail.com",
	// 	profilePicture: "/images/padregato.jpg",
	// };

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
