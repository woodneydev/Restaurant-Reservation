import {Link} from "react-router-dom"
import {formatAsDate, formatAsTime} from "../utils/date-time"

function UserCard({user}) {

    let button = user.status === "booked" ? <Link to={`/reservations/${user.reservation_id}/seat`} className="btn btn-primary">Seat</Link> : false

    return (
        <div className="card mt-3">
            <h5 data-reservation-id-status={user.reservation_id} className="card-header">
                {user.first_name} {user.last_name} - [ {user.status} ]
            </h5>
            <div className="card-body">
                <h5 className="card-title">{formatAsDate(user.reservation_date)} at {formatAsTime(user.reservation_time)}</h5>
                <p className="card-text">Party Size: {user.people} people</p> <span> <p>{user.mobile_number}</p></span>
                {button}
            </div>
        </div>
    )
}

export default UserCard