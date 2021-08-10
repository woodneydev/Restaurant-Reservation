
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const service = require("./tables.service")

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

const create = async (req, res) => {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

module.exports = {
    create: [hasValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
}