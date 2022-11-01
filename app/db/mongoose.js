// const mongoose = require("mongoose");

// /**
//  * Connexion MongoDB à la base de données (LOCALE) nommée "calibre"
//  */
// module.exports = {
// 	connect: () => {
// 		mongoose.connect("mongodb://127.0.0.1:27017/" + nomDb, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 	},
// };

// ============================================================

/**
 * Connexion MongoDB à la base de données (CLOUD - MongoDB Atlas) nommée "calibre"
 */
// mongoose.connect(
// "mongodb+srv://${nomUtilisateur}:${motPasse}@${cluster}.unyolim.mongodb.net/${nomDb}?retryWrites=true&w=majority",
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	}
// );

//

// const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI;
// const client = new MongoClient(connectionString, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// let dbConnection;

// module.exports = {
// 	connectToServer: function (callback) {
// 		client.connect(function (err, db) {
// 			if (err || !db) {
// 				return callback(err);
// 			}

// 			dbConnection = db.db("sample_airbnb");
// 			console.log("Successfully connected to MongoDB.");

// 			return callback();
// 		});
// 	},

// 	getDb: function () {
// 		return dbConnection;
// 	},
// };

// ============================================================
// CONNEXION AVEC MONGODB ATLAS
// SOURCE: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
// const {MongoClient} = require('mongodb');

// async function main() {
// 	/**
// 	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
// 	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
// 	 */
// 	const uri =
// 		"mongodb+srv://admin:admin@calibre.unyolim.mongodb.net/test";

// 	const client = new MongoClient(uri);

// 	try {
// 		// Connect to the MongoDB cluster
// 		await client.connect();

// 		// Make the appropriate DB calls
// 		await listDatabases(client);
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		await client.close();
// 	}
// }

// main().catch(console.error);

const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://admin:admin@calibre.dfqw6jq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (err || !db) {
				return callback(err);
			}

			dbConnection = db.db("calibre");
			console.log("Connexion à MongoDB réussie.");

			return callback();
		});
	},

	getDb: function () {
		return dbConnection;
	},
};
