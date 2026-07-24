//Importer les fonctions présentes dans knowledgeModel.js
const knowledgeModel = require("./knowledgeModel");
const extractTags = require("./utils/tagsUtils");

const axios = require("axios");

//Déclaration de la requête une connaissance par son id
async function findKnowledgeById(req, res) {
  try {
    const { id } = req.params;
    const result = await knowledgeModel.findKnowledgeById(id);

    return res.status(202).json({ success: true, result });
  } catch(error) {
    res.status(500).json({
    error:error.message
    });
  };
};

//Déclaration de la requête voir toutes les connaissances
async function findAllKnowlegde(req, res) {
  try {
  const result = await knowledgeModel.findAllKnowlegde();

  return res.status(202).json({ success: true, result });

  } catch(error) {
    res.status(500).json({
    error:error.message
    });
  };
};

//Déclaration de la requête pour ajouter une connaissance
async function addKnowledge(req, res) {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category || !tags) {
      return res.status(400).json({
        success: false,
        message: "Body malformé",
      });
    }

    const payload = { title, content, category, tags : extractTags(tags), createAt: new Date() };
    const result = await knowledgeModel.addKnowledge(payload);

    return res.status(202).json({ insertedId: result.insertedId });
  
} catch(error) {
  res.status(500).json({
      error:error.message
    });
  };
};


//Déclaration de la requête pour modifier une connaissance
async function updateKnowledge(req, res) {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;


    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Paramètre manquant",
      });
    }

    if (!title || !content || !category || !tags) {
      return res.status(400).json({
        success: false,
        message: "Body malformé",
      });
    }
    const payload = { title, content, category, tags : extractTags(tags), modifiedAt: new Date() };
    const result = await knowledgeModel.updateKnowledge(id, payload);
    return res.status(202).json({ message: "Document modifié" });

  } catch(error) {
  res.status(500).json({
      error:error.message
    });
  };
};

// Déclaration de la requête pour supprimer une connaissance
async function deleteKnowledge(req, res) {
  try {
    const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Paramètre manquant" });
      }
      const result = await knowledgeModel.deleteKnowledge(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "Connaissance introuvable",
        });
      }

      return res.status(200).json({
        message: "Connaissance supprimée",
      });

  } catch(error) {
    res.status(500).json({
        error:error.message
    });
  };
};


// Déclaration envoyer une question à Ollama
async function askAssistant(req, res) {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Question manquante" });
    }

    const tags = extractTags(question);


    let connaissances = await knowledgeModel.findKnowledgeByTag(tags);
    connaissances = connaissances.map(connaissances => {return connaissances.content})

    const promptOllama = `Tu es BrainBox.
        Tu n'utilises jamais tes connaissances générales.
        Tu réponds uniquement avec les informations fournies.
        Si la réponse n'existe pas dans les informations,
        réponds exactement :
        "Je ne possède pas cette information."

        Informations disponibles :

        ${connaissances}

        Question utilisateur :

        ${question}`

    const ollamaResponse = await axios.post(
      process.env.OLLAMA_URL,
      {
          model: process.env.OLLAMA_MODEL,
          prompt: promptOllama,
          stream: false
      }
    );


    res.json({
      question: question,
      connaissances: connaissances,
      answer: ollamaResponse.data.response
    });

  } catch(error) {
    res.status(500).json({
        error:error.message
    });
  };
};



module.exports = {
  findKnowledgeById,
  findAllKnowlegde,
  addKnowledge,
  updateKnowledge,
  deleteKnowledge,
  askAssistant
};
