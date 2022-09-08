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
  console.log(`Server's on localhost:${port}`)
})


// Connexion MongoDB CLOUD

const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://admin:admin@calibre.unyolim.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};