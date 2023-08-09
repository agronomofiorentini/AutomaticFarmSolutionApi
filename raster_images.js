const axios = require('axios');
const fs = require('fs');

async function makePostRequest() {
  const apiUrl = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/VegetationIndex?vegetationindex=ndvi'; // Sostituisci con l'URL dell'API a cui vuoi fare la richiesta POST
  const username = 'XXXXXXXXXXXXX';
  const password = 'XXXXXXXXXXXXX';

  // Carica il file GeoJSON localmente
  const geojsonFilePath = 'county.geojson'; // Sostituisci con il percorso del tuo file GeoJSON
  const geojsonFile = fs.readFileSync(geojsonFilePath, 'utf8');

  // Imposta l'header per l'autenticazione base
  const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  try {
    // Effettua la richiesta POST all'API
    const response = await axios.post(apiUrl, geojsonFile, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      responseType: 'arraybuffer', // Specifichiamo che la risposta è un array di byte (file binario)
    });

    // Salva il file raster ottenuto in risposta
    const rasterFilePath = 'file.tif'; // Sostituisci con il percorso in cui vuoi salvare il file raster
    fs.writeFileSync(rasterFilePath, response.data);

    console.log('File raster salvato correttamente:', rasterFilePath);
  } catch (error) {
    console.error('Si è verificato un errore durante la richiesta:', error.message);
  }
}

makePostRequest();
