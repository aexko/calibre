describe("Chercher un nutriment", () => {
	it("Page est accessible", () => {
		cy.visit("http://localhost:3000/nutriments");
	});
	it('Entre "apple"', () => {
		cy.get("#recherche_nutriments").type("banana");
	});
	it('Clique sur le bouton "Trouver une recherche"', () => {
		cy.get("#envoyer").click();
	});

	it('Les données sont correctes"', () => {
		cy.get(".jumbotron > p > span > #nom_nutriment")
	});
});
