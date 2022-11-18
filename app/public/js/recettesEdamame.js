$.ajax({
	url: "https://api.edamam.com/search?q=shrimp&app_id=d7c579b4&app_key=aecba0b0311babbd898a3f4e96328475",
	type: "GET",
	dataType: "json",
}).then (function(response) {
	console.lig(response)
})