//configurations du passeport
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

function initialiser(
	passport,
	recevoirutilisateurParEmail,
	recevoirutilisateurParId
) {
	const authentifierUtilisateur = async (email, password, done) => {
		const utilisateur = await recevoirutilisateurParEmail(email);
		if (utilisateur == null) {
			return done(null, false, {
				message:
					"Il n'y a pas d'utilisateur avec cette adressse courriel. ",
			});
		}
		try {
			if (await bcrypt.compare(password, utilisateur.mot_passe)) {
				return done(null, utilisateur);
			} else {
				return done(null, false, {
					message: "Mot de passe incorrect !",
				});
			}
		} catch (err) {
			return done(e);
		}
	};

	passport.use(
		new LocalStrategy(
			{ usernameField: "email", passwordField: "mot_passe" },
			authentifierUtilisateur
		)
	);
	passport.serializeUser((utilisateur, done) => done(null, utilisateur.id));
	passport.deserializeUser(async (id, done) => {
		return done(null, await recevoirutilisateurParId(id));
	});
}

module.exports = initialiser;
