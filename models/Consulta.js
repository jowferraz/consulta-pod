const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    pod: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Consulta', consultaSchema);