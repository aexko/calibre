describe("RechercheRecettes", () => {
	it("Page est accessible", () => {
		cy.visit("http://localhost:3000/recettes");
	});
	it('Entrer "apple"', () => {
		cy.get("#recherche_recettes").type("apple");
	});
	it('Clique sur le bouton "Trouver une recherche"', () => {
		cy.get('button').click()
	});
});
