const express = require('express')
//connection mongoose
const mongoose = require("mongoose");
const app = express()
const port = 3000
//importation de module schemaUtilisateur
const modelUtilisateur = require("./models/schemaUtilisateur");
const nomUtilisateur = "admin"
const motPasse = "admin"
const nomDb = "Calibre"
const cluster = "Calibre"
//connection atlas
mongoose.connect(`mongodb+srv://${nomUtilisateur}:${motPasse}@${cluster}.unyolim.mongodb.net/${nomDb}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//connection compass 
/* 
mongoose.connect('mongodb://localhost:27017/'+nomDb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);**/
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
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/about', (req, res) => {
    res.render('pages/about')
  })
  //cette routage permet de servir la page d inscription 
  app.get('/inscription', (req, res) => {
    res.render('pages/inscription')
  })
  //cette routage permet de recevoir un formulaire d inscription et de les stocker dans la bd
  app.post('/inscription', (req, res) => {
     //les donnes a stocker dans la bd
const instance_utilisateur = new modelUtilisateur(req.body);

// Sauvegarde dans la bd
instance_utilisateur.save((err) => {
  if (err) throw err;
  })
  res.redirect('/')
    })

app.listen(port, () => {
  console.log(`Server's on localhost:${port}`)
})