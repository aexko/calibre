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
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const session = require("express-session");
const methodOverride = require("method-override")
const {
    checkAuthenticated,
    checkNotAuthenticated,
} = require("./middlewares/auth");
const initialiserPassport = require("./passport-config");
//connection atlas
/*mongoose.connect(
    `mongodb+srv://${nomUtilisateur}:${motPasse}@${cluster}.unyolim.mongodb.net/${nomDb}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
*/
//route permettant de servir les fichier statiques
app.use(express.static(__dirname + '/public/'));

app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/' + nomDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//ceci permet de savoir si la bd est bien connectee
const bd = mongoose.connection;
bd.on("error", console.error.bind(console, "erreur de connection: "));
bd.once("open", function() {
    console.log("Vous etes connectee");
});

initialiserPassport(
    passport,
    async(email) => {
        const utilisateurTrouvee = await modelUtilisateur.findOne({ email :email });
        return utilisateurTrouvee;
    },async(id) => {
        const utilisateurTrouvee = await modelUtilisateur.findOne({_id:id });
        return utilisateurTrouvee;
    }
);
// pour activer le module ejs

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(flash());
app.use(
    session({
        name:"sessionUtilisateur",
        secret: 'twt',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.get("/about", (req, res) => {
    res.render("pages/about");
});
// ce routage permet de servir la page de connexion
app.get("/connexion",checkNotAuthenticated, (req, res) => {
    res.render("pages/connexion");
});
app.get("/profil", checkAuthenticated,(req, res) => {
    res.render("pages/profil",{prenomNom :req.user.prenom +" "+ req.user.nom});
});
app.post(
    "/connexion",checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "/profil",
        failureRedirect: "/connexion",
        failureFlash: true    }));

app.delete('/deconnexion',checkAuthenticated,(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/connexion');
      });
});

//ce routage permet de servir la page d inscription
app.get("/inscription",checkNotAuthenticated ,(req, res) => {
    res.render("pages/inscription");
});
//cette routage permet de verifier si le nom d utilisateur est redondant
app.get("/inscription/:nomUtilisateur",checkNotAuthenticated, (req, res) => {
    //on verifie dans la bd si le nom d utilisateur est existant
    modelUtilisateur.findOne({ nom_utilisateur: req.params.nomUtilisateur }, function(err, docs) {
        if (err) {
            console.log(err)
        } else {
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
app.post("/inscription",checkNotAuthenticated, async(req, res) => {
    //les donnes a stocker dans la bd
    const instance_utilisateur = new modelUtilisateur(req.body);
    var activite = niveauActivite(req.body.id_niveau_activite_physique)

    instance_utilisateur.imc = calculIMC(req.body.taille_cm, req.body.poids_kg)
    instance_utilisateur.calorie_quotien_recommendee = calculCalorie(req.body.taille, req.body.poids, req.body.age, activite)

    // on verifie si le courriel est redondant  
    modelUtilisateur.findOne({ email: req.body.email }, async function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            if (docs) {
                console.log("Result : ", docs);
                res.json({
                    //si ou on retorune le message suivant et l affiche apres a l aide d une alert
                    titre: 'existant',
                    msg: 'cette courriel est déjà liée à un compte.'
                });
            } else {
                try{
                    instance_utilisateur.mot_passe = await bcrypt.hash(instance_utilisateur.mot_passe,10)

                }catch{

                }
                //sinon on sauvegarde le nouveau compte dans la bd
                instance_utilisateur.save((err) => {
                    if (err) throw err;
                });
                res.json({
                    //et on retorune le message suivant et l affiche apres a l aide d une alert
                    titre: 'succes',
                    msg: 'votre compte a été crée avec succes',
                });
            }
        }
    });
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