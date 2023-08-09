const axios = require('axios');

const username = 'XXXXXXXXXXXX';
const password = 'XXXXXXXXXXXX';

const url = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/SoilDataPoint?long=13.3123&lat=42.4560'; // Sostituisci con l'URL dell'API di destinazione

// Opzioni per la richiesta HTTP con autenticazione di base
const options = {
  method: 'post',
  url: url,
  auth: {
    username: username,
    password: password,
  },
};

axios(options)
  .then(response => {
    // La risposta della POST request è contenuta in response.data
    console.log('Risposta JSON:', response.data);
  })
  .catch(error => {
    console.error('Errore:', error.message);
  });
