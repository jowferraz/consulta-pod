const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
const routes = require('./routes/index-routes');
const bodyParser = require('body-parser');
// App
const app = express();

// Database
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


// PUG
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.use(express.static('public'));


const { KubeConfig } = require('kubernetes-client')
const kubeconfig = new KubeConfig()
kubeconfig.loadFromFile('/home/joao.souza/.bluemix/plugins/container-service/clusters/27aa7fb64fee45029ec7465f33e8927b/kube-config-sao01-LIVSAO01.yml')
const Request = require('kubernetes-client/backends/request')
const backend = new Request({ kubeconfig })

// // Load routes
// const indexRoutes = require('./routes/index-routes');
// app.use('/', indexRoutes);

module.exports = app;