let carrec;

export function guardarCarrec(){
    carrec = window.localStorage.getItem('carrec');
}

export function nomesAdmin(){
    return (carrec === 'Administrador');

}

export function nomesDirector(){
    return (carrec === 'Director');
}

export function nomesEquipDocent(){
    return(!['Alumne', 'Conserge', 'Manteniment'].includes(carrec));
}

export function nomesTreballadors(){
    return(carrec !== 'Alumne');
}

export function nomesEncaregatMaterial(){
    return(['Administrador', 'Encarregat Inventari'].includes(carrec));
}