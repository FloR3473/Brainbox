require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const knowledgeRouters = require("./knowledge/knowledgeRouters");

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const { MongoClient } = require("mongodb");

app.use(knowledgeRouters);

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // Connexion au cluster MongoDB
    global.db = await client.connect();
    console.log("Connexion Mongo OK")
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
