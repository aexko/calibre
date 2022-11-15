const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activiteSchema = new Schema({
	titre: { type: String },
	description: { type: String },
	date: { type: Date }
});

module.exports = mongoose.model("Activite", activiteSchema);
