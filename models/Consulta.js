const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    pod: {
        type: String,
        trim: true,
    },
});


const Consulta = mongoose.model('Consulta', consultaSchema);

//module.exports = mongoose.model('Consulta', consultaSchema);