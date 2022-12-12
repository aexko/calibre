const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activiteSchema = new Schema({
    date: { type: Date },
    calorie: { type: Number },
    id_user: { type: String },
    temps: { type: Number },
    nom_activite: { type: String }
});

module.exports = mongoose.model("Activite", activiteSchema);