// const { MongoClient } = require("mongodb");

// let connection;
// let db;

// beforeAll(async () => {
// 	connection = await MongoClient.connect(global.__MONGO_URI__);
// 	db = await connection.db(global.__MONGO_DB_NAME__);
// });

// afterAll(async () => {
// 	await connection.close();
// 	await db.close();
// });

// it("should aggregate docs from collection", async () => {
// 	const files = db.collection("files");

// 	await files.insertMany([
// 		{ type: "Document" },
// 		{ type: "Video" },
// 		{ type: "Image" },
// 		{ type: "Document" },
// 		{ type: "Image" },
// 		{ type: "Document" },
// 	]);

// 	const topFiles = await files
// 		.aggregate([
// 			{ $group: { _id: "$type", count: { $sum: 1 } } },
// 			{ $sort: { count: -1 } },
// 		])
// 		.toArray();

// 	expect(topFiles).toEqual([
// 		{ _id: "Document", count: 3 },
// 		{ _id: "Image", count: 2 },
// 		{ _id: "Video", count: 1 },
// 	]);
// });

// const { default: test, describe } = require("node:test")
const request = require("supertest")
const Activite = require("../models/activite");
const app = require("../app");
require("../db/playground")
const mongoose = require("mongoose");

beforeEach(async ()=> {
	await Activite.deleteMany();
	const activiteExemple = new Activite({
		_id: new mongoose.Types.ObjectId(),
		titre: "Course",
		description: "Description1",
		date: "01-01-2001",
		calories: "300",
	});
})



// setup testing environment
describe("Ajouter activite", () => {
	it("devrait etre declare dans la bd", async () => {
		const response = await request(app).post("/ajouter-activite").send({
			titre: "Course",
			description: "Description1",
			date: "01-01-2001",
			calories: "300",
		})
		console.log(response);

		// const activiteTest = await Activite.findOne({ titre: "Course" });
		// console.log(activiteTest);
		// expect(activiteTest.titre).toBe("Course");

		
	});

	
});