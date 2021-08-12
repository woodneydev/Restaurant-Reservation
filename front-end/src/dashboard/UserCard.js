import { Link, useHistory } from "react-router-dom"
import { formatAsDate, formatAsTime } from "../utils/date-time"

function UserCard({ user }) {

    const history = useHistory()

    async function cancelReservation() {
        const url = `${process.env.REACT_APP_API_BASE_URL}/reservations/${user.reservation_id}/status`
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "data": {
                    "status": "cancelled"
                }
            }),
        }
        const response = await fetch(url, options)
        const success = await response.json()
        const { error } = success
        if (!error) {
            history.push("/dashboard")
            history.go(0)
        }

        return
    }

    const handleClick = () => {
        const doesConfirm = window.confirm("Do you want to cancel this reservation? This cannot be undone.");

        if (!doesConfirm) return;
        cancelReservation()
    }

    let button = user.status === "booked" ?
        <Link to={`/reservations/${user.reservation_id}/seat`} >
            <button href={`/reservations/${user.reservation_id}/seat`} className="btn btn-warning" >Seat</button>
        </Link> : false

    return (
        <div className="card mt-3">
            <h5 data-reservation-id-status={user.reservation_id} className="card-header">
                {user.first_name} {user.last_name} - [ {user.status} ]
            </h5>
            <div className="card-body">
                <h5 className="card-title">{formatAsDate(user.reservation_date)} at {formatAsTime(user.reservation_time)}</h5>
                <p className="card-text">Party Size: {user.people} people</p> <span> <p>Phone: {user.mobile_number}</p></span>
                <Link to={`/reservations/${user.reservation_id}/edit`} >
                    <button href={`/reservations/${user.reservation_id}/edit`} className="btn btn-primary mr-2"> Edit </button>
                </Link>
                {user.status !== "cancelled" ? <button data-reservation-id-cancel={user.reservation_id} className="btn btn-danger mr-2" onClick={handleClick} > Cancel </button> : false}
                {button}
            </div>
        </div>
    )
}

export default UserCard