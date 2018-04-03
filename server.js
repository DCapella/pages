const express = require('express');
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect(db.url, (err, database) => {
  if (err) return console.error(err);

  var db = database.db('pages');
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});
