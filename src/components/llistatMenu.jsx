import React from "react";
import "../css/styleLlistatMenu.css";
import '../css/styleImage.css';

function llistatMenu() {
  const name = 'Francesc Navarro';
  const email = 'cesccat82@gmail.com';
  const imageUrl = '/images/padregato.jpg';
  return (
    <>
      <div className="user-profile profile-left profile-blue">
      <img src={imageUrl} alt="Profile" className="profile-image" />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>
      </div>
      <ul className="menu">
        <CreacioContingutInventari />
      </ul>
    </>
  );
}
function CreacioContingutInventari() {
  function handleClick(a) {
    const active = document.getElementsByClassName("active")[0];
    if (active) active.classList.remove("active");
    a.classList.add("active");
  }
  return (
    <> 
      <li>
        <div>
          <span className="span">Inventari</span>
          <p className="p">Gestió d'inventari</p>
        </div>
      </li>
      <a
        href="http://localhost:3000/"
        className="a"
        role="button"
        onClick={(event) => handleClick(event.currentTarget)}
      >
        <div className="divEnllaç">
          <span className="spanSub">Categories</span>
        </div>
      </a>
      <a
        href="http://localhost:3000/"
        className="a"
        role="button"
        onClick={(event) => handleClick(event.currentTarget)}
      >
        <div className="divEnllaç">
          <span className="spanSub">Subcategories</span>
        </div>
      </a><a
        href="http://localhost:3000/"
        className="a"
        role="button"
        onClick={(event) => handleClick(event.currentTarget)}
      >
        <div className="divEnllaç">
          <span className="spanSub">Materials</span>
        </div>
      </a><a
        href="http://localhost:3000/"
        className="a"
        role="button"
        onClick={(event) => handleClick(event.currentTarget)}
      >
        <div className="divEnllaç">
          <span className="spanSub">Exemplars</span>
        </div>
      </a>
    </>
  );
}

export default llistatMenu;
