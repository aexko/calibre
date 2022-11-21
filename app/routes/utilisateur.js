const express = require("express");
const utilisateurController = require("../controllers/utilisateur");
const inscriptionController = require("../controllers/inscription");
const connexionController = require("../controllers/connexion");
const profilController = require("../controllers/profil");
const recettesRecoController = require("../controllers/recettesRecommende");
const configuerationConnexion = require("../config/config-connexion");
const modelUtilisateur = require("../models/schemaUtilisateur");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");


const router = express.Router();

router.get("/ajouter-activite", utilisateurController.getActiviteFormAjouter);

router.post("/ajouter-activite", utilisateurController.postActivite);

// router.get("/mod-activite/:actId", utilisateurController.editActivite);
router.get("/afficher-activites", utilisateurController.getAllActivities);


// router.post("/modifier-activite", utilisateurController.editActivite);

router.post("/supprimer-activite", utilisateurController.deleteActivite);
router.get("/inscription", configuerationConnexion.checkNotAuthenticated, inscriptionController.afficherPageInscription);
router.get("/inscription/:nomUtilisateur", configuerationConnexion.checkNotAuthenticated, inscriptionController.verifierNomUtilisateur);
router.post("/inscription", configuerationConnexion.checkNotAuthenticated, inscriptionController.stockerInscription)
router.get("/profil", configuerationConnexion.checkAuthenticated, profilController.afficherPageProfil);
router.post("/profil", configuerationConnexion.checkAuthenticated, profilController.postProfil);
router.post("/metre_a_jour_poid", configuerationConnexion.checkAuthenticated, profilController.mettreAJourPoids);
router.get("/connexion", configuerationConnexion.checkNotAuthenticated, connexionController.afficherPageConnexion);
router.post("/connexion",StockerUtilisateur,configuerationConnexion.checkNotAuthenticated, configuerationConnexion.passport.authenticate("local", {
    successRedirect: "/profil",
    failureRedirect: "/connexion",
    failureFlash: true,
}), connexionController.postConnexion);
router.delete("/deconnexion", configuerationConnexion.checkAuthenticated, connexionController.deleteConnexion);
module.exports = router;
router.get("/recettesRecommendees", configuerationConnexion.checkAuthenticated,recettesRecoController.afficherPageRecettesRecommendees);

async function StockerUtilisateur(req, res, next) {
	const userFound = await modelUtilisateur.findOne({ email: req.body.email });
	const mdp = req.body.mot_passe;
	if (userFound) {
		if (await bcrypt.compare(mdp, userFound.mot_passe)) {
			ids = userFound.exigences_dietiques.map(function(el) { return mongoose.Types.ObjectId(el) })
				utilisateur = await modelUtilisateur.aggregate(  [ { $match : { _id : userFound._id } } ,{
					$lookup: {
						from: "exigences_dietiques", // collection name in db
						pipeline: [
							{
								$match:{'_id': {$in:ids} }
							},
							{ $project: { description: 0, _id: 0,exigence:0 } }
						],
						as: "exigences_dietiques"
					},
				}]).exec()
			configuerationConnexion.utilisateurCourant = utilisateur[0];

		}
	} else {
		currentlyConnectedUser = null;
	}

	next();
}