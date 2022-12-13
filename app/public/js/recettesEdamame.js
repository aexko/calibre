function recommanderRecettes(exigencesDietiques,calories='',typeDeRepas='') {
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
    if(calories!= ''){    calories='&calories='+0+'-'+calories}
    if(typeDeRepas != ''){
        typesDeRepass = {'Dejeuner':'Breakfast','Diner':'Lunch','Souper':'Dinner','collation_du_Matin':'Snack','colattion_de_Soir':'Teatime'}
        typeDeRepas = "&mealType=" +typesDeRepass[typeDeRepas]
    }
    var url = encodeURI("https://api.edamam.com/search?q=" + listResultats+"&app_id=d7c579b4&app_key=aecba0b0311babbd898a3f4e96328475&random=true&count=1"+stringExigences+calories) +typeDeRepas;
    $.ajax({
        url:url,
        type: "GET",
        dataType: "json",
    }).then(function (response) {
        var recettes = document.getElementById("recettes")
        recettes.innerHTML = ""
        htmlAjouter= ''


        if(calories != '' && response.count > 0 ){
        recettes.innerHTML = "</br><h4>Votre "+typeDeRepas+" d'aujourd'hui est :</h4></br>"
        recettes.innerHTML += "</br><h4>"+ "Si vous acceptez ce défi, vous gagnerirez des points!</h4></br>"
        htmlAjouter ='margin-left:100px'
            compteur = 1
        }else{
            compteur = response.count
        }
        for (i = 0; i < compteur; i++) {
            recettes.innerHTML += `<div class="row product-lists" style="position: relative; height: 640px; margin-right:-1000px;`+htmlAjouter+`">
              <div class="col-lg-4 col-md-6 text-center strawberry" style="position: absolute; left: 0px; top: 0px;">
                <div class="single-product-item">
                  <div class="product-image">
                    <a href="single-product.html"><img src="`+response.hits[i].recipe.image+`" alt=""></a>
                  </div>
                  <h3>`+response.hits[i].recipe.label+`</h3>
                  <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                </div>
              </div>`
            /** 
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
            recettes.appendChild(paragraphe);*/
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