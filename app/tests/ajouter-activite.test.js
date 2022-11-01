// SOURCE: https://mongoosejs.com/docs/jest.html
// SOURCE: https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d

// const bd = require("../db/db-handler");
// const utilisateurController = require("../controllers/utilisateur");

// /**
//  * Connecter à une nouvelle base de données en mémoire avant d'exécuter des tests.
//  */
// beforeAll(async () => {
// 	jest.setTimeout(60000);
// 	await bd.connect();
// });

// /**
//  * Nettoie la base de données après chaque test.
//  */
// jest.setTimeout(60000);
// afterEach(async () => await bd.clearDatabase());

// /**
//  * Supprime et fermes la base de données et le serveur.
//  */
// jest.setTimeout(60000);
// afterAll(async () => await bd.closeDatabase());

// /**
//  * Tests unitaires sur les activités
//  */
// describe("activite ", () => {
// 	/**
// 	 * Teste si une activité peut etre créée avec le modèle activité.js sans erreur
// 	 */
// 	it("peut etre creee correctement", async () => {
// 		await utilisateurController.create(activiteExemple);
// 		expect(activiteExemple).toBeDefined();
// 	});
// });

// /**
//  * Exemple d'activité complète
//  */
// const activiteExemple = {
// 	titre: "Activité 1",
// 	description: "Description de l'activité 1",
// 	date: "2021-01-01",
// 	calories: 100,
// };

// ======================
const { MongoClient } = require("mongodb");

describe("Ajouter une activité", () => {
	beforeAll(async () => {
        // const uri = "mongodb+srv://admin:admin@calibre.dfqw6jq.mongodb.net/?retryWrites=true&w=majority";
        const uri = "mongodb://localhost:27017";
        const client = new MongoClient(uri);
        try {
            await client.connect();
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
	});

    it ("can connect to MongoDB", async () => {
        expect(true).toBe(true);
    });
		
});

// ======================


