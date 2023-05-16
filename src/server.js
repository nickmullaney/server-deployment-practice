'use strict';


const express = require('express');
const cors = require('cors')
const first = require('./middleware/first');
const { second, third}  = require('./middleware/second-and-third');
const fourth = require('./middleware/fourth');
const validator = require('./middleware/validator');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

// create express singleton
const app = express();

// middleware
app.use(cors());
app.use(express.json());
//Can also have it broken up separately
// This means the middleware works for all instances
app.use(first, second, third);

// app.post('/route', handlerCallback) 
app.get('/', (req, res, next) => {
  res.status(200).send('proof of life');
});

// How to use query parameters
// Can add in fourth middleware into the get to use this middleware only on this path
app.get('/helloquery', fourth, (req, res, next) =>{
console.log(req.query);
res.status(200).send('Something Happened');
});

// how to use path(url) parameters, sends key and value when sent
//TODO- Create some middleware to evaluate our path parameter

app.get('/helloPath/:banana', validator, (req, res, next) =>{
  console.log(req.params.banana);
  res.status(200).send('Something Happened');
});

app.get('/success', (req, res, next) => {
  res.status(200).send('Success!!');
});

app.get('/bad', (req, res, next) => {
  next('We have an error!');
});

app.use('*', notFound);
app.use((err, req, res, next) =>{

  const errorMessage = typeof(error) === 'string' ? error : error.message;
  
  res.status(500).send({
    //Ternary WTF(What, True, False)
    error: 500,
    route: req.path,
    query: req.query,
    path: req.params,
    body: req.body,
    message: `Server Error: ${errorMessage}`,
  });
});

const start = (port) => app.listen(port, () => console.log('listening on port:', port));

module.exports = { start, app }
