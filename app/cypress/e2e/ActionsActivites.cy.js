describe("Ajouter une activité", () => {
	it("Page ajouter-activite est accessible", () => {
		cy.visit("http://localhost:3000/ajouter-activite");
	});
	it('Entre "Course" comme activité', () => {
		cy.get('#titre_activite').type("Course");
    cy.wait(500)

	});
  it('Entre une description de la course"', () => {
		cy.get('#description').type("Avec des amis au Mont-Royal, 5km");
    cy.wait(500)

	});
  it('Entre la date de la course', () => {
		cy.get('#date').type("2022-06-01");
    cy.wait(500)

	});

  it('Clique sur le bouton "Ajouter"', () => {
    cy.get('.btn').click();
    cy.wait(500)

  });

  it("Page afficher-activite est accessible", () => {
		cy.visit("http://localhost:3000/afficher-activites");
    cy.wait(500)

	});
  it("Verification des donnees", () => {
		cy.get('tbody > :nth-child(1) > :nth-child(1)').should('contain', 'Course');
    cy.wait(500)

    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', 'Avec des amis au Mont-Royal, 5km');
    cy.wait(500)

    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('contain', '2022-06-01');
    cy.wait(500)

	});



  it('Suppression de l activite', () => {
    cy.get('.delete > .fa-solid').click();
    cy.wait(500)

  });
});
