import React from 'react';
import Logo from '../components/logo';
import ProfileMenu from '../components/menuComponents/profileMenu';
import UserMenu from '../components/menuComponents/usuariMenu';
import InventariMenu from '../components/menuComponents/inventariMenu';
import GeneralMenu from '../components/menuComponents/generalMenu';
import ReservesMenu from '../components/menuComponents/reservesMenu';
import LogoFinal from '../components/menuComponents/logoFinal';

import "../css/styleImage.css";
import "../css/styleLlistatMenu.css";


// import LlistatMenu from '../components/llistatMenu';

function menuContainer({resultat, setIsLoggedIn}) {
  return (
    <div>
      <Logo />
      <div className="containerMenu">
        <ProfileMenu />
        <ul className="menu">
          <UserMenu setIsLoggedIn={setIsLoggedIn} />
          <InventariMenu resultat={resultat} />
          <GeneralMenu />
          <ReservesMenu />
        </ul>
        <LogoFinal />
      </div>
    </div>
  )
}

export default menuContainer;