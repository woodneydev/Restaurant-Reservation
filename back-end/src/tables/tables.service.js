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

const read = (table_id) => {
    return knex("tables")
        .select("*")
        .where({table_id})
        .first()
}

const update = (updatedTable) => {
    return knex("tables")
        .select("*")
        .where({table_id: updatedTable.table_id})
        .update(updatedTable, "*")
        .then((updated) => updated[0])
}

const destroy = (table_id) => {
    return knex("tables")
}

module.exports = {
    list,
    create,
    read,
    update,
}