const express = require('express');
const path = require('path');
const app = express();

module.exports = app;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
//routes

app.get('/', (req, res, next) => {
  try {
    const html = path.join(__dirname, '..', '/client/index.html');
    res.sendFile(html);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
});
