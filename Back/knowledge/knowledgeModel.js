const { ObjectId } = require("mongodb");

require("dotenv").config();
const DB = process.env.MONGODB_DB;
const COLLECTION = process.env.MONGODB_COLLECTION;

function getKnowledgeDb() {
  return global.db
    .db(DB)
    .collection(COLLECTION);
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

async function findKnowledgeById(id) {
  return await getKnowledgeDb()
    .find( { _id: new ObjectId(id) } )
    .toArray();
}


async function updateKnowledge(id, payload) {
  const filtre = { _id: new ObjectId(id) };
  return await getKnowledgeDb()
    .updateOne(
      filtre,
      { $set: payload },
    );
}


async function deleteKnowledge(id) {
  return await getKnowledgeDb()
    .deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  findKnowledgeById,
  findAllKnowlegde,
  addKnowledge,
  updateKnowledge,
  deleteKnowledge,
};
