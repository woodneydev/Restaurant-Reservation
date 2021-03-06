const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */

//Validation Middleware

const validProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

const hasValidProperties = (req, res, next) => {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !validProperties.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
};

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const isDayClosed = (req, res, next) => {
  const { data = {} } = req.body;
  let result = new Date(data.reservation_date);
  let day = result.getDay();
  //needs to be set to one for tuesdays, monday begins at 0
  if (day == 1) {
    next({ status: 400, message: `Restaurant is closed on Tuesdays` });
  } else {
    next();
  }
};

const isTimeClosed = (req, res, next) => {
  const { data = {} } = req.body;
  const restaurant = { opening: "10:30", closing: "21:30" };

  if (data.reservation_time < restaurant.opening) {
    next({ status: 400, message: `Time too early, open at 10:30am` });
  } else if (data.reservation_time > restaurant.closing) {
    next({ status: 400, message: `Time too late, close at 10:30pm` });
  } else {
    next();
  }
};

const isDatePast = (req, res, next) => {
  const { data = {} } = req.body;

  let today = new Date().getTime();
  let resDate = `${data.reservation_date} ${data.reservation_time}`;
  let isPast = today > new Date(resDate).getTime();

  if (isPast) {
    next({ status: 400, message: `Must choose a future date/time` });
  } else {
    next();
  }
};

const isDateCorrect = (req, res, next) => {
  let date = req.body.data.reservation_date;
  let expression = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
  if (date.match(expression)) {
    return next();
  } else {
    next({ status: 400, message: "Please input a valid reservation_date" });
  }
};

const isTimeCorrect = (req, res, next) => {
  let time = req.body.data.reservation_time;
  let expression = /\d\d:\d\d/;
  if (time.match(expression)) {
    return next();
  } else {
    next({ status: 400, message: "Please input a valid reservation_time" });
  }
};

const isPeopleNum = (req, res, next) => {
  const { data = {} } = req.body;
  let result = typeof data.people;
  if (result !== "number") {
    next({ status: 400, message: `Number of people must be an number` });
  } else {
    next();
  }
};

const reservationExists = async (req, res, next) => {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next({ status: 404, message: `Reservation cannot be found, 99` });
  }
};

const isReservationSeated = (req, res, next) => {
  if (req.body.data.status === "seated") {
    next({ status: 400, message: `reservation is seated` });
  } else {
    next();
  }
};

const isReservationFinished = (req, res, next) => {
  if (req.body.data.status === "finished") {
    next({ status: 400, message: `reservation is finished` });
  } else {
    next();
  }
};

const hasStatus = (req, res, next) => {
  const { data = {} } = req.body;
  if (
    data.status === "booked" ||
    data.status === "seated" ||
    data.status === "finished" ||
    data.status === "cancelled"
  ) {
    next();
  } else {
    next({ status: 400, message: `status unknown` });
  }
};

const isStatusFinished = (req, res, next) => {
  const { reservation } = res.locals;
  if (reservation.status == "finished") {
    next({ status: 400, message: `A finished reservation cannot be updated` });
  } else {
    next();
  }
};

// Route Handlers

const list = async (req, res) => {
  const date = req.query.date;
  const data = await service.list(date);
  res.status(200).json({ data });
};
const listQuery = async (req, res, next) => {
  const mobile_number = req.query.mobile_number;
  const date = req.query.date;

  if (date) {
    const data = await service.list(date);
    res.status(200).json({ data });
  } else if (mobile_number) {
    const data = await service.search(mobile_number);
    res.status(200).json({ data });
  } else {
    next({ status: 404, message: `Not found` });
  }
};

const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
};

const read = async (req, res) => {
  const data = res.locals.reservation;
  res.status(200).json({ data });
};

const update = async (req, res) => {
  const updatedReservation = {
    ...res.locals.reservation,
    status: req.body.data.status,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
};

const updateRes = async (req, res) => {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
};

module.exports = {
  list: [asyncErrorBoundary(listQuery)],
  create: [
    hasValidProperties,
    hasRequiredProperties,
    isDayClosed,
    isDatePast,
    isPeopleNum,
    isDateCorrect,
    isTimeCorrect,
    isTimeClosed,
    isReservationSeated,
    isReservationFinished,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    isStatusFinished,
    hasStatus,
    asyncErrorBoundary(update),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateRes: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    isPeopleNum,
    isDateCorrect,
    isTimeCorrect,
    asyncErrorBoundary(updateRes),
  ],
};
