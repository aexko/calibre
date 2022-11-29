const configuerationConnexion = require("../config/config-connexion");
const modelUtilisateur = require("../models/schemaUtilisateur");

exports.afficherPageProfil = (req, res, next) => {
    verifier_date()

    res.render("pages/profil", {
        utilisateur: configuerationConnexion.utilisateurCourant,
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant
    });

}
exports.postProfil = async(req, res, next) => {
    var calorie =
        parseInt(req.body.calorie) +
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee;
    configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = calorie;
    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: calorie });

    res.redirect("/profil");
}
exports.mettreAJourPoids = async(req, res, next) => {

    var nouveau_poids = parseInt(req.body.poids);
    configuerationConnexion.utilisateurCourant.poids = nouveau_poids;
    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { poids: nouveau_poids });
    res.redirect("/profil");
}

function verifier_date() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    localStorage.setItem("date", date)
    var date_stocke = localStorage.getItem("date")
    date_stocke = new Date(date_stocke)
    if (date_stocke.getTime() === date.getTime()) {
        configuerationConnexion.utilisateurCourant = 0;
        modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: 0 });
        localStorage.setItem("date", date)

    } else {
        configuerationConnexion.utilisateurCourant = 0;
        modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: 0 });
        localStorage.setItem("date", date)
    }
}