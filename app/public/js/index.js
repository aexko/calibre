/*cette methode permet de faire un requete post ajax au route inscription et si le courriel n est pas existant dans la bd 
le compte de client va etre cree sinon l utilisateur devrait changer le courriel jusqu a ce qu il soit unique
l utilisation d ajax permet de faire des requetes sans la rechargement de la page et pour que l utilisateur n aie
 pas a reentrer tous ses donnees en cas d erreur*/
function soummettreFormulaire() {
    /*si le champs d avertissement de nom d utilisateur est vide on fait une requete post sinon on attend jusqu a
     ce qu il sois vide pour proceder avec la requete post ajax*/
    if (document.getElementById('avertirNomUtilisateur').innerHTML == '') {
        var formulaire = $("#formulaireInscription");
        $.ajax({
            url: "http://localhost:3000/inscription",
            type: "POST",
            data: formulaire.serialize(),
            dataType: 'json',
            success: function (result) {
            //on alert le resultat sois : courriel deja existant ou creation avec succes
                alert(result.msg);
                if (result.titre == 'existant') {
                //si le resultat de route post est existant on vide le champs de courriel
                    document.getElementById('email').value = ''
                } else {
                //si le compte a ete cree avec succes on va a la page d accueil
                    location.replace("/");
                }
            }
        });
    }
}