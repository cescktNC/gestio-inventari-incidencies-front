import React from 'react';

import Logo from '../components/logo';
import LlistatMenu from '../components/llistatMenu';

function menuContainer({user}) {
  return (
    <div>
        <Logo />
        <LlistatMenu user={user} />
    </div>
  )
}

export default menuContainer;