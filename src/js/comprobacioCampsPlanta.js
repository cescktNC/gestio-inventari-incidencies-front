export function ComprobacioPlanol(planol, { handleComprobacio, handleErrors }) {
    let errorPlanol = '';
    if (planol === '') {
        errorPlanol = 'El camp Planol es obligatori';
        handleComprobacio('comprobacioPlanol', false);
    } else if(!['image/png', 'image/jpeg', 'image/jpg'].includes(planol.type)){
        errorPlanol = "El planol ha de ser un fitxer 'png', 'jpeg', 'jpg'";
        handleComprobacio('comprobacioPlanol', false);
    }
    else handleComprobacio('comprobacioPlanol', true);

    handleErrors('errorPlanol', errorPlanol);
}