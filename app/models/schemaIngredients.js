const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({

    aliment: String,
	cle_api: String
});

const ingredients = mongoose.model("Ingredients", ingredientSchema);
module.exports = ingredients;
