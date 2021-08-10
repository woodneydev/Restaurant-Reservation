const knex = require("../db/connection")

const create = (table) => {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then(createdTables => createdTables[0])
}

module.exports = {
    create,
}