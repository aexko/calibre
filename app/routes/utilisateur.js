const express = require("express");
const utilisateurController = require("../controllers/utilisateur");

const router = express.Router();

router.get("/ajouter-activite", utilisateurController.getActiviteFormAjouter);
router.get("/modifier-activite", utilisateurController.getActiviteFormModifier);

router.get("/afficher-activites", utilisateurController.getAllActivities);

router.get("/activites:id", utilisateurController.getActivite);
router.post("/ajouter-activite", utilisateurController.postActivite);

router.put("/modifier-activite/:id", utilisateurController.updateActivite);
// router.delete("/supprimer-activite", utilisateurController.deleteActivite);

module.exports = router;
