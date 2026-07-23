//Importer les fonctions présentes dans knowledgeModel.js
const knowledgeModel= require("./knowledgeModel");

//Déclaration de la requête pour vérifier la connexion d'un utilisateur
async function findUserByMailAndPassword (req, res) {
  if (!req.body) {
    return res.status(400).json({ success: false, message: "Body manquant" });
  }

  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ success: false, message: "Body malformé" });
  }

  await userModel.findUserByMailAndPassword(
    mail,
    password,
    (user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "connexion OK",
          user,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Identifiants incorrects" });
      }
    },
  );
};

//Déclaration de la requête une connaissance par son id
async function findKnowledgeById (req, res) {
  const { id } = req.params;
  const result = await knowledgeModel.findKnowledgeById(id)

  return res.status(202).json({success : true, result})

};


//Déclaration de la requête voir toutes les connaissances
async function findAllKnowlegde (req, res) {

  const result = await knowledgeModel.findAllKnowlegde()

  return res.status(202).json({success : true, result})

};

//Déclaration de la requête pour ajouter une connaissance
async function addKnowledge (req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  const payload = {title, content} ;
  const result = await knowledgeModel.addKnowledge(payload);

  return res.status(202).json({insertedId: result.insertedId})
}

//Déclaration de la requête pour modifier une connaissance
async function updateKnowledge (req, res)  {
  const { id } = req.params;
  const { title, content } = req.body;

  console.log(id, title, content);

  if ( !id ) {
    return res.status(400).json({
      success: false,
      message: "Paramètre manquant",
    });
  };
  
  if ( !title || !content ) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  };


  const result = await knowledgeModel.updateKnowledge(id, title, content)
  return res.status(202).json({"message" : "Document modifié"})

};


// Déclaration de la requête pour supprimer une connaissance
async function deleteKnowledge(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "Paramètre manquant" });
  }
  const result = await knowledgeModel.deleteKnowledge(id)
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Connaissance introuvable"
      });
    }

    return res.status(200).json({
      message: "Connaissance supprimée"
    });

  };


module.exports = { findUserByMailAndPassword, findKnowledgeById, findAllKnowlegde, addKnowledge, updateKnowledge, deleteKnowledge} ;