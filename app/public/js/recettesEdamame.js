function recommanderRecettes() {
    resultats = document.getElementsByClassName('search-choice');
    listResultats = resultats[0].dataset.ide
    for (i = 1; i < resultats.length; i++) {
            listResultats += " "+resultats[i].dataset.ide;
    }
    var url = encodeURI("https://api.edamam.com/search?app_id=d7c579b4&app_key=aecba0b0311babbd898a3f4e96328475&q=" + listResultats);
    $.ajax({
        url:url,
        type: "GET",
        dataType: "json",
    }).then(function (response) {
        var recettes = document.getElementById("recettes")
        recettes.innerHTML = ""
        for (i = 0; i < response.count; i++) {
            const paragraphe = document.createElement("p");
            const image = document.createElement("img");
            const titre = document.createElement("h1");
            const node = document.createTextNode("Recipe: " + response.hits[i].recipe.label);
            image.setAttribute("src", response.hits[i].recipe.image);
            const node2 = document.createTextNode(response.hits[i].recipe.ingredientLines);

            titre.appendChild(node);
            paragraphe.appendChild(node2);
            recettes.appendChild(titre);
            recettes.appendChild(image);
            recettes.appendChild(paragraphe);
        }

    })
}