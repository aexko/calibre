TDEE = 0
var unite = ''
var unitePrefere = ''
document.addEventListener('DOMContentLoaded', function () {
	unite = document.getElementById("unitePrefere");
	unitePrefere = unite.options[unite.selectedIndex].value;
	document.getElementById('unitePrefere').addEventListener("change", function () {
		unite = document.getElementById("unitePrefere");
		unitePrefere = unite.options[unite.selectedIndex].value;
		afficherUnite();
	});
});
function calculerIMC() {
    ImcElement = document.getElementById("Imc")
    Imc = 0;

    if (unitePrefere == "metrique") {
        poids = parseFloat(document.getElementById("kg").value)
        taille = parseFloat(document.getElementById("cm").value)
        Imc += +(poids / ((taille / 100) ** 2)).toFixed(2)
        if (isNaN(Imc) || Imc == Infinity || Imc == 0) {
        } else {
            minEchelle = +(((taille / 100) ** 2) * 18.5).toFixed(2);
            maxEchelle = +(((taille / 100) ** 2) * 25).toFixed(2);
            afficherIMC(Imc, minEchelle, maxEchelle)
        }
    }
    else if (unitePrefere == "imperial") {
        poids = parseFloat(document.getElementById("lbs").value)
        tailleFeet = parseFloat(document.getElementById("feet").value)
        tailleInch = parseFloat(document.getElementById("inch").value)
        Imc += +(703 * poids / ((12 * tailleFeet) + tailleInch) ** 2).toFixed(2)
        if (isNaN(Imc) || Imc == Infinity || Imc == 0) {
        } else {
            minEchelle = +(((((12 * tailleFeet) + tailleInch) ** 2) * 18.5) / 703).toFixed(2);
            maxEchelle = +(((((12 * tailleFeet) + tailleInch) ** 2) * 25) / 703).toFixed(2);
            afficherIMC(Imc, minEchelle, maxEchelle)
        }
    }

}
function afficherIMC(Imc, minEchelle, maxEchelle) {
    situation = "";
    maintenirPoids = document.getElementById("maintenir");
    atteindrePoids = document.getElementById("attein");
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
    ImcElement = document.getElementById("Imc")
    ImcDescription = document.getElementById("ImcDescription")
    ImcDescription.innerHTML = ''
    const paragraphe = document.createElement("p");
    const node = document.createTextNode("votre Imc estimé est de " + Imc + situation);
    paragraphe.appendChild(node);
    ImcDescription.appendChild(paragraphe);
    document.getElementById("objectif_poids").max = maxEchelle;
    document.getElementById("objectif_poids").min = minEchelle;
}
function atteindreUnpoids() {
    document.getElementById("objectifPoids").style.display = "block";
    //divCalorie = document.getElementById("caloriesConsommesQuotidienne")
    //divCalorie.style.display = "none";
}
function maintenirUnPoids() {
    atteindrepoids = document.getElementById("objectifPoids").style.display = "none";
    if (unitePrefere == "metrique") {
        document.getElementById("objectif_poids").value = document.getElementById("kg").value;
    } else if (unitePrefere == "imperial") {
        document.getElementById("objectif_poids").value = document.getElementById("lbs").value;
    }
    document.getElementById("objectif_poids").className = ''
    validerForm(document.getElementById("objectif_poids"))
    calculerTDEE();
}

function calculerTDEE() {
    divCalorie = document.getElementById("caloriesConsommesQuotidienne")
    divCalorie.style.display = "none";
    BMR = calculerBMR();
    niveauActPhys = document.getElementById("id_niveau_activite_physique");
    niveauActPhysSelectionne = niveauActPhys.options[niveauActPhys.selectedIndex].value;
    valeurActivite = 0;
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
    const node = document.createTextNode("votre BMR(taux métabolique de base) estimé est de " + Bmr +
        " et votre TDEE(dépense énergétique quotidienne totale) estimé est de " + TDEE);
    paragraphe.appendChild(node);
    divCalorie.appendChild(paragraphe);
    //atteindrepoids = //document.getElementById("objectifPoids").style.display = "none";

    if (unitePrefere == "metrique") {

        document.getElementById("objectifSemaine").max = 1;
    } else if (unitePrefere == "imperial") {

        document.getElementById("objectifSemaine").max = 2;
    }

    //taux métabolique de base
    //dépense énergétique quotidienne totale
}
function calculerBMR() {
    genre = document.getElementById("genre");
    genreSelectionne = genre.options[genre.selectedIndex].value;
    age = parseFloat(document.getElementById("ans").value);
    Bmr = 0;
    if (unitePrefere == "metrique") {
        poids = parseFloat(document.getElementById("kg").value)
        taille = parseFloat(document.getElementById("cm").value)
        if (genreSelectionne == "Femme") {
            Bmr = (10 * poids) + (6.25 * taille) - (5 * age) - 161;
        } else {
            Bmr = (10 * poids) + (6.25 * taille) - (5 * age) + 5;
        }

    } else if (unitePrefere == "imperial") {
        poids = parseFloat(document.getElementById("lbs").value)
        tailleFeet = parseFloat(document.getElementById("feet").value)
        tailleInch = parseFloat(document.getElementById("inch").value)
        if (genreSelectionne == "Femme") {
            Bmr = (4.536 * poids) + (15.88 * (((12 * tailleFeet) + tailleInch))) - (5 * age) - 161;
        } else {
            Bmr = (4.536 * poids) + (15.88 * (((12 * tailleFeet) + tailleInch))) - (5 * age) + 5;
        }
    }
    return Bmr;
}
function calculerCalories() {
    poidsVisee = parseFloat(document.getElementById("objectif_poids").value);
    poids = 0;
    calories = 0;
    totalJour = 0
    parsemaine = parseFloat(document.getElementById("objectifSemaine").value)
    if (unitePrefere == "metrique") {
        poids = parseFloat(document.getElementById("kg").value);
        calories = 7700;

    } else {
        poids = parseFloat(document.getElementById("lbs").value);
        calories = 3500;
    }
    if (poidsVisee > poids) {
        difference = poidsVisee - poids;
        DifferenceEnCalories = difference * calories;
        joursRequis = difference / parsemaine * 7;
        ajouterParJour = DifferenceEnCalories / joursRequis
        totalJour = ajouterParJour + parseFloat(TDEE)
        document.getElementById("consommerParJour").innerHTML = "Afin d'arriver à votre objectif, vous devez consommer " + totalJour + " calories par jour, soit " + ajouterParJour + " de plus par jour, dans " + joursRequis + " jours"

    } else if (poidsVisee == poids) {
        totalJour = TDEE
        document.getElementById("consommerParJour").innerHTML = "Afin d'arriver à votre objectif, vous devez consommer " + TDEE + " par jour"
    } else {
        difference = poids - poidsVisee;
        DifferenceEnCalories = difference * calories;
        joursRequis = difference / parsemaine * 7;
        enleverParJour = DifferenceEnCalories / joursRequis
        totalJour = parseFloat(TDEE) - enleverParJour
        document.getElementById("consommerParJour").innerHTML = "Afin d'arriver à votre objectif, vous devez consommer " + totalJour + " calories par jour, soit " + enleverParJour + " de moins par jour, dans " + joursRequis + " jours"
    }



}