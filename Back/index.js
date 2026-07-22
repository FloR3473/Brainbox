const express = require("express");
const app = express();
const knowledgeRouters = require ("./knowledge/knowledgeRouters");


app.use(express.json());

app.use (knowledgeRouters)


app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});