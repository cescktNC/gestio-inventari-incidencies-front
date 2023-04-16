

export function ComprobacioName(name, { handleComprobacio, handleErrors }) {
    let pattName = /[0-9!@#$%^&*()_\-+={}[\]|:;"'<>,.?/`~¡¿]/g;
    let errorName = '';

    if (name === '') {
        errorName = 'El camp Nom es obligatori';
        handleComprobacio('comprobacioName', false);
    } else if (pattName.test(name)) {
        errorName = 'El nom no pot contenir numeros o caracteres especials';
        handleComprobacio('comprobacioName', false);
    }
    else handleComprobacio('comprobacioName', true);

    handleErrors('errorName', errorName)
}

export function ComprobacioCognoms(cognoms, { handleComprobacio, handleErrors }) {
    let pattCognoms = /[0-9!@#$%^&*()_\-+={}[\]|:;"'<>,.?/`~¡¿]/g;
    let errorCognoms = '';

    if (cognoms === '') {
        errorCognoms = 'El camp Cognoms es obligatori';
        handleComprobacio('comprobacioCognoms', false);
    } else if (pattCognoms.test(cognoms)) {
        errorCognoms = 'Els cognoms no poden contenir numeros o caracteres especials';
        handleComprobacio('comprobacioCognoms', false);
    }
    else handleComprobacio('comprobacioCognoms', true);

    handleErrors('errorCognoms', errorCognoms)
}

export function ComprobacioDNI(dni, { handleComprobacio, handleErrors }) {
    let pattDNI = /^[\d]{8}[a-z]{1}$/i;
    let errorDNI = '';

    let letters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

    let dniModificat = dni.replaceAll(' ', '');
    let lletra = dniModificat.substring(dniModificat.length - 1);

    dniModificat = dniModificat.substring(0, dniModificat.length - 1);
    let index = dniModificat % 23;


    if (dni === '') {
        errorDNI = 'El camp DNI es obigatori';
        handleComprobacio('comprobacioDNI', false);
    } else if (!pattDNI.test(dni)) {
        errorDNI = 'Format incorrecte';
        handleComprobacio('comprobacioDNI', false);
    } else if (letters[index] === lletra) handleComprobacio('comprobacioDNI', true);
    else handleComprobacio('comprobacioDNI', true);

    handleErrors('errorDNI', errorDNI)
}

export function ComprobacioEmail(email, { handleComprobacio, handleErrors }) {
    let pattEmail = /^[\w_.+-]+@[\w-]+\.[\w-.]+$/i;
    let errorEmail = "";

    if (email === "") {
        errorEmail = "El camp correu electronic es obigatori";
        handleComprobacio('comprobacioEmail', false);
    } else if (pattEmail.test(email)) handleComprobacio('comprobacioEmail', true);
    else {
        errorEmail = "Format incorrecte";
        handleComprobacio('comprobacioEmail', false);
    }

    handleErrors('errorEmail', errorEmail)
}

export function ComprobacioPassword(pass, { handleComprobacio, handleErrors }) {
    let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    let errorPass = "";

    if (pass === "") {
        errorPass = "El camp contrasenya es obligatori";
        handleComprobacio('comprobacioPass', false);
    } else if (pattPassword.test(pass)) handleComprobacio('comprobacioPass', true);
    else {
        errorPass = "Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
        handleComprobacio('comprobacioPass', false);
    }

    handleErrors('errorPass', errorPass);
}

export function ComprobacioNewPassword(pass, { handleComprobacio, handleErrors }) {
    let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    let errorPass = "";

    if (pass === "") {
        errorPass = "El camp contrasenya es obligatori";
        handleComprobacio('comprobacioNewPass', false);
    } else if (pattPassword.test(pass)) handleComprobacio('comprobacioNewPass', true);
    else {
        errorPass = "Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
        handleComprobacio('comprobacioNewPass', false);
    }

    handleErrors('errorNewPass', errorPass);
}

export function ComprobacioConfPassword(confirm_password, { userPass, handleComprobacio, handleErrors }) {
    let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    let errorConfPass = "";

    if (confirm_password === "") {

        errorConfPass = "El camp confirma contrasenya es obligatori";
        handleComprobacio('comprobacioConfirmPass', false);

    } else if (userPass !== confirm_password) {

        errorConfPass = "Les contrasenyas no coincideixen";
        handleComprobacio('comprobacioConfirmPass', false);

    } else if (pattPassword.test(confirm_password)) {

        handleComprobacio('comprobacioConfirmPass', true);

    }
    else {

        errorConfPass.innerText = "Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
        handleComprobacio('comprobacioConfirmPass', false);

    }

    handleErrors('errorConfPass', errorConfPass);
}

export function ComprobacioConfNewPassword(confirm_password, { userPass, handleComprobacio, handleErrors }) {
    let pattPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    let errorConfPass = "";

    if (confirm_password === "") {

        errorConfPass = "El camp confirma contrasenya es obligatori";
        handleComprobacio('comprobacioConfirmNewPass', false);

    } else if (userPass !== confirm_password) {

        errorConfPass = "Les contrasenyas no coincideixen";
        handleComprobacio('comprobacioConfirmNewPass', false);

    } else if (pattPassword.test(confirm_password)) {

        handleComprobacio('comprobacioConfirmNewPass', true);

    }
    else {

        errorConfPass.innerText = "Format incorrecte, \nmínim 8 caràcters, \nalmenys una mínuscula, \nuna majúscula i un número";
        handleComprobacio('comprobacioConfirmNewPass', false);

    }

    handleErrors('errorConfNewPass', errorConfPass);
}

export function ComprobacioExtensioIMG({ file, handleComprobacio, handleErrors }){
    let errorProfilePicture = "";
    if(!file){
        errorProfilePicture = "No has seleccionat cap fitxer";
        handleComprobacio('comprobacioProfilePicture', false)
    } else if(file.length > 1){
        errorProfilePicture = "Nomes pots seleccionar un fitxer";
        handleComprobacio('comprobacioProfilePicture', false)
    } else if(!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)){
        errorProfilePicture = "L'archiu a de ser una imatge en format PNG, JPEG o JPG";
        handleComprobacio('comprobacioProfilePicture', false)
    }

    handleErrors('errorProfilePicture', errorProfilePicture)

}