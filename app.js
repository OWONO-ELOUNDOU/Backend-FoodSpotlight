const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

/********************* DISHES REQUEST ROUTES ********************/
const addDish = require('./routes/dishes/addDish');
const getDish = require('./routes/dishes/getDish');

/********************* DISHES REQUEST ROUTES ********************/
const addUser = require('./routes/users/addUser')

const app = express();

const PORT = 3000 || env.PORT;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/********************* DISHES REQUEST ********************/
app.use('/dishes/add', addDish);
app.use('/dishes', getDish);

/********************* DISHES REQUEST ROUTES ********************/
app.use('/user/add', addUser);

app.listen(PORT);
console.log('server started on port', PORT);

module.exports = app;