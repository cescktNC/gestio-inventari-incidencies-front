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

export function ComprobacioName(name, { handleComprobacio, handleErrors }) {
    let errorName = '';

    if (name === '') {
        errorName = 'El camp Nom es obligatori';
        handleComprobacio('comprobacioNom', false);
    }

    else handleComprobacio('comprobacioNom', true);

    handleErrors('errorName', errorName)
}

export function ComprobacioDescripcio(descripcio, { handleComprobacio, handleErrors }) {
    let errorDescripcio = '';

    if (descripcio === '') {
        errorDescripcio = 'El camp Descripció es obligatori';
        handleComprobacio('comprobacioDescripcio', false);
    }

    else handleComprobacio('comprobacioDescripcio', true);

    handleErrors('errorDescripcio', errorDescripcio)
}

export function ComprobacioAnyCompra(anyCompra, { handleComprobacio, handleErrors }) {
    let errorAnyCompra = '';
    let dataActual = new Date();
    let dataInput = new Date(anyCompra)

    if (anyCompra === '') {
        errorAnyCompra = 'El camp Data de compra es obligatori';
        handleComprobacio('comprobacioAnyCompra', false);
    } else if(dataActual < dataInput){
        errorAnyCompra = "La data de compra no pot ser inferior a la data d'avui";
        handleComprobacio('comprobacioAnyCompra', false);
    }
    else handleComprobacio('comprobacioAnyCompra', true);

    handleErrors('errorAnyCompra', errorAnyCompra)
}

export function ComprobacioFotografia(fotografia, { handleComprobacio, handleErrors }) {
    let errorFotografia = '';
    if (fotografia === '') {
        errorFotografia = 'El camp Fotografia es obligatori';
        handleComprobacio('comprobacioFotografia', false);
    } else if(!['image/png', 'image/jpeg', 'image/jpg'].includes(fotografia.type)){
        errorFotografia = "La fotografia ha de ser un fitxer 'png', 'jpeg', 'jpg'";
        handleComprobacio('comprobacioFotografia', false);
    }
    else handleComprobacio('comprobacioFotografia', true);

    handleErrors('errorFotografia', errorFotografia);
}

export function ComprobacioFitxer(fitxer, { handleComprobacio, handleErrors }) {
    let errorFitxer = '';
    if (fitxer === '') {
        errorFitxer = 'El camp Fitxer es obligatori';
        handleComprobacio('comprobacioFitxer', false);
    } else if(!['application/json', 'text/csv'].includes(fitxer.type)){
        errorFitxer = "La fitxer ha de ser un fitxer 'png', 'jpeg', 'jpg'";
        handleComprobacio('comprobacioFitxer', false);
    }
    else handleComprobacio('comprobacioFitxer', true);

    handleErrors('errorFitxer', errorFitxer);
}

export function ComprobacioPreuCompra(preuCompra, { handleComprobacio, handleErrors }) {
    let patt = /^\d+(\.\d+)?$/;
    let errorPreuCompra = '';
    if (preuCompra === '') {
        errorPreuCompra = 'El camp Preu de compra es obligatori';
        handleComprobacio('comprobacioPreuCompra', false);
    } else if(!patt.test(preuCompra)){
        errorPreuCompra = "El preu de compra ha de ser un numero i no ha de ser negatiu";
        handleComprobacio('comprobacioPreuCompra', false);
    }
    else handleComprobacio('comprobacioPreuCompra', true);

    handleErrors('errorPreuCompra', errorPreuCompra);
}