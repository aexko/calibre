function getSource(id) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a",
        success: function (res) {
            document.getElementById("source").innerHTML = res.sourceUrl
            document.getElementById("source").href = res.sourceUrl
        }
    });
}

function getRecette(q) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a&number=1&query=" + q,
        success: function (res) {
            try {
                document.getElementById("sortie").innerHTML = "<br><h2>" + res.results[0].title + "</h2><img src='" + res.baseUri + res.results[0].image + "'width='400' /><br> Durée : " + res.results[0].readyInMinutes + " minutes"
                getSource(res.results[0].id)
            } catch (err) {
                console.log("Erreur: " + err.name)
                document.getElementById("sortie").innerHTML = "Pas de recettes trouvées";
            }
        }
    })
}