describe("Chercher un nutriment", () => {
	it("Page est accessible", () => {
		cy.visit("http://localhost:3000/nutriments");
	});
	it('Entre "banana"', () => {
		cy.get("#recherche_nutriments").type("banana");
	});
	it('Clique sur le bouton "Trouver une recherche"', () => {
		cy.get("#envoyer").click();
	});

	it('Les données sont correctes"', () => {
		cy.get("#nom_nutriment").should("have.text", "banana");
		cy.get("#id_nutriment").should("have.text", "9040");
		cy.get("#quantite_calories").should("have.text", "0.75");
		cy.get("#type_nutriment").should("have.text", "tropical fruit");
	});
});
