const schemaActivite = require("../../models/activite")

function ajouterActivite() {
	
	const form = document.getElementById("form_activites");

	const titre = form.elements["titre_activite"];
	const duree = form.elements["duree_activite"];

	const schemaActivite = new Schema({
		book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
		imprint: { type: String, required: true },
		status: {
		  type: String,
		  required: true,
		  enum: ["Available", "Maintenance", "Loaned", "Reserved"],
		  default: "Maintenance",
		},
		due_back: { type: Date, default: Date.now },
	  });
	console.log(titre);
	console.log(duree);
}
