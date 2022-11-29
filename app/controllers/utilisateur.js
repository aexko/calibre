const Activite = require("../models/activite");

exports.getActiviteFormAjouter = (req, res, next) => {
	res.render("../views/pages/ajouter-activite", {
		pageTitle: "Ajouter une activite",
		path: "/ajouter-activite",
		utilisateurconnecte: utilisateurCourant,
	});
};

exports.getActiviteFormModifier = (req, res, next) => {
	res.render("../views/pages/modifier-activite", {
		pageTitle: "Modifier une activite",
		path: "/modifier-activite",
		utilisateurconnecte: utilisateurCourant,
	});
};
exports.postActivite = (req, res, next) => {
	const titre = req.body.titre_activite;
	const description = req.body.description;
	const date = req.body.date;

	console.log(
		"Informations de l'activité: " +
			titre +
			"| " +
			description +
			"| " +
			date
	);

	const activite = new Activite({
		titre: titre,
		description: description,
		date: date,
	});
	activite
		.save()
		.then((result) => {
			console.log("Activité créée");
			res.redirect("/afficher-activites");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.updateActivite = (req, res, next) => {
	const activiteId = req.body.activiteId;

	Activite.findOneAndUpdate({ _id: activiteId })
		.then((activite) => {
			activite.titre = req.body.titre_activite;
			activite.description = req.body.description;
			activite.date = req.body.date;

			return activite.save();
		})
		.then((result) => {
			console.log("Activité mise à jour");
			res.redirect("/afficher-activites");
		})
};


exports.getActivite = (req, res, next) => {
	const activiteId = req.params.activiteId;
	console.log(activiteId);
	Activite.findById(activiteId)
		.then((activite) => {
			res.render("page-detaillee-activite", {
				pageTitle: "Details de l'activite",
				path: "/page-detaillee-activite",
				activite: activite,
			});
		})
		.catch((err) => console.log(err));
};



exports.getAllActivities = (req, res, next) => {
	Activite.find({}, function (err, activites) {
		res.render("../views/pages/afficher-activites", {
			listeActivites: activites,
			utilisateurconnecte: utilisateurCourant,
		});
	});
	// .then((activites) => {
	// 	res.render("afficher-activites", {
	// 		pageTitle: "Afficher une activité",
	// 		path: "/afficher-activites",
	// 		activites: activites,
	// 	});
	// })
	// .catch((err) => console.log(err));
};
