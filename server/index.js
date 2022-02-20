const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const middlewares = require('./src/middlewares');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// wait for connection with DB to start the app
app.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
  });
});

mongoose
  .connect(
    process.env.DB_URI ||
      `mongodb://${process.env.DB_HOST || 'localhost'}:27017/tododb`
  )
  .then(() => {
    console.log('Connected to database');
    app.emit('ready');
  })
  .catch((error) => console.log(error.message));

// routes
app.use('/user', routes.user);
app.use('/login', routes.login);
app.use('/task', routes.task);

// middlewares
app.use(middlewares.error);
