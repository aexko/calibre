const mongoose = require("mongoose")

const schemaUtilisateur = mongoose.Schema({
    prenom: String,
    nom: String,
    age: Number,
    email: String,
    nom_utilisateur: String,
    mot_passe: String,
    unitePrefere: String,
    poids: [{}],
    objectif_de_poids_saine: Number,
    objectif_par_semaine: Number,
    taille: [{}],
    genre: String,
    calorie_quotidien_consommee: Number,
    niveau_activite_physique: String,
    imc: Number,
    BMR: Number,
    TDEE: Number,
    calorie_quotidien_recommendee: [{
        total: Number,
        repas: [{}]
    }],
    ibm: Number,
    exigences_dietiques: [{}]
});

const Utilisateur = mongoose.model("Utilisateur", schemaUtilisateur);
module.exports = Utilisateur;