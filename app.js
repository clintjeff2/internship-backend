const express = require('express');
const path = require('path');
const cors = require('cors');
const internRouter = require('./intern.routes');

const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	cors({
		method: 'POST PATCH GET DELETE',
		origin: 'https://internship-dusky.vercel.app/',
		// origin: "http://localhost:5173",
	})
);

// body parser - reading data from body into req.body
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Setting up the routes
app.use('/internship/', internRouter);

// Pug routes
app.get('/', (req, res) => {
	res.status(200).render('base');
});

// Handline unhandled routes
app.all('*', (req, res, next) => {
	res.send("Can't find this route");
});

module.exports = app;
