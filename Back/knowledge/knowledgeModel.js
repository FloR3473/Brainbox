const { ObjectId } = require("mongodb");

require("dotenv").config();
const DB = process.env.MONGODB_DB;
const COLLECTION = process.env.MONGODB_COLLECTION;

function findUserByMailAndPassword(mail, password, callback) {
  const sql =
    "SELECT id, mail, role FROM users WHERE mail = ? AND password = ?";

  db.get(sql, [mail, password], (err, user) => {
    if (err) {
      return callback(null);
    }
    callback(user);
  });
}

async function findAllKnowlegde(callback) {
  return await global.db.db(DB).collection(COLLECTION).find().toArray()
}

async function addKnowledge(payload)  {
  return await global.db.db(DB).collection(COLLECTION).insertOne(payload) ; 
}

function updateUserMail(mail,id,callback) {
  const sql =
    "UPDATE users SET mail = ? WHERE id =?";

  db.run(sql, [mail,id], function (err) {
    if (err) {
      console.error("Erreur modification mail :", err.message);
    return callback(null);
    }

    if (this.changes === 0) {
      console.log("Mail non modifié");
    return callback(null);
    }

    console.log("Mail modifié");
    return callback({
      id,
      mail
    });
  });
}

function updateUserPassword(password,id,callback) {
  const sql =
    "UPDATE users SET password = ? WHERE id =?";

  db.run(sql, [password,id], function (err) {
    if (err) {
      console.error("Erreur modification password :", err.message);
    return callback(null);
    }

    if (this.changes === 0) {
      console.log("Password non modifié");
    return callback(null);
    }

    console.log("Password modifié");
    return callback({
      id,
      password
    });
  });
}

async function deleteKnowledge(id) {
  return await global.db.db(DB).collection(COLLECTION).deleteOne({ _id : new ObjectId(id) });
}


module.exports = { findUserByMailAndPassword, findAllKnowlegde, addKnowledge, updateUserMail, updateUserPassword, deleteKnowledge} ;