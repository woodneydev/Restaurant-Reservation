
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const service = require("./tables.service")


// Validation MiddleWare

const validProperties = [
    "table_name",
    "capacity"
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

// Route Functions

const create = async (req, res) => {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

const list = async (req, res) => {
    const data = await service.list()
    res.status(200).json({data})
}

module.exports = {
    create: [hasValidProperties, hasRequiredProperties, nameHasTwoChars, capacityIsNum, asyncErrorBoundary(create)],
    list,
}