import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import UserCard from "./UserCard"
import {today, previous, next} from "../utils/date-time"
import Loading from "./Loading"
import {useLocation} from "react-router-dom"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const todayDate = searchParams.get("date")

  const initialDay = todayDate || today()
  const currentDay = today()
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(initialDay)
  
  useEffect(loadDashboard, [date]);
  
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleClickPrevious = () => {
    const previousDay = previous(date)
    setDate(previousDay)
  }

  const handleClickToday = () => {
    setDate(currentDay)
  }

  const handleClickNext = () => {
    const nextDay = next(date)
    setDate(nextDay)
  }

  let list
  if (reservations.length > 0) {
    list = reservations.map(user => {
      return  <UserCard user={user} key={user.reservation_id} /> 
    })
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>

      </div>
      <div>
          <button type="button" className="btn btn-secondary mr-3" onClick={handleClickPrevious}>Previous</button>
          <button type="button" className="btn btn-dark mr-3" onClick={handleClickToday} >Today</button>
          <button type="button" className="btn btn-secondary" onClick={handleClickNext} >Next</button>
        </div>
      <Loading reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      {list}
    </main>
  );
}

export default Dashboard;
