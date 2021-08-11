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

const update = (updatedReservation) => {
    console.log("upppppp,", updatedReservation)
    return knex("reservations")
        .select("*")
        .where({reservation_id: updatedReservation.reservation_id})
        .update(updatedReservation, "*")
        .then((updated) => updated[0])
}

module.exports = {
    list,
    create,
    update,
    read,
}