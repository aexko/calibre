function recommanderRecettes(exigencesDietiques) {
    exigences = JSON.parse(exigencesDietiques)
    stringExigences = ''
    for(i = 0; i < exigences.length; i++){
        stringExigences+="&health="+exigences[i].cle_api;
    }
    console.log(stringExigences)
    resultats = document.getElementsByClassName('search-choice');
    listResultats='';
    if(resultats.length>0){
    listResultats = resultats[0].dataset.ide
    for (i = 1; i < resultats.length; i++) {
            listResultats += " "+resultats[i].dataset.ide;
    }
    var url = encodeURI("https://api.edamam.com/search?q=" + listResultats+"&app_id=d7c579b4&app_key=aecba0b0311babbd898a3f4e96328475"+stringExigences);
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
            const node2 = document.createTextNode(response.hits[i].recipe.ingredientLines +response.hits[i].recipe.calories+' '+response.hits[i].recipe.yield+response.hits[i].recipe.healthLabels);

            titre.appendChild(node);
            paragraphe.appendChild(node2);
            recettes.appendChild(titre);
            recettes.appendChild(image);
            recettes.appendChild(paragraphe);
        }

    })
}
}

module.exports={recommanderRecettes}
/**$.ajax({
    url:'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=es-en&key=trnsl.1.1.20160702T062231Z.b01e74e50f545073.41cbb76d976818cfaa0e1ac3ac78b561079e3420&text='+msg,
    method:"POST",
    data:JSON.stringify({"input":msg}),
    contentType: 'application/x-www-form-urlencoded',
    crossDomain:true
  }).success((data)=>{
      this.setState({
         messageText: data

      //set variable to data
  }).error((error)=>{
    console.log(error);
  });**/