/** @jest-environment jsdom */

const recettes = require("../public/js/recettesEdamame");
describe("Ajax de requêtage vers l'api Edamame", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		$ = require("jquery");
		global.$ = $;
			});
		document.body.innerHTML =
			'<input class="search-choice" data-ide="a" /><input class="search-choice" data-ide="b" /><input class="search-choice" data-ide="c" />';

	it("la methode est appelé", () => {
		const ajaxSpy = jest.spyOn($, "ajax");
		recettes.recommanderRecettes(JSON.stringify({}));
		expect(ajaxSpy).toBeCalledWith({
			url: "https://api.edamam.com/search?q=a%20b%20c&app_id=d7c579b4&app_key=aecba0b0311babbd898a3f4e96328475",
			type: "GET",
			dataType: "json",
		});
	});
});