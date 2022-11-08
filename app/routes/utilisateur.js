const express = require("express");
const utilisateurController = require("../controllers/utilisateur");
const inscriptionController = require("../controllers/inscription");
const connexionController = require("../controllers/connexion");
const profilController = require("../controllers/profil");
const configuerationConnexion = require("../config/config-connexion");
const modelUtilisateur = require("../models/schemaUtilisateur");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/ajouter-activite", utilisateurController.getActiviteForm);

router.post("/ajouter-activite", utilisateurController.postActivite);

router.get("/mod-activite/:actId", utilisateurController.editActivite);
router.get("/afficher-activites", utilisateurController.getAllActivities);


router.post("/modifier-activite", utilisateurController.editActivite);

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

async function StockerUtilisateur(req, res, next) {
	const userFound = await modelUtilisateur.findOne({ email: req.body.email });
	const mdp = req.body.mot_passe;
	if (userFound) {
		if (await bcrypt.compare(mdp, userFound.mot_passe)) {
			configuerationConnexion.utilisateurCourant = userFound;
            console.log(configuerationConnexion.utilisateurCourant)
		}
	} else {
		currentlyConnectedUser = null;
	}

	next();
}