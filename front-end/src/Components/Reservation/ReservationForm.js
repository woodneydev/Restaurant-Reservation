import {useState} from "react"
import {useHistory} from "react-router-dom"

function ReservationForm() {

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }

    const [formData, setFormData] = useState({...initialFormState})

    const history = useHistory()

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    }

    const handleCancel = () => {
        setFormData({...initialFormState})
        history.goBack()
    }
    
    console.log(formData)
    return (
            <form className="card-body" >
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name:</label>
                    <input id="first_name" name="first_name" type="text" className="form-control" onChange={handleChange} value={formData.first_name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name:</label>
                    <input id="last_name" name="last_name" type="text" className="form-control" onChange={handleChange} value={formData.last_name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile_number" className="form-label">Mobile Number:</label>
                    <input id="mobile_number" name="mobile_number" type="text" className="form-control" onChange={handleChange} value={formData.mobile_number} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_date" className="form-label">Date of reservation:</label>
                    <input id="reservation_date" name="reservation_date" type="date" className="form-control" onChange={handleChange} value={formData.reservation_date} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_time" className="form-label">Time of reservation:</label>
                    <input id="reservation_time" name="reservation_time" type="time" className="form-control" onChange={handleChange} value={formData.reservation_time} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="people" className="form-label">Party Size:</label>
                    <input id="people" name="people" type="number" min="1" className="form-control" onChange={handleChange} value={formData.people} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-danger ml-3" onClick={() => handleCancel()}>Cancel</button>
            </form>
    )
}

export default ReservationForm