const mongoose = require("mongoose")

const schemaUtilisateur = mongoose.Schema({
    prenom: String,
    nom: String,
    age: Number,
    email: String,
    nom_utilisateur: String,
    mot_passe: String,
    poids_kg: Number,
    taille_cm: Number,
    genre: String,
    id_niveau_activite_physique: Number,
    calorie_quotidien_recommendee: Number,
    calorie_quotidien_consommee: Number,
    imc: Number,
    restrictions_alim: [{
        id: Number,
        nom: String,
        description: String
    }],
    ibm: Number,
    exigences_dietiques: [{
        id: Number,
        nom: String,
        description: String,
        contenues_a_eviter: [{
            id: Number,
            nom: String,
            description: String
        }],
    }]
});


module.exports = mongoose.model("Utilisateur", schemaUtilisateur);