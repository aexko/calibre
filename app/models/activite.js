const mongoose = require("mongoose")

const schemaActivite = mongoose.Schema({
    act_titre: String,
    act_date: Date
});


const Activite = mongoose.model("Activite", schemaActivite);
module.exports = Activite;