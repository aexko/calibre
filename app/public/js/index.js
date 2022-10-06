const { ALL } = require("dns");

/*cette methode permet de faire un requete post ajax au route inscription et si le courriel n est pas existant dans la bd 
le compte de client va etre cree sinon l utilisateur devrait changer le courriel jusqu a ce qu il soit unique
l utilisation d ajax permet de faire des requetes sans la rechargement de la page et pour que l utilisateur n aie
 pas a reentrer tous ses donnees en cas d erreur*/
function soummettreFormulaire() {
	/*si le champs d avertissement de nom d utilisateur est vide on fait une requete post sinon on attend jusqu a
	 ce qu il sois vide pour proceder avec la requete post ajax*/
	if (document.getElementById("avertirNomUtilisateur").innerHTML == "") {
		var formulaire = $("#formulaireInscription");
		$.ajax({
			url: "http://localhost:3000/inscription",
			type: "POST",
			data: formulaire.serialize(),
			dataType: "json",
			success: function (result) {
				//on alert le resultat sois : courriel deja existant ou creation avec succes
				if (result.titre == "existant") {
					//si le resultat de route post est existant on vide le champs de courriel
					document.getElementById("email").value = "";
					//si le nom d utilisateur est existant le champs d avertissement va contenir un avertissement sinon il sera vide
					document.getElementById("avertirEmail").innerHTML = result.msg;
				} else {
					//si le compte a ete cree avec succes on va a la page d accueil
					alert('votre compte a été crée avec succès');
					location.replace("/");
				}
			},
		});
	}
}
//cette methode permet de valider le nom d utilisateur et elle est appelee a chaque keyup dans le champs de nom d utilisateur
function validerNomUtilisateur(nomUtilisateur) {
	//on fait une requete get ajax pour verifier si le nom d utilisateur est deja existant dans la bd
	$.ajax({
		url: "http://localhost:3000/inscription/" + nomUtilisateur.value,
		type: "GET",
		dataType: "json",
		success: function (result) {
			//si le nom d utilisateur est existant le champs d avertissement va contenir un avertissement sinon il sera vide
			document.getElementById("avertirNomUtilisateur").innerHTML =
				result.msg;
			validerForm(nomUtilisateur);
		},

	});
}

var tabcourant = 0; // le tab courant est 0 au debut
 // affichage du tab courant
function montrerTab(n) {
	tabcourant = n;
	// cette fonction affiche le tab courant
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	//pour fixer les bouttons prochain précédent
	if (n == 0) {
		document.getElementById("prevBtn").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
	}
	if (n == (x.length - 1)) {
		document.getElementById("nextBtn").innerHTML = "Soumettre";
	} else {
		document.getElementById("nextBtn").innerHTML = "Prochain";
	}
	//corrige le indicateur d etape en bas du formulaire
	indiquerEtap(n)
}

function changerTab(n) {

	//cette methode permet de changer de tab selon le bouton clique
	var x = document.getElementsByClassName("tab");

	// si validation echoue pour le tab courant et bouton prochain clique, retourne faux
	if (n == 1 && !validerTab()) return false;
	if (n == -1 && !validerTab()) { document.getElementsByClassName("step")[tabcourant].className = document.getElementsByClassName("step")[tabcourant].className.replace(" finish", ""); };
	x[tabcourant].style.display = "none";
	// numero de tabcourant est changee
	tabcourant = tabcourant + n;

	// si fin du form on va soumettre
	if (tabcourant >= x.length) {
		// document.getElementById("formulaireInscription").submit();
		soummettreFormulaire();
		tabcourant = x.length - 1
		x[tabcourant].style.display = "block";
		return false;
	} else {//sinon on va afficher le tab voulu
		montrerTab(tabcourant);
	}

}
function validerTab() {
	// cette fonction permet de valider le tab courant
	valide = true;
	var x, y, i;
	x = document.getElementsByClassName("tab");
	y = x[tabcourant].getElementsByTagName("input");
	// verifie si les inputs d un tab ne sont pas vides
	for (i = 0; i < y.length; i++) {
		// si vide le nom de la classe de l input change a invalid et par css la couleur de background est mis a rouge
		if (y[i].className == "invalid" && !y[i].disabled) {
			// valid est mis a faux
			return false;
		} else if ((y[i].value == "" || y[i].value.trim() == "" )&& !y[i].disabled) {
			y[i].className = "invalid"
			valide = false;
		}
	}
	// si valid l indicateur etape indique le fin de l etape
	if (valide) {
		document.getElementsByClassName("step")[tabcourant].className = "step finish";
	}
	return valide; // retourn si validee ou pas
}
function validerForm(element) {
	valide = true;
	// cette fonction permet de valider le tab courant

	// verifie si les inputs d un tab ne sont pas vides
	// si vide le nom de la classe de l input change a invalid et par css la couleur de background est mis a rouge
	if (element.name == "age" || element.name == "taille" || element.name == "poids" || element.name == "objectif_de_poids_saine" || element.name== "objectif_par_semaine" || element.name== "repas_par_jour" ) {
		valide = validerAgeTaillePoids(element)
	} else if (element.name == "email") {
		valide = validerCourriel(element);
	} else if (element.name == "nom_utilisateur") {
		valide = validerUtilisateur(element);
		document.getElementById("patternUtilisateur").style.display = "block";
	} else if (element.name == "mot_passe") {
		valide = validerMotPasse(element);
		document.getElementById("patternMotPasse").style.display = "block";
	}
	if (!valide) {
		element.className = "invalid";
	} else {
		element.className = "";
	}
}
// si valid l indicateur etape indique le fin de l etape
// retourn si validee ou pas

function validerAgeTaillePoids(element) {
	titre = element.id;
if(element.id == "objectif_poids" || element.id =="objectifSemaine"){
	unite = document.getElementById("unitePrefere");
    uniteSelectionne = unite.options[unite.selectedIndex].value;
	if(uniteSelectionne == "metrique"){
		titre='kg'
	}else{
		titre='lbs'
	}
}
	if (element.value < parseFloat(element.min)) {
		document.getElementById("message " + element.id).className = "invalid";
		document.getElementById("message " + element.id).innerHTML = "Votre " + element.name.replaceAll("_"," ") + " doit etre plus que " + element.min + " " + titre;
		return false;
	} else if (element.value > parseFloat(element.max)) {
		document.getElementById("message " + element.id).className = "invalid";
		document.getElementById("message " + element.id).innerHTML = "Votre " + element.name.replaceAll("_"," ") + " doit etre moins que " + element.max + " " + titre;
		return false;
	}
	document.getElementById("message " + element.id).className = "";
	document.getElementById("message " + element.id).innerHTML = "";
	return true;
}
function validerCourriel(element) {
	pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
	if (element.value.match(pattern)) {
		document.getElementById("messageCourriel").style.display = "none"
		return true;
	} else {
		document.getElementById("messageCourriel").style.display = "block"
		return false;
	}

}
function validerMotPasse(element) {
	//pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
	valideMin = true;
	pattern = /[a-z]/g;
	if (element.value.match(pattern)) {
		document.getElementById("minisculeMotPasse").className = "valid";
		valideMin = true;
	} else {
		document.getElementById("minisculeMotPasse").className = "invalid";
		valideMin = false;
	}
	valideMaj = true;
	pattern = /[A-Z]/g;
	if (element.value.match(pattern)) {
		document.getElementById("majMotPasse").className = "valid";
		valideMaj = true;
	} else {
		document.getElementById("majMotPasse").className = "invalid";
		valideMaj = false;
	}
	valideNombre = true;
	pattern = /[0-9]/g;
	if (element.value.match(pattern)) {
		document.getElementById("nombreMotPasse").className = "valid";
		valideNombre = true;
	} else {
		document.getElementById("nombreMotPasse").className = "invalid";
		valideNombre = false;
	}
	valideLongueur = true;
	if (element.value.length < 8) {
		document.getElementById("longueurMinPass").className = "invalid";
		valideLongueur = false;
	} else {
		document.getElementById("longueurMinPass").className = "valid";
		valideLongueur = true;
	}
	return valideLongueur && valideMin && valideMaj && valideNombre;
}
function validerUtilisateur(element) {
	//peut contenir juste des nombres, lettres majuscules et lettres miniscules et underscore doit etre entre 8 et 20 caracteres
	//^[a-zA-Z0-9_]{8,20}$
	valideMinMaj = true;
	commenceMiniscule = /^[a-zA-Z0-9_]+$/g;
	if (element.value.match(commenceMiniscule)) {
		document.getElementById("minisculeUtilisateur").className = "valid";
		valideMinMaj = true;
	} else {
		document.getElementById("minisculeUtilisateur").className = "invalid";
		valideMinMaj = false;
	}
	valideLongueur = true;
	if (element.value.length < 8) {
		document.getElementById("longueurMin").className = "invalid";
		document.getElementById("longueurMax").className = "valid";

		valideLongueur = false;
	} else if (element.value.length > 20) {
		document.getElementById("longueurMax").className = "invalid";
		document.getElementById("longueurMin").className = "valid";
		valideLongueur = false;
	} else {
		document.getElementById("longueurMax").className = "valid";
		document.getElementById("longueurMin").className = "valid";
		valideLongueur = true;
	}
	return valideLongueur && valideMinMaj && document.getElementById("avertirNomUtilisateur").innerHTML == "";


}

function indiquerEtap(n) {
	// cette methode permet d afficher l indicateur d etape
	var i, x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	//ajout active au nom de classe 
	x[n].className += " active";
}
function afficherUnite(unite) {
	imperial = document.getElementById("imperial");
	imperialInputs = imperial.getElementsByTagName("input");
	metrique = document.getElementById("metrique");
	metriqueInputs = metrique.getElementsByTagName("input");

	if (unite == "metrique") {
		for (const input of imperialInputs) {
			input.setAttribute("disabled", "")
		}
		for (const input of metriqueInputs) {
			input.removeAttribute("disabled");
		}
		metrique.style.display = "block"
		imperial.style.display = "none"
	} else if (unite == "imperial") {
		metrique = document.getElementById("metrique");
		for (const input of metriqueInputs) {
			input.setAttribute("disabled", "")
		}
		for (const input of imperialInputs) {
			input.removeAttribute("disabled");
		}
		imperial.style.display = "block"
		metrique.style.display = "none"
	}
}function sum(a, b) {
	return a + b;
  }
  module.exports = validerCourriel;