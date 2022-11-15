const mongoose = require("mongoose");
const modelUtilisateur = require("./models/schemaUtilisateur");
var localStorage = require('local-storage');
var date = new Date("2005-06-30");
var d = new Date("2022-03-25");
localStorage.setItem(0, d);
const configuerationConnexion = require("./config/config-connexion");
const modelUtilisateur = require("./models/schemaUtilisateur");

function remettreAZero() {

    var dateStocke = localStorage.getItem('d')
    if (dateStocke.getTime() === date) {

    } else {
        localStorage.getItem('d') == date;
        localStorage.setItem(0, d);
        modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: 0 });
    }
}

function ajouterCalorie(utilisateur) {

}

function calculerCalorie() {
    var calorie = Number(document.getElementById("quantite_calories").innerText);
    var quantite = Number(document.getElementById("entree_quantite").value);
    // var texte=getElementById("total_calorie");
    var consommation = (quantite * calorie / 100)
        //  document.getElementById("total_calorie").innerText="Vous avez consommé "+consommation+"Kcal" 
    document.getElementById("total_calorie").innerText = " Vous avez consommée " + consommation + "KCal"
    document.getElementById("calorie_recherche").textContent = consommation
        // return consommation
        // return consommation

}

function afficherDiv(id_div) {
    var div = document.getElementById(id_div);

    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }

}

function progress_bar() {
    remettreAZero();
    var text_pourcentage = document.getElementById("pourcentage");
    text_pourcentage.style.marginTop = "5%";
    var elem = document.getElementById("progress-done");
    var contenu_calorie = Number(document.getElementById("calorie_consomme").innerText);

    var contenu_max = Number(document.getElementById("calorie_recommendee").innerText);

    var nombre = (contenu_calorie * 100) / contenu_max;
    text_pourcentage.innerText = Math.round(nombre) + "%";
    elem.style.width = nombre + "%";
    if (nombre > 100) {
        elem.style.backgroundImage = "repeating-linear-gradient(to left, #ff1616, #ff4545, #f66d6d)";
        elem.style.boxShadow = "05px 5px -6px #fb8507, 0 3px 7px #f09535";
    } else if (nombre < 100 && nombre > 90) {
        elem.style.backgroundImage = "repeating-linear-gradient(to left,#fb8507, #f09535, #f0ae68)";
        elem.style.boxShadow = "05px 5px -6px #ff1616, 0 3px 7px #f66d6d";

    }


}
/**
 * Fonction qui trouve la source du nutriment
 * @param {number} id - ID du nutriment
 */
function getNutrimentInfo(id) {
    $.ajax({
        url: "https://api.spoonacular.com/food/ingredients/" +
            id +
            "/information?apiKey=1cc034bf9a734f59995c4b72466c33ab&amount=100&unit=grams",
        success: function(res) {
            document.getElementById("nom_nutriment").textContent = res.name;
            document.getElementById("quantite_calories").textContent =
                res.nutrition.nutrients[16].amount;

        },
    });
}

/**
 * Fonction qui trouve un nutriment
 * @param {string} query - Entrée de l'utilisateur
 */
function getNutrimentID(query) {
    $.ajax({
        url: "https://api.spoonacular.com/food/ingredients/search?apiKey=1cc034bf9a734f59995c4b72466c33ab&query=" +
            query,
        success: function(res) {
            try {

                getNutrimentInfo(res.results[0].id);
                afficherDiv('afficher_aliment');
            } catch (err) {
                console.log(
                    "Erreur: " +
                    err.name +
                    " - Aucun nutriment trouvé dans la base de données de SpoonacularAPI"
                );
                alert(
                    "Désolé, aucun nutriment trouvé. Veuillez réessayer avec des mots en anglais, merci!"
                );
            }
        },
    });
}