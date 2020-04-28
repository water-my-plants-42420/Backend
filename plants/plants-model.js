const db = require("../dbConfig");
module.exports = {
    add,
    find,
    findByUser,
    findById
};

function find() {
    return db('plants').select("id", "name", "species", "water_freq", "user_id");
}

function findByUser(userid) {
    return db("plants").where("user_id", userid);
}

async function add(plant) {
    const [id] = await db('plants').insert(plant);

    return findById(id);
}

function findById(id) {
    return db("plants").where({
        id
    }).first();
}

function update(id, changes) {
    return db('plants').where({id}).update(changes);
}

function remove(id) {
    return db('plants').where('id', id).del();
}