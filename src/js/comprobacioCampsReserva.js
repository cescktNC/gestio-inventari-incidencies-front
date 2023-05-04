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

export function ComprobacioHora(hora, { handleComprobacio, handleErrors }) {
    let errorHora = '';
    let pathHora = /\d/;
    let now = new Date().getTime();
  
    if (hora === '') {
      errorHora = 'El camp Hora es obligatori';
      handleComprobacio('comprobacioHora', false);
    } else if (!pathHora.test(hora)) {
      errorHora = 'El camp Hora ha de ser un número';
      handleComprobacio('comprobacioHora', false);
    } else if (new Date().setHours(hora, 0, 0, 0) < now) {
      errorHora = 'El camp hora no pot ser anterior a la hora actual';
      handleComprobacio('comprobacioHora', false);
    } else {
      handleComprobacio('comprobacioHora', true);
    }
  
    handleErrors('errorHora', errorHora);
  }
  
  export function ComprobacioData(data, { handleComprobacio, handleErrors }) {
    let errorData = '';
    let pathData = /\d/;
    let now = new Date().getTime();
  
    if (data === '') {
      errorData = 'El camp Data es obligatori';
      handleComprobacio('comprobacioData', false);
    } else if (!pathData.test(data)) {
      errorData = 'El camp Data ha de ser un numero';
      handleComprobacio('comprobacioData', false);
    } else if (new Date(data) < now) {
      errorData = 'El camp Data no pot ser anterior a la data actual';
      handleComprobacio('comprobacioData', false);
    } else {
      handleComprobacio('comprobacioData', true);
    }
  
    handleErrors('errorData', errorData);
  }
  