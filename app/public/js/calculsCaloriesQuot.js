function calculerIMC() {
    unite = document.getElementById("unitePrefere")
    uniteSelectionne = unite.options[unite.selectedIndex].value
    ImcElement = document.getElementById("Imc")
    Imc = 0;

    if (uniteSelectionne == "metrique") {
        poids = parseFloat(document.getElementById("poids_kg").value)
        taille = parseFloat(document.getElementById("taille_cm").value)
        Imc += +(poids / ((taille / 100) ** 2)).toFixed(2)
        if (isNaN(Imc) || Imc == Infinity || Imc == 0) {
            ImcElement.style.display = "none"
        } else {
            minEchelle = +(((taille / 100) ** 2) * 18.5).toFixed(2);
            maxEchelle = +(((taille / 100) ** 2) * 25).toFixed(2);
            ImcElement.style.display = "block"
            afficherIMC(Imc, minEchelle, maxEchelle)
        }
    }
    else if (uniteSelectionne == "imperial") {
        poids = parseFloat(document.getElementById("poids_lbs").value)
        tailleFeet = parseFloat(document.getElementById("taille_feet").value)
        tailleInch = parseFloat(document.getElementById("taille_inch").value)
        Imc += +(703 * poids / ((12 * tailleFeet) + tailleInch) ** 2).toFixed(2)
        if (isNaN(Imc) || Imc == Infinity || Imc == 0) {
            ImcElement.style.display = "none"
        } else {
            minEchelle = +(((((12 * tailleFeet) + tailleInch) ** 2) * 18.5) / 703).toFixed(2);
            maxEchelle = +(((((12 * tailleFeet) + tailleInch) ** 2) * 25) / 703).toFixed(2);
            ImcElement.style.display = "block"
            afficherIMC(Imc, minEchelle, maxEchelle)
        }
    }

}