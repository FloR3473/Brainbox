const { ObjectId } = require("mongodb");

require("dotenv").config();
const DB = process.env.MONGODB_DB;
const COLLECTION = process.env.MONGODB_COLLECTION;

function getKnowledgeDb() {
  return global.db
    .db(DB)
    .collection(COLLECTION);
}
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

async function findAllKnowlegde() {
  return await getKnowledgeDb()
    .find()
    .toArray();
}


async function addKnowledge(payload) {
  return await getKnowledgeDb()
    .insertOne(payload);
}

async function updateKnowledge(id, title, content) {
  const filtre = { _id: new ObjectId(id) };
  const update = { title: title, content: content };
  return await getKnowledgeDb()
    .updateOne(
      filtre,
      { $set: update },
    );
}

function updateUserPassword(password, id, callback) {
  const sql = "UPDATE users SET password = ? WHERE id =?";

  db.run(sql, [password, id], function (err) {
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
      password,
    });
  });
}

async function deleteKnowledge(id) {
  return await getKnowledgeDb()
    .deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  findUserByMailAndPassword,
  findAllKnowlegde,
  addKnowledge,
  updateKnowledge,
  updateUserPassword,
  deleteKnowledge,
};
