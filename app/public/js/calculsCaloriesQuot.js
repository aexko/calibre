TDEE = 0
//add event listener pour quand la page de imc bmr et ... recalcul de imc bmr tdee et affichage
//classe?
function calculerIMC(unitePrefere) {
    var Imc = 0;

    if (unitePrefere == "metrique") {
        var poids = parseFloat(document.getElementById("kg").value)
        var taille = parseFloat(document.getElementById("cm").value)
        Imc += +(poids / ((taille / 100) ** 2)).toFixed(2)
        if (isNaN(Imc) || Imc == Infinity || Imc == 0) {
        } else {
            var minEchelle = +(((taille / 100) ** 2) * 18.5).toFixed(2);
            var maxEchelle = +(((taille / 100) ** 2) * 25).toFixed(2);
            return {'Imc':Imc, 'minEchelle':minEchelle, 'maxEchelle':maxEchelle}

        }
    }
    else if (unitePrefere == "imperial") {
        var poids = parseFloat(document.getElementById("lbs").value)
        var tailleFeet = parseFloat(document.getElementById("feet").value)
        var tailleInch = parseFloat(document.getElementById("inch").value)
        Imc += +(703 * poids / ((12 * tailleFeet) + tailleInch) ** 2).toFixed(2)
        if (isNaN(Imc) || Imc == Infinity || Imc == 0) {
        } else {
            var minEchelle = +(((((12 * tailleFeet) + tailleInch) ** 2) * 18.5) / 703).toFixed(2);
            var maxEchelle = +(((((12 * tailleFeet) + tailleInch) ** 2) * 25) / 703).toFixed(2);
            return {'Imc':Imc, 'minEchelle':minEchelle, 'maxEchelle':maxEchelle}

        }
    }

}
function afficherIMC(Imc, minEchelle, maxEchelle) {
    var situation = "";
    var maintenirPoids = document.getElementById("maintenir");
    var atteindrePoids = document.getElementById("attein");
    if (Imc < 18.5) {
        situation = ". Vous êtes en situation d’insuffisance pondérale"
        maintenirPoids.setAttribute("disabled", "");
        atteindrePoids.removeAttribute("disabled");

    } else if (Imc >= 25.0) {
        situation = ". Vous êtes en situation de surpoids"
        maintenirPoids.setAttribute("disabled", "");
        atteindrePoids.removeAttribute("disabled");
    } else {
        situation = ". Vous êtes de corpulence normale"
        maintenirPoids.removeAttribute("disabled");
        atteindrePoids.removeAttribute("disabled");
    }
    document.getElementById("objectif_poids").max = maxEchelle;
    document.getElementById("objectif_poids").min = minEchelle;
    return situation
}
function afficherSituation(Imc,situation){
    var ImcDescription = document.getElementById("ImcDescription")
    ImcDescription.innerHTML = ''
    const paragraphe = document.createElement("p");
    const node = document.createTextNode("votre Imc estimé est de " + Imc + situation);
    paragraphe.appendChild(node);
    ImcDescription.appendChild(paragraphe);
}
function atteindreUnpoids() {
    document.getElementById("objectifPoids").style.display = "block";

}
function maintenirUnPoids() {
     document.getElementById("objectifPoids").style.display = "none";
    if (unitePrefere == "metrique") {
        document.getElementById("objectif_poids").value = document.getElementById("kg").value;
    } else if (unitePrefere == "imperial") {
        document.getElementById("objectif_poids").value = document.getElementById("lbs").value;
    }
    document.getElementById("objectif_poids").className = ''
    validerForm(document.getElementById("objectif_poids"))
}

function calculerTDEE(unitePrefere) {
    var divCalorie = document.getElementById("caloriesConsommesQuotidienne")
    divCalorie.style.display = "none";
    var BMR = calculerBMR(unitePrefere);
    var niveauActPhys = document.getElementById("id_niveau_activite_physique");
    var niveauActPhysSelectionne = niveauActPhys.options[niveauActPhys.selectedIndex].value;
    var valeurActivite = 0;
    switch (niveauActPhysSelectionne) {
        case "sedentaire":
            valeurActivite = 1.2;
            break;
        case "legerActif":
            valeurActivite = 1.375;
            break;
        case "modereActif":
            valeurActivite = 1.55;
            break;
        case "tresActif":
            valeurActivite = 1.725;
            break;
        case "ExtremeActif":
            valeurActivite = 1.9;
    }
    TDEE = (BMR * valeurActivite).toFixed(0);
    divCalorie.innerHTML = ''
    divCalorie.style.display = "block"
    const paragraphe = document.createElement("p");
    const node = document.createTextNode("votre BMR(taux métabolique de base) estimé est de " + (BMR).toFixed(0) +
        " et votre TDEE(dépense énergétique quotidienne totale) estimé est de " + TDEE);
    paragraphe.appendChild(node);
    divCalorie.appendChild(paragraphe);
    //atteindrepoids = //document.getElementById("objectifPoids").style.display = "none";

    if (unitePrefere == "metrique") {

        document.getElementById("objectifSemaine").max = 1;
    } else if (unitePrefere == "imperial") {

        document.getElementById("objectifSemaine").max = 2;
    }
    return {'TDEE':TDEE,'BMR':BMR}
    //taux métabolique de base
    //dépense énergétique quotidienne totale
}
function calculerBMR(unitePrefere) {
    var genre = document.getElementById("genre");
    var genreSelectionne = genre.options[genre.selectedIndex].value;
    var age = parseInt(document.getElementById("ans").value);
    var Bmr = 0;
    if (unitePrefere == "metrique") {
        let poids = parseFloat(document.getElementById("kg").value)
        let taille = parseFloat(document.getElementById("cm").value)
        if (genreSelectionne == "Femme") {
            Bmr = (10 * poids) + (6.25 * taille) - (5 * age) - 161;
        } else {
            Bmr = (10 * poids) + (6.25 * taille) - (5 * age) + 5;
        }

    } else if (unitePrefere == "imperial") {
        let poids = parseFloat(document.getElementById("lbs").value)
        let tailleFeet = parseFloat(document.getElementById("feet").value)
        let tailleInch = parseFloat(document.getElementById("inch").value)
        if (genreSelectionne == "Femme") {
            Bmr = (4.536 * poids) + (15.88 * (((12 * tailleFeet) + tailleInch))) - (5 * age) - 161;
        } else {
            Bmr = (4.536 * poids) + (15.88 * (((12 * tailleFeet) + tailleInch))) - (5 * age) + 5;
        }
    }
    return Bmr;
}
function calculerCalories(unitePrefere) {
    var poidsVisee = parseFloat(document.getElementById("objectif_poids").value);
    var poids = 0;
    var calories = 0;
    var totalJour = 0
    var parsemaine = parseFloat(document.getElementById("objectifSemaine").value)
    if (unitePrefere == "metrique") {
        poids = parseFloat(document.getElementById("kg").value);
        calories = 7700;

    } else {
        poids = parseFloat(document.getElementById("lbs").value);
        calories = 3500;
    }
    if (poidsVisee > poids) {
        let difference = poidsVisee - poids;
        let DifferenceEnCalories = difference * calories;
        let joursRequis = difference / parsemaine * 7;
        let ajouterParJour = DifferenceEnCalories / joursRequis
        let totalJour = ajouterParJour + parseFloat(TDEE)
        document.getElementById("consommerParJour").innerHTML = "Afin d'arriver à votre objectif, vous devez consommer " + totalJour + " calories par jour, soit " + ajouterParJour + " de plus par jour, dans " + joursRequis + " jours"

    } else if (poidsVisee == poids) {
        document.getElementById("consommerParJour").innerHTML = "Afin d'arriver à votre objectif, vous devez consommer " + TDEE + " par jour"
    } else {
       let difference = poids - poidsVisee;
       let DifferenceEnCalories = difference * calories;
       let joursRequis = difference / parsemaine * 7;
       let enleverParJour = DifferenceEnCalories / joursRequis
       let totalJour = parseFloat(TDEE) - enleverParJour
        document.getElementById("consommerParJour").innerHTML = "Afin d'arriver à votre objectif, vous devez consommer " + totalJour + " calories par jour, soit " + enleverParJour + " de moins par jour, dans " + joursRequis + " jours"
    }



}
module.exports = {calculerIMC,afficherIMC }