const configuerationConnexion = require("../config/config-connexion");
const ingredients =require("../models/schemaIngredients");

/**
 * Route: génère la page de la recherche des recettes
 */
exports.afficherPageRecettesRecommendees = async(req, res, next) => {		
	const ingredientss = await ingredients.find();
	res.render("pages/recettesRecommendees", {
		utilisateur: configuerationConnexion.utilisateurCourant,
		utilisateurconnecte: configuerationConnexion.utilisateurCourant,
		utilisateurCourant: configuerationConnexion.utilisateurCourant,
		exigencesUtilisateur: JSON.stringify(configuerationConnexion.utilisateurCourant.exigences_dietiques),
		ingredients :ingredientss
	});
};
