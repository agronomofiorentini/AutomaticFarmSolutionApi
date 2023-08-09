const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Vegetation index map const API_URL = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/VegetationIndexHtmlWidget?vegetationindex=ndvi';
// Evapotraspiration Map const API_URL = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/EvapotraspirationMapHtmlWidget?';
// Zone Management const API_URL = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/ZoneManagementHtmlWidget?AutoPrescription=True&NumberZone=4';
// Prescription map const API_URL = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/AutoPrescriptionHtmlWidget?AutoPrescription=True&NumberZone=4&userfertilizer=200&Strategy=highwherehig';

const API_URL = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/VegetationIndexHtmlWidget?vegetationindex=ndvi';

const USERNAME = 'XXXXXXXXXXXX';
const PASSWORD = 'XXXXXXXXXXXX';

app.get('/', async (req, res) => {
  try {
    // Read the GeoJSON file
    const geojson = fs.readFileSync("county.geojson", 'utf8');

    // Set up the authentication headers
    const authHeaders = {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    };

    // Perform the authenticated POST request
    const response = await axios.post(API_URL, geojson, authHeaders);

    // Assuming the response data contains the HTML content
    const htmlContent = response.data;

    // Send the HTML content as the response
    res.send(htmlContent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
