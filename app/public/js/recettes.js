/**
 * Fonction qui trouve la source de la recette
 * @author Alex Kao
 * @param {number} id - ID de la recette
 */
function getSource(id) {
	$.ajax({
		url:
			"https://api.spoonacular.com/recipes/" +
			id +
			"/information?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a",
		success: function (res) {
			document.getElementById("source").innerHTML = res.sourceUrl;
			document.getElementById("source").href = res.sourceUrl;
		},
	});
}

/**
 * Fonction qui trouve une recette
 * @author Alex Kao
 * @param {string} query - Entrée de l'utilisateur
 */
function getRecette(query) {
	$.ajax({
		url:
			"https://api.spoonacular.com/recipes/search?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a&number=1&query=" +
			query,
		success: function (res) {
			try {
				document.getElementById("sortie").innerHTML =
					"<br><h2>" +
					res.results[0].title +
					"</h2><img src='" +
					res.baseUri +
					res.results[0].image +
					"'width='400' /><br> Durée : " +
					res.results[0].readyInMinutes +
					" minutes" +
					"<br> Portions : " +
					res.results[0].servings;
				if (res.results[0] != null) {
					getSource(res.results[0].id);
				}
			} catch (err) {
				console.log(
					"Erreur: " +
						err.name +
						" - Aucune recette trouvée dans la base de données de SpoonacularAPI"
				);
				alert(
					"Désolé, aucune recette trouvée. Veuillez réessayer avec des mots en anglais, merci!"
				);
			}
		},
	});
}
