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
				alert(result.msg);
				if (result.titre == "existant") {
					//si le resultat de route post est existant on vide le champs de courriel
					document.getElementById("email").value = "";
				} else {
					//si le compte a ete cree avec succes on va a la page d accueil
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
		},
	});
}

var tabcourant = 0; // le tab courant est 0 au debut
montrerTab(tabcourant); // affichage du tab courant
var valide = true;

function montrerTab(n) {
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
	if (n == 1 && !valide) return false;
	if (n == -1 && !valide) { document.getElementsByClassName("step")[tabcourant].className = document.getElementsByClassName("step")[tabcourant].className.replace(" finish", ""); };
	// sinon tab courant est cachee 
	x[tabcourant].style.display = "none";
	// numero de tabcourant est changee
	tabcourant = tabcourant + n;
	// si fin du form on va soumettre
	if (tabcourant >= x.length) {
		// document.getElementById("formulaireInscription").submit();
		soummettreFormulaire();
		return false;
	}
	//sinon on va afficher le tab voulu
	montrerTab(tabcourant);
}

/*function validerForm() {
	// cette fonction permet de valider le tab courant
	var x, y, i;
	x = document.getElementsByClassName("tab");
	y = x[tabcourant].getElementsByTagName("input");
	// verifie si les inputs d un tab ne sont pas vides
	for (i = 0; i < y.length; i++) {
		// si vide le nom de la classe de l input change a invalid et par css la couleur de background est mis a rouge
		if (y[i].value == "" || y[i].value.trim() == "") {
			y[i].className += " invalid";
			// valid est mis a faux
			valide = false;
		}
	}
	// si valid l indicateur etape indique le fin de l etape
	if (valid) {
		document.getElementsByClassName("step")[tabcourant].className = "step finish";
	}; // retourn si validee ou pas
}*/
function validerForm(element) {
	// cette fonction permet de valider le tab courant
	
	// verifie si les inputs d un tab ne sont pas vides
		// si vide le nom de la classe de l input change a invalid et par css la couleur de background est mis a rouge
		if (element.value == "" || element.value.trim() == "") {
			element.className += " invalid";
			// valid est mis a faux
			valide = false;
		}if(element.name == "age" || element.name == "taille" || element.name == "age"){
			valide = validerAgeTaillePoids(element)
		}
	}
	// si valid l indicateur etape indique le fin de l etape
	 // retourn si validee ou pas

function validerAgeTaillePoids(element) {
	if(element.value <parseInt(element.min)){
		document.getElementById("message "+element.name).className="invalid";
		document.getElementById("message "+element.name).innerHTML="Votre "+element.name +" doit etre plus que "+ element.min;
	}else if(element.value > parseInt(element.max)){
		document.getElementById("message "+element.name).className="invalid";
		document.getElementById("message "+element.name).innerHTML="Votre "+element.name +" doit etre moins que "+ element.max;
	}else{
		document.getElementById("message "+element.name).className="";
		document.getElementById("message "+element.name).innerHTML="";
	}
	return;
}
function validercourrielMotPasseNomUtilisateur() { }

function indiquerEtap(n) {
	// cette methode permet d afficher l indicateur d etape
	var i, x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	//ajout active au nom de classe 
	x[n].className += " active";
}