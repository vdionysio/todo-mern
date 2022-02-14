const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

// wait for connection with DB to start the app
app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
  });
});

// start connection with mongoDB
mongoose
  .connect('mongodb://localhost:27017/todo-db')
  .then(() => {
    console.log('Connected to database');
    app.emit('ready');
  })
  .catch((error) => console.log(error.message));
