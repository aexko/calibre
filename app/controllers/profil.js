const configuerationConnexion = require("../config/config-connexion");
const modelUtilisateur = require("../models/schemaUtilisateur");

exports.afficherPageProfil = (req, res, next) => {
    res.render("pages/profil", {
        utilisateur: configuerationConnexion.utilisateurCourant,
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant :configuerationConnexion.utilisateurCourant
    });
}
exports.postProfil = async (req, res, next) => {
    var calorie =
        parseInt(req.body.calorie) +
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee;
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = calorie;
    await modelUtilisateur.findOneAndUpdate(
        { email: configuerationConnexion.utilisateurCourant.email },
        { calorie_quotidien_consommee: calorie }
    );

    res.redirect("/profil");
}
exports.mettreAJourPoids = async (req, res, next) => {

    var nouveau_poids = parseInt(req.body.poids);
    configuerationConnexion.utilisateurCourant.poids = nouveau_poids;
    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { poids: nouveau_poids });
    // console.log("allo")
    res.redirect("/profil");
}