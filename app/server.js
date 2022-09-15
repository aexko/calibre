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
//connection atlas
/*mongoose.connect(
    `mongodb+srv://${nomUtilisateur}:${motPasse}@${cluster}.unyolim.mongodb.net/${nomDb}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
*/
//connection compass

mongoose.connect('mongodb://localhost:27017/' + nomDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//route permettant de servir les fichier statiques
app.use(express.static(__dirname + '/public/'));

mongoose.connect('mongodb://localhost:27017/' + nomDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//ceci permet de savoir si la bd est bien connectee
const bd = mongoose.connection;
bd.on("error", console.error.bind(console, "erreur de connection: "));
bd.once("open", function () {
    console.log("Vous etes connectee");
});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});
//cette routage permet de servir la page d inscription
app.get("/inscription", (req, res) => {
    res.render("pages/inscription");
});
//cette routage permet de verifier si le nom d utilisateur est redondant
app.get("/inscription/:nomUtilisateur", (req, res) => {
    //on verifie dans la bd si le nom d utilisateur est existant
    modelUtilisateur.findOne({ nom_utilisateur: req.params.nomUtilisateur }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            if (docs) {
                //si existant on envoie une message qui va etre afficher a l utilisateur
                res.json({
                    titre: 'existant',
                    msg: "un compte avec le même nom d'utilisateur existe"
                });
            } else {
                res.json({
                    //si existant on envoie une message vide
                    titre: 'succes',
                    msg: '',
                });
            }
        }
    });
});
//cette routage permet de recevoir un formulaire d inscription et de les stocker dans la bd
app.post("/inscription", (req, res) => {
    //les donnes a stocker dans la bd
    const instance_utilisateur = new modelUtilisateur(req.body);
    var activite = niveauActivite(req.body.id_niveau_activite_physique)

    instance_utilisateur.imc = calculIMC(req.body.taille_cm, req.body.poids_kg)
    instance_utilisateur.calorie_quotien_recommendee = calculCalorie(req.body.taille, req.body.poids, req.body.age, activite)

    // Sauvegarde dans la bd
    instance_utilisateur.save((err) => {
        if (err) throw err;
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server's on localhost:${port}`);
});

function niveauActivite(frequence_activite) {
    var activite
    if (frequence_activite = 0) {
        activite = 1.37
    } else
        if (frequence_activite = 1) {
            activite = 1.55
        } else if (frequence_activite = 2) {
            activite = 1.80
        } else if (frequence_activite = 3) {
            activite = 2.0
        }
    return activite
}

function calculIMC(taille, poids) {
    var taille_m = taille / 100
    var imc = poids / (Math.pow(taille_m, 2))
    imc = imc.toFixed(2)
    return imc;
}

function calculCalorie(taille, poids, age, activite) {
    var taille_m = taille / 100
    calorie = activite * (230 * Math.pow(poids, 0.48) * Math.pow(taille_m, 0.5) * Math.pow(age, -0.13))

    return calorie
}