const express = require("express");
//connection mongoose
const mongoose = require("mongoose");
const app = express();
const port = 3000;
//importation de module schemaUtilisateur
const modelUtilisateur = require("./models/schemaUtilisateur");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const nomUtilisateur = "admin";
const motPasse = "admin";
const nomDb = "Calibre";
const cluster = "Calibre";
const passport = require("passport");
const flash = require("express-flash");
const bcrypt = require("bcrypt");
const session = require("express-session");
const initializePassport = require('./passport-config')

initializePassport(
    passport,
    email => modelUtilisateur.find(instance_utilisateur => instance_utilisateur.email === email),
    id => modelUtilisateur.find(instance_utilisateur.id == id)
)
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({

<<<<<<< HEAD
// Rendering home page
app.get('/', (req, res) => {
  res.render('pages/index')
})

// Rendering about page
app.get('/about', (req, res) => {
    res.render('pages/about')
  })
=======
    secret: "pizza",
    resave: false,
    saveUninitialized: false

}))
app.use(passport.initialize())
app.use(passport.session())
    // pour activer le module ejs
app.set("view engine", "ejs");


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

mongoose.connect('mongodb://127.0.0.1:27017/' + nomDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//ceci permet de savoir si la bd est bien connectee
const bd = mongoose.connection;
bd.on("error", console.error.bind(console, "erreur de connection: "));
bd.once("open", function() {
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
// ce routage permet de servir la page de connexion
app.get("/connexion", (req, res) => {
    res.render("pages/connexion");
});
app.get("/profil", (req, res) => {
    res.render("pages/profil");
});
app.post('/connexion', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/profil',
    failureRedirect: '/connexion',
    failureFlash: true
}))

async function StoreUser(req, res, next) {
    const userFound = await modelUtilisateur.findOne({ email: req.body.email });

    if (userFound) {
        currentlyConnectedUser = userFound;
    } else {
        console.log("Utilisateur inexistant");
    }

    next();
}
//ce routage permet de servir la page d inscription
app.get("/inscription", (req, res) => {
    res.render("pages/inscription");
});
//cette routage permet de verifier si le nom d utilisateur est redondant
app.get("/inscription/:nomUtilisateur", (req, res) => {
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
app.post("/inscription", async(req, res) => {
    //les donnes a stocker dans la bd
    const instance_utilisateur = new modelUtilisateur(req.body);
    var activite = niveauActivite(req.body.id_niveau_activite_physique)
    var password = instance_utilisateur.mot_passe

    instance_utilisateur.mot_passe = await bcrypt.hash(password, 10);

    instance_utilisateur.imc = calculIMC(req.body.taille_cm, req.body.poids_kg)
    instance_utilisateur.calorie_quotien_recommendee = calculCalorie(req.body.taille, req.body.poids, req.body.age, activite)

    // on verifie si le courriel est redondant  
    modelUtilisateur.findOne({ email: req.body.email }, function(err, docs) {
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

>>>>>>> main

// For website access
app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Server's on localhost:${port}`)
})


// Connexion MongoDB CLOUD

// const { MongoClient } = require('mongodb');

// async function main() {

//     const uri = "mongodb+srv://admin:admin@calibre.unyolim.mongodb.net/?retryWrites=true&w=majority";

//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         await listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }

// main().catch(console.error);

// /**
//  * Print the names of all available databases
//  * @param {MongoClient} client A MongoClient that is connected to a cluster
//  */
// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };



// var SpoonacularApi = require('spoonacular_api');

// var defaultClient = SpoonacularApi.ApiClient.instance;
// // Configure API key authorization: apiKeyScheme
// var apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
// apiKeyScheme.apiKey = "3b2c9d7b94d24ca785d5fccdfce53e3a"
// // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
// //apiKeyScheme.apiKeyPrefix['x-api-key'] = "Token"

// var api = new SpoonacularApi.IngredientsApi()
// var opts = {
//   'query': burger, // {String} The (natural language) search query.
//   'number': 10, // {Number} The maximum number of items to return (between 1 and 100). Defaults to 10.
//   'metaInformation': false, // {Boolean} Whether to return more meta information about the ingredients.
//   'intolerances': egg // {String} A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
// };
// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// api.autocompleteIngredientSearch(opts, callback);

app.get('/food', (req, res) => {
  res.render('pages/page_test_food_api')
})
=======
    console.log(`Le serveur est sur localhost:${port}`);
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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/connexion')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()

}
>>>>>>> main
