const Activite = require("../models/activite");

exports.getActiviteForm = (req, res, next) => {
	res.render("../views/pages/ajouter-activite.ejs", {
		pageTitle: "Ajouter une activite",
		path: "/ajouter-activite",
        utilisateurconnecte: utilisateurCourant,
	});
};

