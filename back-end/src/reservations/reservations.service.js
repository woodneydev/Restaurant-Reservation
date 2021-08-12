const knex = require("../db/connection");

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

const list = (reservation_date) => {
  return knex("reservations")
    .select("*")
    .whereNot("status", "finished")
    .andWhere({ reservation_date })
    .orderBy("reservation_time");
};

const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
};

const read = (reservation_id) => {
  return knex("reservations").select("*").where({ reservation_id }).first();
};

const update = (updatedReservation) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updated) => updated[0]);
};

module.exports = {
  search,
  list,
  create,
  update,
  read,
};
