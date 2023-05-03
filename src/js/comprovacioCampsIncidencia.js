export function ComprobacioCodiExemplar(codiExemplar, { handleComprobacio, handleErrors }){
    let pattCodiExemplar = /^[0-9]{2}\/[0-9]{2}-[0-9]{2}\/[0-9]{2}-[0-9]{2}\/[0-9]{2}$/;
    let errorCodiExemplar = '';

    if(codiExemplar === '') handleComprobacio('comprobacioCodiExemplar', true);
    else if(!pattCodiExemplar.test(codiExemplar)){
        errorCodiExemplar = 'Format incorrecte';
        handleComprobacio('comprobacioCodiExemplar', false);
    }
    handleErrors('errorCodiExemplar', errorCodiExemplar)
}
