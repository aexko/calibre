const express = require("express");
const utilisateurController = require("../controllers/utilisateur");

const router = express.Router();

router.get("/ajouter-activite", utilisateurController.getActiviteFormAjouter);
router.post("/ajouter-activite", utilisateurController.postActivite);

router.get("/afficher-activites", utilisateurController.getAllActivities);

router.get("/mod-activite/:actId", utilisateurController.editActivite);

router.get("/modifier-activite", utilisateurController.getActiviteFormModifier);
router.post("/modifier-activite", utilisateurController.editActivite);
router.post("/supprimer-activite", utilisateurController.deleteActivite);

module.exports = router;
