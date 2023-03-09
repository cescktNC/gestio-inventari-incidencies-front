import React from "react";
import "../css/styleLlistatMenu.css";

function llistatMenu() {
  return (
    <ul className="menu">
      <CreacioContingutInventari />
    </ul>
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
