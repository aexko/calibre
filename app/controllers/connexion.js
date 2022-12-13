// ce routage permet de servir la page de connexion
const configuerationConnexion = require("../config/config-connexion");
const modelUtilisateur = require("../models/schemaUtilisateur");
exports.afficherPageConnexion = (req, res, next) => {

    res.render("pages/connexion", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
    });
}
exports.postConnexion = async(req, res, next) => {

}
exports.deleteConnexion = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        (configuerationConnexion.utilisateurCourant = null), res.redirect("/connexion");
    });
}