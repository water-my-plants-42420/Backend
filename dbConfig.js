const knex = require("knex");

const knexConfig = require("../knexfiles.js");

module.exports = knex(knexConfig.development);