const express = require("express");
const utilisateurController = require("../controllers/utilisateur");

const router = express.Router();

router.get("/ajouter-activite", utilisateurController.getActiviteFormAjouter);
router.post("/ajouter-activite", utilisateurController.postActivite);

router.get("/afficher-activites", utilisateurController.getAllActivities);

// router.get("/:id", utilisateurController.getActivite);

router.get("/modifier-activite", utilisateurController.getActiviteFormModifier);
// router.post("/modifier-activite", utilisateurController.editActivite);
router.delete("/supprimer-activite", utilisateurController.deleteActivite);

module.exports = router;
