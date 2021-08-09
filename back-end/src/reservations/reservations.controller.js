const service = require("./reservations.service")
const hasProperties = require("../errors/hasProperties")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/**
 * List handler for reservation resources
 */


//Validation Middleware

const hasQuery = async (req, res, next) => {
  const date = req.query.date
  if (!date) {
    next({status: 400, message: `Must specify date`})
  } else {
    next()
  }
}

const validProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

const hasValidProperties = (req, res, next) => {
  const { data = {} } = req.body
  
  const invalidFields = Object.keys(data).filter((field) => !validProperties.includes(field))

  if (invalidFields.length) {
    return next({status: 400, message: `Invalid field(s): ${invalidFields.join(", ")}`})
  }
  next()
}

const hasRequiredProperties = hasProperties( "first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

// Route Handlers

const list = async (req, res) => {
  const date = req.query.date
  const data = await service.list(date)
  res.status(200).json({data})
}

const create = async (req, res) => {
  const data = await service.create(req.body.data)
  res.status(201).json({data})
}

module.exports = {
  list: [hasQuery, asyncErrorBoundary(list)],
  create: [hasValidProperties, hasRequiredProperties, asyncErrorBoundary(create)]
};
