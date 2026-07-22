const express = require("express");
const router = express.Router();
const knowledgeControler = require ("./knowledgeControler");

// router.post("/login",knowledgeControler.findUserByMailAndPassword)

router.get("/allKnowlegde",knowledgeControler.findAllKnowlegde)

router.post("/knowledge",knowledgeControler.addKnowledge)

// router.put("/updatemail",knowledgeControler.updateUserMail)

// router.put("/updatepass",knowledgeControler.updateUserPassword)

router.delete("/knowledge/:id",knowledgeControler.deleteKnowledge)


module.exports = router