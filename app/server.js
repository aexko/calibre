const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

// Rendering home page
app.get('/', (req, res) => {
  res.render('pages/index')
})

// Rendering about page
app.get('/about', (req, res) => {
    res.render('pages/about')
  })

// For website access
app.listen(port, () => {
  console.log(`Le serveur est activé sur localhost:${port}`)
})


// Connexion MongoDB CLOUD

// const { MongoClient } = require('mongodb');

// async function main() {

//     const uri = "mongodb+srv://admin:admin@calibre.unyolim.mongodb.net/?retryWrites=true&w=majority";

//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         await listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }

// main().catch(console.error);

// /**
//  * Print the names of all available databases
//  * @param {MongoClient} client A MongoClient that is connected to a cluster
//  */
// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };



var SpoonacularApi = require('spoonacular_api');

var defaultClient = SpoonacularApi.ApiClient.instance;
// Configure API key authorization: apiKeyScheme
var apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = "3b2c9d7b94d24ca785d5fccdfce53e3a"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeyScheme.apiKeyPrefix['x-api-key'] = "Token"

var api = new SpoonacularApi.IngredientsApi()
var opts = {
  'query': burger, // {String} The (natural language) search query.
  'number': 10, // {Number} The maximum number of items to return (between 1 and 100). Defaults to 10.
  'metaInformation': false, // {Boolean} Whether to return more meta information about the ingredients.
  'intolerances': egg // {String} A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
};
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.autocompleteIngredientSearch(opts, callback);

app.get('/food', (req, res) => {
  res.render('pages/page_test_food_api')
})