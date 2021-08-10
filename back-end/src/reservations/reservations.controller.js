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
    next({ status: 400, message: `Must specify date` })
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
    return next({ status: 400, message: `Invalid field(s): ${invalidFields.join(", ")}` })
  }
  next()
}

const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people")

const isClosed = (req, res, next) => {
  const { data = {} } = req.body
  let result = new Date(data.reservation_date)
  let day = result.getDay()
  if (day == 1) {
    next({ status: 400, message: `Restaurant is closed on Tuesdays` })
  } else {
    next()
  }
}

const isDatePast = (req, res, next) => {
  const { data = {} } = req.body
  const reqDate = new Date(data.reservation_date)
  const today = new Date()
  const isPast = (reqDate.setHours(0, 0, 0, 0)) < (today.setHours(0, 0, 0, 0))
  if (isPast) {
    next({ status: 400, message: `Must choose a future date/time` })
  } else {
    next()
  }
}

const isDateCorrect = (req, res, next) => {
  let date = req.body.data.reservation_date
  let expression = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
  if (date.match(expression)) {
    return next()
  } else {
    next({ status: 400, message: "Please input a valid reservation_date" })
  }
}

const isTimeCorrect = (req, res, next) => {
  let time = req.body.data.reservation_time
  let expression = /\d\d:\d\d/
  if (time.match(expression)) {
    return next()
  } else {
    next({ status: 400, message: "Please input a valid reservation_time" })
  }
}

const isPeopleNum = (req, res, next) => {
  const { data = {} } = req.body
  let result = typeof data.people
  if (result === "string") {
    next({ status: 400, message: `Number of people must be an number` })
  } else {
    next()
  }
}

// Route Handlers

const list = async (req, res) => {
  const date = req.query.date
  const data = await service.list(date)
  res.status(200).json({ data })
}

const create = async (req, res) => {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

module.exports = {
  list: [hasQuery, asyncErrorBoundary(list)],
  create: [hasValidProperties, hasRequiredProperties, isClosed, isDatePast, isPeopleNum, isDateCorrect, isTimeCorrect, asyncErrorBoundary(create)]
};
