export function ComprobacioDataInici(dataInici, { handleComprobacio, handleErrors }) {
    let errorDataInici = '';
    let dataActual = new Date();
    let dataInput = new Date(dataInici)

    if (dataInici === '') {
        errorDataInici = "El camp Data d'inici es obligatori";
        handleComprobacio('comprobacioName', false);
    } else if (dataActual > dataInput) {
        errorDataInici = "La data d'inici no pot ser anterior a la data actual";
        handleComprobacio('comprobacioName', false);
    }
    else handleComprobacio('comprobacioName', true);

    handleErrors('errorDataInici', errorDataInici)
}

export function ComprobacioDataRetorn(dataRetorn, { dataInici, handleComprobacio, handleErrors }) {
    let errorDataRetorn = '';
    let dataActual = new Date();
    let dataIniciInput = new Date(dataInici);
    let dataRetornInput = new Date(dataRetorn);

    if (dataRetorn === '') {
        errorDataRetorn = 'El camp data de retorn es obligatori';
        handleComprobacio('comprobacioName', false);
    } else if (dataActual > dataRetornInput) {
        errorDataRetorn = 'La data de retorn no pot ser anterior a la data actual';
        handleComprobacio('comprobacioName', false);
    } else if(dataIniciInput > dataRetornInput){
        errorDataRetorn = "La data de retorn no pot ser anterior a la data d'inici";
        handleComprobacio('comprobacioName', false);
    }
    else handleComprobacio('comprobacioName', true);

    handleErrors('errorDataRetorn', errorDataRetorn)
}