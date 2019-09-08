require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0-mezuk.gcp.mongodb.net/test?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

require('./models/Consulta');
const app = require('./app');

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});