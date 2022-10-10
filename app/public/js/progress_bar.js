const valeur = document.getElementById("calorie_consomme");
const max = document.getElementById("calorie_recommendee");
const maximum = "30%";
var bar = document.getElementById("progress-done");
console.log(max)
let valeurFinale = 0;



valeurFinale = parseInt(valeur.value, 10);
maximum = parseInt(max.value, 10);
var pourcentage = valeurFinale / maximum * 100;
var largeur = maximum + "%";
progress_bar()

function progress_bar() {
    document.getElementById("progress-done").style.width = "50%";
}