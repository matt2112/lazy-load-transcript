const serverless = require('serverless-http');
const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
  axios
    .get('https://s3.amazonaws.com/com.trint.misc.challenge/transcript.json')
    .then((data) => {
      res.append('access-control-allow-origin', '*');
      res.json(data.data);
    })
    .catch((err) => {
      console.log('ERROR:', err);
      res.send('ERROR:', err);
    });
});

module.exports.handler = serverless(app);
