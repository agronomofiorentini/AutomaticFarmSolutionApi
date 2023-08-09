const fs = require('fs');
const axios = require('axios');

const username = 'XXXXXXXXXXXXXXX';
const password = 'XXXXXXXXXXXXXXX';

const apiEndpoint = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/AutoPrescriptionMapGEOjson?AutoPrescription=False&NumberZone=4&userfertilizer=200&Strategy=highwherehigh';
const geojsonFilePath = 'county.geojson';
const outputFilePath = 'result.geojson'; // Percorso di destinazione del nuovo file GeoJSON


(async () => {
  try {
    // Leggi il contenuto del file GeoJSON
    const geojsonContent = await fs.promises.readFile(geojsonFilePath, 'utf8');
    // Parsa il contenuto come JSON
    const geojsonObject = JSON.parse(geojsonContent);

    // Opzioni per l'autenticazione basata su username e password
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    // Esegui la richiesta POST all'API con il body GeoJSON e l'autenticazione
    const response = await axios.post(apiEndpoint, geojsonObject, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    });

    const resultGeoJSON = response.data;
    // Gestisci la risposta dell'API qui
    console.log('Risposta dall\'API:', resultGeoJSON);

    await fs.promises.writeFile(outputFilePath, JSON.stringify(resultGeoJSON, null, 2), 'utf8');

  } catch (err) {
    console.error('Errore:', err.message);
  }
})();
