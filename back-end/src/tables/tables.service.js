const knex = require("../db/connection")

const list = () => {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}

const create = (table) => {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then(createdTables => createdTables[0])
}

module.exports = {
    list,
    create,
}