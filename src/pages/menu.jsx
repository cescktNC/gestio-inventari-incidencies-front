import React from "react";
import MenuContainer from "../containers/menuContainer";
import "../css/styleMenu.css";

function Menu() {
    return (
        <div className="container">
            <div className="divMenu BG-black">
                <MenuContainer />
            </div>
        </div>
    );
}

export default Menu;