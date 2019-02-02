/* this app.js file is made to render pug pages,
 handle route navigation, and handle errors
*/
//const Book = require('./models').Book;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const nodemon = require('nodemon');

// Parse incoming requests/ data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.settings view engine for app to use pug templates
app.set('view engine', 'pug');

//.use public server to use static files (images, css)
app.use('/static', express.static('public'));

/********************/
/***** ROUTERS ******/
/********************/

const homeRoutes = require('./routes');
const bookRoutes = require('./routes/books');

app.use('/', homeRoutes);
app.use('/books', bookRoutes);

/********************/
/*****  ERRORS  *****/
/********************/

//404 error for routes that are not found
app.use((req, res, next) => {
	const erro = new Error('Sorry, Page Not Found ');
	erro.status = 404;
	next(erro);
});

app.use((erro, req, res, next) => {
	res.locals.error = erro;
	res.render('error'); //error.pug
})
//end ERRORS

//dont forget to export
module.exports = app;
