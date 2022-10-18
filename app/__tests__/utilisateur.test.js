const { describe } = require("node:test");
const Activite = require("../models/activite");

describe("utilisateur.js", () => {
	describe("getActiviteForm", () => {
		const activite = new Activite({
			titre: "Activite1",
			description: "Description1",
			date: "01-01-2001",
			calories: "1000",
		});

		console.log(activite);
	});
});
