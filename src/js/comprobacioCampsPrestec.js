export function ComprobacioDataInici(dataInici, { handleComprobacio, handleErrors }) {
    let errorDataInici = '';
    let dataActual = new Date();
    let dataInput = new Date(dataInici)

    if (dataInici === '') {
        errorDataInici = "El camp Data d'inici es obligatori";
        handleComprobacio('comprobacioDataInici', false);
    } else if (dataActual > dataInput) {
        errorDataInici = "La data d'inici no pot ser anterior a la data actual";
        handleComprobacio('comprobacioDataInici', false);
    }
    else handleComprobacio('comprobacioDataInici', true);

    handleErrors('errorDataInici', errorDataInici)
}

export function ComprobacioDataRetorn(dataRetorn, { dataInici, handleComprobacio, handleErrors }) {
    let errorDataRetorn = '';
    let dataActual = new Date();
    let dataIniciInput = new Date(dataInici);
    let dataRetornInput = new Date(dataRetorn);

    if (dataRetorn === '') {
        errorDataRetorn = 'El camp data de retorn es obligatori';
        handleComprobacio('comprobacioDataRetorn', false);
    } else if (dataActual > dataRetornInput) {
        errorDataRetorn = 'La data de retorn no pot ser anterior a la data actual';
        handleComprobacio('comprobacioDataRetorn', false);
    } else if(dataIniciInput > dataRetornInput){
        errorDataRetorn = "La data de retorn no pot ser anterior a la data d'inici";
        handleComprobacio('comprobacioDataRetorn', false);
    }
    else handleComprobacio('comprobacioDataRetorn', true);

    handleErrors('errorDataRetorn', errorDataRetorn)
}