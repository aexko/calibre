const express = require("express");
//connection mongoose
const mongoose = require("mongoose");
const app = express();
const port = 3000;
//importation de module schemaUtilisateur
const modelUtilisateur = require("./models/schemaUtilisateur");
const nomUtilisateur = "admin";
const motPasse = "admin";
const nomDb = "Calibre";
const cluster = "Calibre";
const passport = require("passport");
//const ProgressBar = require("./progress");
const flash = require("express-flash");
const bcrypt = require("bcryptjs");

const session = require("express-session");
const methodOverride = require("method-override");
utilisateurCourant = null;
const {
	checkAuthenticated,
	checkNotAuthenticated,
} = require("./middlewares/auth");
const initialiserPassport = require("./passport-config");

const morgan = require("morgan");
app.use(morgan("tiny"));

/**
 * Connexion MongoDB à la base de données (CLOUD - MongoDB Atlas) nommée "calibre"
 */
// mongoose.connect(
// "mongodb+srv://${nomUtilisateur}:${motPasse}@${cluster}.unyolim.mongodb.net/${nomDb}?retryWrites=true&w=majority",
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	}
// );

/**
 * Connexion MongoDB à la base de données (LOCALE) nommée "calibre"
 */
mongoose.connect("mongodb://127.0.0.1:27017/" + nomDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//route permettant de servir les fichier statiques
app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");

//ceci permet de savoir si la bd est bien connectee
const bd = mongoose.connection;
bd.on("error", console.error.bind(console, "Erreur de connection: "));
bd.once("open", function () {
	console.log("Connexion réussie à MongoDB");
});

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
// pour activer le module ejs

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
	session({
		name: "sessionUtilisateur",
		secret: "twt",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
	res.render("pages/index", {
		utilisateurconnecte: utilisateurCourant,
	});
});

app.get("/a-propos", (req, res) => {
	res.render("pages/a-propos", {
		utilisateurconnecte: utilisateurCourant,
	});
});
// ce routage permet de servir la page de connexion
app.get("/connexion", checkNotAuthenticated, (req, res) => {
	res.render("pages/connexion", {
		utilisateurconnecte: utilisateurCourant,
	});
});
app.get("/profil", checkAuthenticated, (req, res) => {
	res.render("pages/profil", {
		utilisateur: utilisateurCourant,
		utilisateurconnecte: utilisateurCourant,
	});
});

/**
 * Route: génère la page de la recherche des recettes
 */
app.get("/recettes", (req, res) => {
	res.render("pages/recettes", {
		utilisateurconnecte: utilisateurCourant,
	});
});

/**
 * Route: génère la page de la recherche des nutriments
 */
app.get("/nutriments", (req, res) => {
	res.render("pages/nutriments", {
		utilisateurconnecte: utilisateurCourant,
	});
});

app.post(
	"/connexion",
	StockerUtilisateur,
	checkNotAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/profil",
		failureRedirect: "/connexion",
		failureFlash: true,
	}),
	async (req, res) => {}
);

app.delete("/deconnexion", checkAuthenticated, (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		(utilisateurCourant = null), res.redirect("/connexion");
	});
});

//ce routage permet de servir la page d inscription
app.get("/inscription", checkNotAuthenticated, (req, res) => {
	res.render("pages/inscription", {
		utilisateurconnecte: utilisateurCourant,
	});
});

//cette routage permet de verifier si le nom d utilisateur est redondant
app.get("/inscription/:nomUtilisateur", checkNotAuthenticated, (req, res) => {
	//on verifie dans la bd si le nom d utilisateur est existant
	modelUtilisateur.findOne(
		{ nom_utilisateur: req.params.nomUtilisateur },
		function (err, docs) {
			if (err) {
				console.log(err);
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
});

app.post("/profil", checkAuthenticated, async (req, res) => {
	var calorie =
		parseInt(req.body.calorie) +
		utilisateurCourant.calorie_quotidien_consommee;
	utilisateurCourant.calorie_quotidien_consommee = calorie;
	await modelUtilisateur.findOneAndUpdate(
		{ email: utilisateurCourant.email },
		{ calorie_quotidien_consommee: calorie }
	);

	res.redirect("/profil");
});
app.post("/metre_a_jour_poid", checkAuthenticated, async(req, res) => {

    var nouveau_poids = parseInt(req.body.poids);
    utilisateurCourant.poids = nouveau_poids;
    await modelUtilisateur.findOneAndUpdate({ email: utilisateurCourant.email }, { poids: nouveau_poids });
    // console.log("allo")
    res.redirect("/profil");
});
//cette routage permet de recevoir un formulaire d inscription et de les stocker dans la bd
app.post("/inscription", checkNotAuthenticated, async (req, res) => {
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
						instance_utilisateur.calorie_quotidien_recommendee = 1854;
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
});

// For website access
app.listen(port, () => {
	console.log(`Le serveur est sur localhost:${port}`);
});

async function StockerUtilisateur(req, res, next) {
	const userFound = await modelUtilisateur.findOne({ email: req.body.email });
	const mdp = req.body.mot_passe;

	if (userFound) {
		if (await bcrypt.compare(mdp, userFound.mot_passe)) {
			utilisateurCourant = userFound;
		}
	} else {
		currentlyConnectedUser = null;
	}

	next();
}

const utilisateurRoutes = require("./routes/utilisateur");

app.use(utilisateurRoutes);

