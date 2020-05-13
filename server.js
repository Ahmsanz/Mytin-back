const express = require('express');

const app = express();

const { mongoURI, port } = require('./config');

const bodyParser = require('body-parser');

const cors = require('cors');

const db = mongoURI;

const mongoose = require('mongoose');

const helmet = require('helmet');

const passport = require('passport')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use(helmet());

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})  // el segundo parámetro es el sugerido por mongo; el de confluence estará obsoleto pronto.
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

app.listen(port, () => console.log('listening to ' + port));

// app.use(passport.initialize())
// app.use(passport.session())
// require('./routes/passport')

app.use('/cities', require('./routes/cities'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/itineraries', require('./routes/itineraries'))
