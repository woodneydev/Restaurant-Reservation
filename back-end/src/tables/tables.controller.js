
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const service = require("./tables.service")
const reservationsService = require("../reservations/reservations.service")


// Validation MiddleWare

const validProperties = [
    "table_name",
    "capacity",
    "reservation_id"
]

const hasValidProperties = (req, res, next) => {
    const { data = {} } = req.body

    const invalidFields = Object.keys(data).filter(field => !validProperties.includes(field))

    if (invalidFields.length) {
        next({status: 400, message: `Invalid field(s): ${invalidFields.join(", ")}`})
    } else {
        next()
    }
}

const hasRequiredProperties = hasProperties("table_name", "capacity")

const nameHasTwoChars = (req, res, next) => {
    const { data = {} } = req.body
    if (data.table_name.length == 1) {
        next({status: 400, message: `table_name field must have atleast two charaters`})
    } else {
        next()
    }
}

const capacityIsNum = (req, res, next) => {
    const { data = {} } = req.body
    if (typeof data.capacity !== "number") {
        next({status: 400, message: `The capacity must be a number`})
    } else {
        next()
    }
}

const tableExists = async (req, res, next) => {
    const table = await service.read(req.params.table_id)
    if (table) {
        res.locals.table = table
        next()
    } else {
        next({status: 404, message: `Table cannot be found, 99`})
    }
}

const isTableOccupied = (req, res, next) => {
    const {table} = res.locals
    if (table.reservation_id) {
        next({status: 400, message: `Table already occupied`})
    } else {
        next()
    }
}

const isTableBigEnough = (req, res, next) => {
    const table = res.locals.table
    const reservation = res.locals.reservation
    let isSufficient = reservation.people <= table.capacity
    if (isSufficient) {
        next()
    } else {
        next({status: 400, message: `Table does not have sufficient capacity`})
    }
}


const isThereData = (req, res, next) => {
    const { data } = req.body
    if (data) {
        next()
    } else {
        next({status:400, message: `There is no data object`})
    }
}

const isThereReservationId = hasProperties("reservation_id")

const doesReservationExists = async (req, res, next) => {
    const reservation = await reservationsService.read(req.body.data.reservation_id)
    if (reservation) {
        res.locals.reservation = reservation
        next()
    } else {
        next({status: 404, message: `Reservation not found, invalid reservation_id, 999`})
    }
}

const tableNotOccupied = (req, res, next) => {
    const {table} = res.locals
    if (table.reservation_id) {
        next()
    } else {
        next({status: 400, message: `Table not occupied`})
    }
}

// Route Functions

const create = async (req, res) => {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

const list = async (req, res) => {
    const data = await service.list()
    res.status(200).json({data})
}

const update = async (req, res, next) => {
    const updateTable = {
        ...req.body.data,
        table_id: res.locals.table.table_id
    }
    
    const updatedReservation = {
        ...res.locals.reservation,
        status: "seated"
    }

    // const data = await service.update(updateTable)
    const tableData = await service.update(updateTable)
    const resData = await reservationsService.update(updatedReservation)
    
    // res.status(200).json({data})
    res.status(200).json({data: {
        ...tableData, ...resData
    }})
}

const destroy = async (req, res, next) => {
    const updatedTable = {
        ...res.locals.table,
        reservation_id: null
    }
    const data = await service.update(updatedTable)
    res.status(200).json({data})
}

module.exports = {
    create: [capacityIsNum, hasValidProperties, hasRequiredProperties, nameHasTwoChars, asyncErrorBoundary(create)],
    update: [
        asyncErrorBoundary(tableExists), 
        isThereData, 
        isThereReservationId, 
        asyncErrorBoundary(doesReservationExists), 
        isTableBigEnough,
        isTableOccupied,
        asyncErrorBoundary(update)
    ],
    delete: [asyncErrorBoundary(tableExists), tableNotOccupied, asyncErrorBoundary(destroy)],
    list: [asyncErrorBoundary(list)],
}