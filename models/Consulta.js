const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pod: String
});


module.exports = mongoose.model("Consulta", consultaSchema);