const calculs = require("../public/js/calculsCaloriesQuot");


test("imc 18.49999 est un situation de sous poids", () => {
	document.body.innerHTML =
	'<p id="maintenir"></p><p id="attein"></p><input id="objectif_poids"/>';
    situation=calculs.afficherIMC(18.49999)
expect(situation).toBe(". Vous êtes en situation d’insuffisance pondérale");
});
test("imc 24.9999 est un situation de poids normale", () => {
	document.body.innerHTML =
	'<p id="maintenir"></p><p id="attein"></p><input id="objectif_poids"/>';
    situation=calculs.afficherIMC(24.9999)
expect(situation).toBe(". Vous êtes de corpulence normale");
});
test("imc 70 est un situation de sur poids", () => {
	document.body.innerHTML =
	'<p id="maintenir"></p><p id="attein"></p><input id="objectif_poids"/>';
    situation=calculs.afficherIMC(70)
expect(situation).toBe(". Vous êtes en situation de surpoids");
});
test("imc 70 est un situation de sur poids", () => {
	document.body.innerHTML =
	'<p id="maintenir"></p><p id="attein"></p><input id="objectif_poids"/>';
    situation=calculs.afficherIMC(70)
expect(situation).toBe(". Vous êtes en situation de surpoids");
});
test("30kg, 170 cm donne la meme imc que 66.1387 lbs, 5 feet et 6.9291 ", () => {
	document.body.innerHTML =
	'<input id="lbs" value="66.1387"/><input id="feet" value="5"/><input id="inch" value="6.9291"/><input id="cm" value="170"/><input id="kg" value="30"/>';
	expect((calculs.calculerIMC('metrique')).Imc).toBe((calculs.calculerIMC('imperial')).Imc);
})
