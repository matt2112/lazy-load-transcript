const serverless = require('serverless-http');
const express = require('express');
const axios = require('axios');
const RapidAPI = require('rapidapi-connect');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const rapid = new RapidAPI(process.env.RAPID_PROJECT_NAME, process.env.RAPID_API_KEY);
const jsonParser = bodyParser.json();

app.use(cors());

app.get('/transcript', (req, res) => {
  axios
    .get('https://s3.amazonaws.com/com.trint.misc.challenge/transcript.json')
    .then((data) => {
      res.json(data.data);
    })
    .catch((err) => {
      console.log('ERROR:', err);
      res.send('ERROR:', err);
    });
});

app.post('/translate', jsonParser, (req, res) => {
  const string = req.body.text;
  rapid
    .call('GoogleTranslate', 'translate', {
      apiKey: process.env.GOOGLE_API_KEY,
      string,
      sourceLanguage: 'en',
      targetLanguage: 'fr'
    })
    .on('success', (payload) => {
      res.send(payload);
    })
    .on('error', (err) => {
      console.log('ERROR', err);
      res.send('ERROR', err);
    });
});

module.exports.handler = serverless(app);
