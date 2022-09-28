

export function getSource(id) {
    $ajax({
        url:"https://api.spoonacular.com/recipes/"+id+"/information?apiKey=3b2c9d7b94d24ca785d5fccdfce53e3a",
        success: fonction(res) ({
            document.getElementById("sourceLink").innerHTML=res.sourceUrl

        })
    })
}