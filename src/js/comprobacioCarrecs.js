const carrec = window.localStorage.getItem('carrec');

export function nomesAdmin(){
    if(carrec === 'Administrador') return true;
    else return false;
}

export function nomesEquipDocent(){
    if(!['Alumne','Conserge','Manteniment'].includes(carrec)) return true;
    else return false;
}

export function nomesTreballadors(){
    if(carrec !== 'Alumne') return true;
    else return false;
}

export function nomesEncaregatMaterial(){
    if(['Administrador', 'Encarregat Inventari'].includes(carrec)) return true;
    else return false;
}