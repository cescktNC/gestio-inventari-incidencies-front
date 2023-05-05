export function ComprobacioCodi(codi, { handleComprobacio, handleErrors }) {
    let errorCodi = '';
    let pathCodi = /\d/;

    if (codi === '') {
        errorCodi = 'El camp Codi es obligatori';
        handleComprobacio('comprobacioCodi', false);
    } else if(!pathCodi.test(codi)){
        errorCodi = 'El camp Codi ha de ser un numero';
        handleComprobacio('comprobacioCodi', false);
    }
    else handleComprobacio('comprobacioCodi', true);

    handleErrors('errorCodi', errorCodi)
}

