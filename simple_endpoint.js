const axios = require('axios');

// set the username and password

const username = 'XXXXXXXXXXXX';
const password = 'XXXXXXXXXXXX';

// set the api endpoint

const url = 'https://www.api.automaticfarmsolutionwebapp.com/AFS/SoilDataPoint?long=13.3123&lat=42.4560'; // Replace with the URL of the target API.

// Options for HTTP request with basic authentication
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
    // The response of the POST request is contained in response.data
    console.log('JSON response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
