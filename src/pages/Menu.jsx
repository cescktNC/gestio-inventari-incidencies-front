import MenuContainer from "../containers/menuContainer";
import React from "react";
import "../css/styleMenu.css";

export function Menu() {
	return (
		<div className="container">
			<div className="divMenu BG-black">
				<MenuContainer />
			</div>
		</div>
	);
}
