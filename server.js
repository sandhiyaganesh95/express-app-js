const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');
const UserRoute = require('./app/routes/user');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())


app.get('/', (req, res)=>{
  res.json({'message': 'Hello crud'})
})
app.listen(3001, () => {
  console.log("Server is listening on port 3000");
})
app.use('/user', UserRoute);