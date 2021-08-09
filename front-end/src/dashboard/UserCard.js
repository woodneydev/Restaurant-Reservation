import {Link} from "react-router-dom"

function UserCard({user}) {

    return (
        <div className="card mt-3">
            <h5 className="card-header">{user.first_name} {user.last_name}</h5>
            <div className="card-body">
                <h5 className="card-title">{user.reservation_date} @ {user.reservation_time}</h5>
                <p className="card-text">Party Size: {user.people} people</p>
                <Link to="#" className="btn btn-primary">Go somewhere</Link>
            </div>
        </div>
    )
}

export default UserCard