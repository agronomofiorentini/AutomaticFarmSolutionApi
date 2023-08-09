const axios = require('axios');
const fs = require('fs');

async function makePostRequest() {
  
  // set the api endpoint
  
  const apiUrl = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/VegetationIndex?vegetationindex=ndvi'; // Sostituisci con l'URL dell'API a cui vuoi fare la richiesta POST
  
  // set the usernamen and password
  
  const username = 'XXXXXXXXXXXXX';
  const password = 'XXXXXXXXXXXXX';

  // Upload GeoJSON file locally
  const geojsonFilePath = 'county.geojson'; // Replace with the path to your GeoJSON file
  const geojsonFile = fs.readFileSync(geojsonFilePath, 'utf8');

  // Sets the header for basic authentication
  const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

  try {
    // Make the POST request to the API
    const response = await axios.post(apiUrl, geojsonFile, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      responseType: 'arraybuffer', // We specify that the response is an array of bytes (binary file)
    });

    // Save the raster file obtained in response
    const rasterFilePath = 'file.tif'; // Replace with the path where you want to save the raster file
    fs.writeFileSync(rasterFilePath, response.data);

    console.log('Raster file saved correctly:', rasterFilePath);
  } catch (error) {
    console.error('An error occurred during the request:', error.message);
  }
}

makePostRequest();
