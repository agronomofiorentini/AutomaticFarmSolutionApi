const axios = require('axios');
const fs = require('fs');

// set the endpoint

const apiUrl = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/AutoPrescriptionShapefile?AutoPrescription=False&NumberZone=4&userfertilizer=200&Strategy=highwherehigh';

// set the path to the geojson

const geojsonFilePath = 'county.geojson';

// set the username and password

const username = 'XXXXXXXXXX';
const password = 'XXXXXXXXXX';

async function main() {
  try {
    // read the geojson content
    const geojson = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

    // Build header for basic authentication
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    // Make the POST request to the API
    const response = await axios.post(apiUrl, geojson, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      responseType: 'stream',
    });

    // Save shapefile locally
    const shapefilePath = 'result.zip'; // Specifies the path and name of the shapefile
    response.data.pipe(fs.createWriteStream(shapefilePath));

    // Wait for the file to be saved before exiting the program
    await new Promise((resolve) => {
      response.data.on('end', resolve);
    });

    console.log('The shapefile is saved with success!');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
