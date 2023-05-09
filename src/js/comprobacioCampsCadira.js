export function ComprobacioFila(fila, { handleComprobacio, handleErrors }){
    let pattFila = /^(0|[1-9]\d*)$/;
    let errorFila = '';

    if (fila === '') {
        errorFila = 'El camp Fila es obligatori';
        handleComprobacio('comprobacioFila', false);
    } else if (!pattFila.test(fila)) {
        errorFila = 'La fila no pot contenir lletres, caracters especials o ser negatiu';
        handleComprobacio('comprobacioFila', false);
    }
    else handleComprobacio('comprobacioFila', true);

    handleErrors('errorFila', errorFila)
}

export function ComprobacioNumero(numero, { handleComprobacio, handleErrors }){
    let pattNumero = /^(0|[1-9]\d*)$/;
    let errorNumero = '';

    if (numero === '') {
        errorNumero = 'El camp Numero es obligatori';
        handleComprobacio('comprobacioNumero', false);
    } else if (!pattNumero.test(numero)) {
        errorNumero = 'El numero no pot contenir lletres, caracters especials o ser negatiu';
        handleComprobacio('comprobacioNumero', false);
    }
    else handleComprobacio('comprobacioNumero', true);

    handleErrors('errorNumero', errorNumero)
}