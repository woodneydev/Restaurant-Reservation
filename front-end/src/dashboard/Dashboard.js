import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import UserCard from "./UserCard"
import { today } from "../utils/date-time"
import Loading from "./Loading"
import {useLocation} from "react-router-dom"
import ReservationNav from "./ReservationNav";
import AllTables from "./AllTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({failure, setFailure, tables, setTables}) {
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

  let list;
  if (reservations.length > 0) {
    list = reservations.map(user => {
      return  <UserCard user={user} key={user.reservation_id} /> 
    })
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <h4>Available Tables</h4>
      <AllTables failure={failure} setFailure={setFailure} tables={tables} setTables={setTables} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ReservationNav currentDay={currentDay} date={date} setDate={setDate} />
      <Loading reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      {list}
      
    </main>
  );
}

export default Dashboard;
