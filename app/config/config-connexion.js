const passport = require("passport");
const modelUtilisateur = require("../models/schemaUtilisateur");

utilisateurCourant = null;
const {
	checkAuthenticated,
	checkNotAuthenticated,
} = require("../middlewares/auth");

const initialiserPassport = require("../passport-config");
initialiserPassport(
	passport,
	async (email) => {
		const utilisateurTrouvee = await modelUtilisateur.findOne({
			email: email,
		});
		return utilisateurTrouvee;
	},
	async (id) => {
		const utilisateurTrouvee = await modelUtilisateur.findOne({ _id: id });
		return utilisateurTrouvee;
	}
);
module.exports = {
    utilisateurCourant ,
    passport,
    checkAuthenticated,
    checkNotAuthenticated,
}
