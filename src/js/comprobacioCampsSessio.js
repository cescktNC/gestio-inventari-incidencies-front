export function ComprobacioName(name, { handleComprobacio, handleErrors }) {
    let errorName = '';

    if (name === '') {
        errorName = 'El camp Nom es obligatori';
        handleComprobacio('comprobacioNom', false);
    }

    else handleComprobacio('comprobacioNom', true);

    handleErrors('errorName', errorName)
}

export function ComprobacioCodi (codi, {handleComprobacio, handleErrors}) {
    let errorCodi = '';

    if (codi === '') {
        errorCodi = 'El camp codi es obligatori';
        handleComprobacio('comprobacioCodi', false);
    }

    else handleComprobacio('comprobacioCodi', true);

    handleErrors('errorCodi', errorCodi)
}