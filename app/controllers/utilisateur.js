const Activite = require("../models/activite");

exports.getActiviteForm = (req, res, next) => {
	res.render("../views/pages/ajouter-activite.ejs", {
		pageTitle: "Ajouter une activite",
		path: "/ajouter-activite",
        utilisateurconnecte: utilisateurCourant,
	});
};

exports.postActivite = (req, res, next) => {
	const titre = req.body.titre;
	const description = req.body.description;
	const date = req.body.date;
	const calories = req.body.calories;
	const activite = new Activite({
		titre: titre,
		description: description,
		date: date,
		calories: calories,
	});
	activite
		.save()
		.then((result) => {
			console.log("Activite cree");
			res.redirect("/ajouter-activite");
		})
		.catch((err) => {
			console.log(err);
		});
};

