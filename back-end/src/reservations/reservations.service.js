const knex = require("../db/connection")


const list = (reservation_date) => {
    return knex("reservations")
        .select("*")
        .where({reservation_date})
        .orderBy("reservation_time")
}

const create = (reservation) => {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservation) => createdReservation[0] )
}

const read = (reservation_id) => {
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .first()
}

module.exports = {
    list,
    create,
    read,
}