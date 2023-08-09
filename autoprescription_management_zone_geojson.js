const fs = require('fs');
const axios = require('axios');

// set username & password

const username = 'XXXXXXXXXXXXXXX';
const password = 'XXXXXXXXXXXXXXX';

// set api endpoint

const apiEndpoint = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/AutoPrescriptionMapGEOjson?AutoPrescription=False&NumberZone=4&userfertilizer=200&Strategy=highwherehigh';

// set the path to the geojson to send as body of the post request

const geojsonFilePath = 'county.geojson';

// set the path to the save the geojson that you will receve as response

const outputFilePath = 'result.geojson';


(async () => {
  try {
    // Read the geojson content
    const geojsonContent = await fs.promises.readFile(geojsonFilePath, 'utf8');
    // Parse the geojson content
    const geojsonObject = JSON.parse(geojsonContent);

    // Set option to do the authentication
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    // Sed the post request
    const response = await axios.post(apiEndpoint, geojsonObject, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    });

    const resultGeoJSON = response.data;
    // See the response of the api in the console
    console.log('Risposta dall\'API:', resultGeoJSON);

    await fs.promises.writeFile(outputFilePath, JSON.stringify(resultGeoJSON, null, 2), 'utf8');

  } catch (err) {
    console.error('Errore:', err.message);
  }
})();
