/**
 * Fonction qui trouve la source du nutriment
 * @param {number} id - ID du nutriment
 */
function getNutrimentInfo(id) {
	$.ajax({
		url:
			"https://api.spoonacular.com/food/ingredients/" +
			id +
			"/information?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a&amount=150&unit=grams",
		success: function (res) {
			document.getElementById("id_nutriment").textContent = id;
			document.getElementById("nom_nutriment").textContent = res.name;
			document.getElementById("quantite_calories").textContent =
				res.nutrition.nutrients[20].amount;
			document.getElementById("type_nutriment").textContent =
				res.categoryPath[0];
		},
	});
}

/**
 * Fonction qui trouve un nutriment
 * @param {string} query - Entrée de l'utilisateur
 */
function getNutrimentID(query) {
	$.ajax({
		url:
			"https://api.spoonacular.com/food/ingredients/search?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a&query=" +
			query,
		success: function (res) {
			try {
				getNutrimentInfo(res.results[0].id);
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
