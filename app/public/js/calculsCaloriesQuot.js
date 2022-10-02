function calculerIMC() {

    unite = document.getElementById("unitePrefere")
    uniteSelectionne = unite.options[unite.selectedIndex].value
    ImcElement = document.getElementById("Imc")
    Imc = 0;

    if (uniteSelectionne == "metrique") {
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
    else if (uniteSelectionne == "imperial") {
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
    unite = document.getElementById("unitePrefere");
    uniteSelectionne = unite.options[unite.selectedIndex].value;
    if (uniteSelectionne == "metrique") {
        document.getElementById("objectif_poids").value = document.getElementById("kg").value;
    } else if (uniteSelectionne == "imperial") {
        document.getElementById("objectif_poids").value = document.getElementById("lbs").value;
    }
    document.getElementById("objectif_poids").className=''
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
        divCalorie.innerHTML =''
        divCalorie.style.display = "block"
        const paragraphe = document.createElement("p");
        const node = document.createTextNode("votre BMR(taux métabolique de base) estimé est de " + Bmr +
            " et votre TDEE(dépense énergétique quotidienne totale) estimé est de " + TDEE);
        paragraphe.appendChild(node);
        divCalorie.appendChild(paragraphe);
        calculerCalories(TDEE);

    //taux métabolique de base
    //dépense énergétique quotidienne totale
}
function calculerBMR() {
    unite = document.getElementById("unitePrefere");
    uniteSelectionne = unite.options[unite.selectedIndex].value;
    genre = document.getElementById("genre");
    genreSelectionne = genre.options[genre.selectedIndex].value;
    age = parseFloat(document.getElementById("ans").value);
    Bmr = 0;
    if (uniteSelectionne == "metrique") {
        poids = parseFloat(document.getElementById("kg").value)
        taille = parseFloat(document.getElementById("cm").value)
        if (genreSelectionne == "Femme") {
            Bmr = (10 * poids) + (6.25 * taille) - (5 * age) - 161;
        } else {
            Bmr = (10 * poids) + (6.25 * taille) - (5 * age) + 5;
        }

    } else if (uniteSelectionne == "imperial") {
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
function calculerCalories(TDEE) {
    unite = document.getElementById("unitePrefere");
    uniteSelectionne = unite.options[unite.selectedIndex].value;
    poidsVisee = parseFloat(document.getElementById("objectif_poids").value);
    poids = 0;
    calories = 0;
    if (uniteSelectionne == "metrique") {
        poids = parseFloat(document.getElementById("kg").value);
        calories = 7700;

    } else {
        poids = parseFloat(document.getElementById("lbs").value);
        calories = 3500;
    }
    if (poidsVisee > poids) {
        parsemaine = 1;
        difference = poidsVisee - poids;
        DifferenceEnCalories = difference * calories;
        joursRequis = difference / parsemaine * 7;
        ajouterParJour = DifferenceEnCalories / joursRequis

    } else if (poidsVisee == poids) {

    } else {
        parsemaine = 1;
        difference = poids - poidsVisee;
        DifferenceEnCalories = difference * calories;
        joursRequis = difference / parsemaine * 7;
        enleverParJour = DifferenceEnCalories / joursRequis
    }



}