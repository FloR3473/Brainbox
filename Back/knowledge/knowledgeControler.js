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


//Déclaration de la requête voir tous les utilisateurs qui sont enregistrés dans la Bdd
async function findAllUsers (req, res) {

 await userModel.findAllUsers(
    (user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "Tous les utilisateurs trouvés",
          user,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Utilisateurs non trouvés" });
      }
    },
  );
};

//Déclaration de la requête pour ajouter des utilisateurs
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
  //  (knowledge) => {
//     if (!knowledge) {
//       return res.status(400).json({
//         success: false,
//         message: "Connaissance déjà existante",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Connaissance créée",
//       knowledge,
//     });
//   });
// };

//Déclaration de la requête pour modifier le mail de l'utilisateur
async function updateUserMail (req, res)  {
  const {mail, id} = req.body;

  if (!id || !mail) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  await userModel.updateUserMail(mail, id,(user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Profil non modifié",
      });
    }
    else (user)
      return res.status(200).json({
      success: true,
      message: "Profil modifié",
      user,
    });
  });
};

//Déclaration de la requête pour modifier le password de l'utilisateur
async function updateUserPassword (req, res) {
  const {password, id} = req.body;

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  await userModel.updateUserPassword(password, id,(user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Profil non modifié",
      });
    }
    else (user)
      return res.status(200).json({
      success: true,
      message: "Profil modifié",
      user,
    });
  });
};

// Déclaration de la requête pour supprimer un utilisateur
async function deleteUser(req, res) {
  const { mail } = req.params;  
  if (!mail) {
    return res.status(400).json({ success: false, message: "Paramètre manquant" });
  }
  
 await userModel.deleteUser(mail, (err, user) => {
    if (err){
      return res.status(500).json({
        success: false,
        message: "Erreur dans la suppression utilisateur",
    })
  }
    if (user === false) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    
  } else if (user === true) {
    return res.status(200).json({
      success: true,
      message: "Utilisateur supprimé",
    });
  }
  });
};


module.exports = { findUserByMailAndPassword, findAllUsers, addKnowledge, updateUserMail, updateUserPassword, deleteUser} ;