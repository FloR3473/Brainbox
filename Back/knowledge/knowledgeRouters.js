const express = require("express");
const router = express.Router();
const knowledgeController = require ("./knowledgeController");


router.get("/knowlegde",knowledgeController.findAllKnowlegde)

router.get("/knowlegde/:id",knowledgeController.findKnowledgeById)

router.post("/knowledge",knowledgeController.addKnowledge)

router.put("/knowledge/:id",knowledgeController.updateKnowledge)

router.delete("/knowledge/:id",knowledgeController.deleteKnowledge)


router.post("/assistant", knowledgeController.askAssistant)


module.exports = router