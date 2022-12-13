const express = require("express");
//connection mongoose
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const app = express();
const port = 3000;
//importation de module schemaUtilisateur
const modelUtilisateur = require("./models/schemaUtilisateur");
const bd_activite = require("./models/bdActivite");
const EnregistrementActivite = require("./models/activite");
const nomUtilisateur = "admin";
const motPasse = "admin";
const nomDb = "Calibre";
const cluster = "Calibre";
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const configuerationConnexion = require("./config/config-connexion");

var localStorage = require('localStorage')
const ingredients = require("./models/schemaIngredients");

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
// pour activer le module ejs

app.set("view engine", "ejs");

//ceci permet de savoir si la bd est bien connectee
const bd = mongoose.connection;
bd.on("error", console.error.bind(console, "Erreur de connection: "));
bd.once("open", function() {
    console.log("Connexion réussie à MongoDB");
});


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
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant
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
app.get("/profil", checkAuthenticated, async(req, res) => {
    const ingredientss = await ingredients.find();
    const activites = await EnregistrementActivite.find({ id_user: configuerationConnexion.utilisateurCourant._id })

    res.render("pages/profil", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant,
        ingredients: ingredientss,
        ListHistorique: activites,
        exigencesUtilisateur: JSON.stringify(configuerationConnexion.utilisateurCourant.exigences_dietiques),

    });
});
app.get("/progression", checkAuthenticated, (req, res) => {
    bd_activite.find({}, function(err, activites) {
        res.render("pages/progression", {
            ListActivite: activites,
            utilisateurconnecte: configuerationConnexion.utilisateurCourant,
            utilisateurCourant: configuerationConnexion.utilisateurCourant,

        });
    });


});

/**
 * Route: génère la page de la recherche des recettes
 */
app.get("/recettes", (req, res) => {
    res.render("pages/recettes", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant

    });
});

/**
 * Route: génère la page de la recherche des nutriments
 */
app.get("/nutriments", (req, res) => {
    res.render("pages/nutriments", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant

    });
});
app.post("/ajouter_calorie", checkAuthenticated, async(req, res) => {
    var calorie =
        parseInt(req.body.calorie) +
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee;

    configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = calorie;
    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: calorie });

    res.redirect("/profil");
});



app.post("/ajouter_activite", checkAuthenticated, async(req, res) => {
    var temps = parseInt(req.body.temps_activite);
    var id_activite = req.body.nom_activite;
    let date = new Date();

    const activite = await bd_activite.findOne({ id: id_activite });
    console.log(activite.nom)
    var calorie_activite = Math.round(temps * activite.calorie_depense / 60)
    const nouvelle_activite = new EnregistrementActivite({
        date: date,
        calorie: calorie_activite,
        id_user: configuerationConnexion.utilisateurCourant._id,
        temps: temps,
        nom_activite: activite.nom,
    })
    await nouvelle_activite.save()
    res.redirect("/progression")


})

app.post("/ajouter_calorie_recherche", checkAuthenticated, async(req, res) => {
    var calorie =
        parseInt(req.body.calorie_recherche) +
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee;

    configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = calorie;

    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: calorie });

    res.redirect("/profil");
});
app.post("/metre_a_jour_age", checkAuthenticated, async(req, res) => {
    var age =
        parseInt(req.body.age);

    configuerationConnexion.utilisateurCourant.age = age;

    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { age: age });

    res.redirect("/profil");
});

// For website access
/**app.listen(port, () => {
	console.log(`Le serveur est sur localhost:${port}`);
});**/
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}

const utilisateurRoutes = require("./routes/utilisateur");
const activite = require("./models/activite");
const { nextTick } = require("process");
const bdActivite = require("./models/bdActivite");
app.use(utilisateurRoutes);

module.exports = app;
app.delete('/:id', (req, res) => {
    const id = req.params.id;

    activite.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/afficher-activites' });
        })
        .catch(err => {
            console.log(err);
        });
});