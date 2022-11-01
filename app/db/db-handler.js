const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

/**
 * Connecte à la base de données en mémoire.
 */
module.exports.connect = async () => {
	const uri = await mongod.getConnectionString();

	const mongooseOpts = {
		useNewUrlParser: true,
		autoReconnect: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 1000,
	};

	await mongoose.connect(uri, mongooseOpts);
};

/**
 * Supprime la base de données, ferme la connexion et arrête mongod.
 */
module.exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

/**
 * Supprime tous les documents de la base de données.
 */
module.exports.clearDatabase = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
	}
};
