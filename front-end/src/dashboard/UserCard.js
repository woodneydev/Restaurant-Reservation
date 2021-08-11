import {Link} from "react-router-dom"
import {formatAsDate, formatAsTime} from "../utils/date-time"

function UserCard({user}) {

    return (
        <div className="card mt-3">
            <h5 className="card-header">{user.first_name} {user.last_name}</h5>
            <div className="card-body">
                <h5 className="card-title">{formatAsDate(user.reservation_date)} at {formatAsTime(user.reservation_time)}</h5>
                <p className="card-text">Party Size: {user.people} people</p>
                <Link to={`/reservations/${user.reservation_id}/seat`} className="btn btn-primary">Seat</Link>
            </div>
        </div>
    )
}

export default UserCard