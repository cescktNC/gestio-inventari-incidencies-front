import React, {useState} from 'react';
import MenuContainer from "../containers/menuContainer";
import UserContainer from "../containers/userContainer";
// import { useEffect, useState, React } from "react";
import "../css/styleMenu.css";

export function Menu() {
	// const [user, setUser] = useState([]);
	const [selectedUser, setSelectedUser] = useState("user1");
	// useEffect(() => {
	// 	fetch("http://localhost:5000")
	// 		.then(response => response.json())
	// 		.then(json => setUser(json));
	// }, []);

	const user1 = {
		nom: "Francesc",
		cognoms: "Navarro",
		dni: "11112222S",
		carrec: "Professor",
		email: "cesccat82@gmail.com",
		profilePicture: "/images/padregato.jpg",
	};
	const user2 = {
		nom: "Jordi",
		cognoms: "Mallafré",
		dni: "11111111A",
		carrec: "Professor",
		email: "jordim@gmail.com",
		profilePicture: "/images/profilePicture.png",
	};
	const user3 = {
		nom: "Xavi",
		cognoms: "Villena",
		dni: "33333333C",
		carrec: "Director",
		email: "xaviv@gmail.com",
		profilePicture: "/images/profilePicture.png",
	}

	const handleSelectUser = (user) => {
		setSelectedUser(user);
	};
	return (
		<div className="container">
			<div className="divMenu BG-black">
				<button onClick={() => handleSelectUser("user1")}>Francesc Navarro</button>
				<button onClick={() => handleSelectUser("user2")}>Jordi Mallafré</button>
				<button onClick={() => handleSelectUser("user3")}>Xavi Villena</button>
			</div>
			<div className="divContingut">
				<UserContainer user={selectedUser === "user1" ? user1 : selectedUser === "user2" ? user2 : user3} />
			</div>
		</div>
	);

}
