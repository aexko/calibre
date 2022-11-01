const express = require("express");
const utilisateurController = require("../controllers/utilisateur");

const router = express.Router();

router.get("/ajouter-activite", utilisateurController.getActiviteForm);

router.post("/ajouter-activite", utilisateurController.postActivite);

router.get("/mod-activite/:actId", utilisateurController.editActivite);
router.get("/afficher-activites", utilisateurController.getAllActivities);


router.post("/modifier-activite", utilisateurController.editActivite);

router.post("/supprimer-activite", utilisateurController.deleteActivite);

module.exports = router;
