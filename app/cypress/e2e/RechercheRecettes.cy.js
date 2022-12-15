describe("RechercheRecettes", () => {
	it("Page est accessible", () => {
		cy.visit("http://localhost:3000/recettes");
	});
	it('Entrer "apple"', () => {
		cy.get("#recherche_recettes").type("apple");
	});
	it('Clique sur le bouton "Trouver une recherche"', () => {
		cy.get('.jumbotron > button').click();
	});
	it('Les données sont correctes"', () => {
		cy.get("h2").should("have.text", "Apple Cake");
		cy.get("img").should(
			"have.attr",
			"src",
			"https://spoonacular.com/recipeImages/Apple-Cake-632485.jpg"
		);
		cy.get("#source").should(
			"have.text",
			"http://www.foodista.com/recipe/QBQCV5FG/apple-cake"
		);
	});
});
