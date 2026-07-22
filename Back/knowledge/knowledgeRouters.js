const express = require("express");
const router = express.Router();
const knowledgeControler = require ("./knowledgeControler");

router.post("/login",knowledgeControler.findUserByMailAndPassword)

router.get("/users",knowledgeControler.findAllUsers)

router.post("/knowledge",knowledgeControler.addKnowledge)

router.put("/updatemail",knowledgeControler.updateUserMail)

router.put("/updatepass",knowledgeControler.updateUserPassword)

router.delete("/delete/:mail",knowledgeControler.deleteUser)


module.exports = router