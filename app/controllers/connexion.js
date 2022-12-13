// ce routage permet de servir la page de connexion
const configuerationConnexion = require("../config/config-connexion");
const modelUtilisateur = require("../models/schemaUtilisateur");
const store = require('data-store')({ path: process.cwd() + '/foo.json' });
exports.afficherPageConnexion = (req, res, next) => {

    res.render("pages/connexion", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
    });
}
exports.postConnexion = async(req, res, next) => {
    let date = Date()
    date.setHours(0, 0, 0, 0);
    const d = new Date("2022-03-25");
    d.setHours(0, 0, 0, 0);
    store.set('date', date);
    var date_stockee = store.get('date')
    console.log("ddddddddddddddddddddddddddddddddddd")
    if (date.getTime() === d.getTime()) {
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = 0
    } else {
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = 0

    }
}
exports.deleteConnexion = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        (configuerationConnexion.utilisateurCourant = null), res.redirect("/connexion");
    });
}