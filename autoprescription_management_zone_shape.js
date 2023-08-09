const axios = require('axios');
const fs = require('fs');

// set the endpoint

const apiUrl = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/AutoPrescriptionShapefile?AutoPrescription=False&NumberZone=4&userfertilizer=200&Strategy=highwherehigh';

// set the endpoint

const geojsonFilePath = 'county.geojson';
const username = 'XXXXXXXXXX';
const password = 'XXXXXXXXXX';

async function main() {
  try {
    // Carica il GeoJSON dal file locale
    const geojson = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

    // Costruisci l'intestazione per l'autenticazione di base
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    // Effettua la richiesta POST all'API
    const response = await axios.post(apiUrl, geojson, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      responseType: 'stream', // Indica ad Axios di trattare la risposta come uno stream
    });

    // Salva il file shapefile localmente
    const shapefilePath = 'result.zip'; // Specifica il percorso e il nome del file shapefile
    response.data.pipe(fs.createWriteStream(shapefilePath));

    // Aspetta che il file venga salvato prima di uscire dal programma
    await new Promise((resolve) => {
      response.data.on('end', resolve);
    });

    console.log('File shapefile salvato con successo!');
  } catch (error) {
    console.error('Si è verificato un errore:', error.message);
  }
}

main();
