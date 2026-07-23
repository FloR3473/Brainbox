const express = require("express");
const router = express.Router();
const knowledgeController = require ("./knowledgeController");

// router.post("/login",knowledgeController.findUserByMailAndPassword)

router.get("/knowlegde",knowledgeController.findAllKnowlegde)

router.get("/knowlegde/:id",knowledgeController.findKnowledgeById)

router.post("/knowledge",knowledgeController.addKnowledge)

router.put("/knowledge/:id",knowledgeController.updateKnowledge)

router.delete("/knowledge/:id",knowledgeController.deleteKnowledge)


module.exports = router