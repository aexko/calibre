const modelUtilisateur = require("../models/schemaUtilisateur");
const bcrypt = require("bcryptjs");

//ce routage permet de servir la page d inscription
exports.afficherPageInscription = (req, res, next) => {
	res.render("pages/inscription", {
		utilisateurconnecte: utilisateurCourant,
	});
}

//cette routage permet de verifier si le nom d utilisateur est redondant
exports.verifierNomUtilisateur = (req, res,next) => {
	//on verifie dans la bd si le nom d utilisateur est existant

	modelUtilisateur.findOne(
		{ nom_utilisateur: req.params.nomUtilisateur },
		function (err, docs) {
			if (err) {
				console.log(err.JSON);
			} else {
				if (docs) {
					//si existant on envoie une message qui va etre afficher a l utilisateur
					res.json({
						titre: "existant",
						msg: "un compte avec le même nom d'utilisateur existe",
					});
				} else {
					res.json({
						//si existant on envoie une message vide
						titre: "succes",
						msg: "",
					});
				}
			}
		}
	);
}
//cette routage permet de recevoir un formulaire d inscription et de les stocker dans la bd
exports.stockerInscription = async (req, res) => {
	//les donnes a stocker dans la bd
	const instance_utilisateur = new modelUtilisateur(req.body);
	//var activite = niveauActivite(req.body.id_niveau_activite_physique);

	//instance_utilisateur.imc = calculIMC(req.body.taille_cm, req.body.poids_kg);
	/*	instance_utilisateur.calorie_quotidien_recommendee = calculCalorie(
    	req.body.taille_cm,
    	req.body.poids_kg,
    	req.body.age,
    	activite
    );*/
	// on verifie si le courriel est redondant
	instance_utilisateur.calorie_quotidien_recommendee = JSON.parse(req.body.calorie_quotidien_recommendee)

	modelUtilisateur.findOne(
		{ email: req.body.email },
		async function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				if (docs) {
					console.log("Result : ", docs);
					res.json({
						//si ou on retorune le message suivant et l affiche apres a l aide d une alert
						titre: "existant",
						msg: "cette courriel est déjà liée à un compte.",
					});
				} else {
					try {
						instance_utilisateur.calorie_quotidien_consommee = 0;
						//instance_utilisateur.calorie_quotidien_recommendee = 1854;
						instance_utilisateur.mot_passe = await bcrypt.hash(
							instance_utilisateur.mot_passe,
							10
						);
					} catch {}
					//sinon on sauvegarde le nouveau compte dans la bd
					instance_utilisateur.save((err) => {
						if (err) throw err;
					});
					res.json({
						//et on retorune le message suivant et l affiche apres a l aide d une alert
						titre: "succes",
						msg: "votre compte a été crée avec succes",
					});
				}
			}
		}
	);
}