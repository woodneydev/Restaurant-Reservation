function ReservationForm() {

    return (
        <form className="card-body" >
            <div className="mb-3">
                <label for="first_name" className="form-label">First Name:</label>
                <input id="first_name" name="first_name" type="text" className="form-control" required />
            </div>
            <div className="mb-3">
                <label for="last_name" className="form-label">Last Name:</label>
                <input id="last_name" name="last_name" type="text" className="form-control" required />
            </div>
            <div className="mb-3">
                <label for="mobile_number" className="form-label">Mobile Number:</label>
                <input id="mobile_number" name="mobile_number" type="text" className="form-control" required />
            </div>
            <div className="mb-3">
                <label for="reservation_date" className="form-label">Date of reservation:</label>
                <input id="reservation_date" name="reservation_date" type="date" className="form-control" required />
            </div>
            <div className="mb-3">
                <label for="reservation_time" className="form-label">Time of reservation:</label>
                <input id="reservation_time" name="reservation_time" type="time" className="form-control" required />
            </div>
            <div className="mb-3">
                <label for="people" className="form-label">Party Size:</label>
                <input id="people" name="people" type="text" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-danger ml-3">Cancel</button>
        </form>
    )
}

export default ReservationForm