const dotenv = require('dotenv');
const mongoose = require('mongoose');

// handling uncaught exceptions- synchronous code
process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXPRESSION! 🔴 Shutting down...');

	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB =
	'mongodb+srv://clintjeff2:kljlsljLKJKLDJOIj12lj)_@cluster0.aifxmvj.mongodb.net/internship?retryWrites=true&w=majority';
// const DB = 'mongodb://localhost:27017/interns';
mongoose.connect(DB).then((con) => {
	console.log('DB connection successful');
});

// Starting the server
const port = 4000;

app.listen(port, () => {
	console.log(`The app is running on port ${port}...`);
});

// handling unhandled rejected promises - asynchronous code
process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 🔴 Shutting down...');

	console.log(err.name, err.message);
	// server.close(() => {
	process.exit(1);
	// });
});
