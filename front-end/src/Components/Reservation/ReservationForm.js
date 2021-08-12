import {useState} from "react"
import {useHistory} from "react-router-dom"
import ErrorAlert from "../../layout/ErrorAlert"


function ReservationForm({ initialFormState, url, http, headings, formError, setFormError}) {
    
    const [formData, setFormData] = useState({...initialFormState})
    const restaurant = {opening: "10:30", closing: "21:30"}

    const history = useHistory()

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    }

    //Helper Function

    async function submitForm() {           
        const options = {
            method: http,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "data": {
                "first_name": formData.first_name,
                "last_name": formData.last_name,
                "mobile_number": formData.mobile_number,
                "reservation_date": formData.reservation_date,
                "reservation_time": formData.reservation_time,
                "people": Number(formData.people)
            }}),
          }
        const response = await fetch(url, options)
        const success = await response.json()
        const {error} = success
        if (error) {
            setFormError({message: success.error})
        }
        if (!error) history.push(`/dashboard?date=${formData.reservation_date}`)

        return success
    }

    const validateDateTime = () => {
        let today = new Date().getTime()
        let resDate = `${formData.reservation_date} ${formData.reservation_time}`
        return today > new Date(resDate).getTime()
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()

        let isPast = validateDateTime()
        if (isPast) {
            setFormError({message: `Must choose future date/time`})    
        } else if (formData.reservation_time < restaurant.opening  ) {
            setFormError({message: `Time too early, open at 10:30am`})
        } else if (formData.reservation_time > restaurant.closing) {
            setFormError({message: `Time too late, close at 10:30pm`})
        } else {
            submitForm()
        }
        
    }

    const handleCancel = () => {
        setFormData({...initialFormState})
        history.goBack()
    }

    return (
            <form className="card-body" onSubmit={handleSubmit} >
                <h2>{headings}</h2>
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
                    <input id="reservation_date" name="reservation_date" type="date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" className="form-control" onChange={handleChange} value={formData.reservation_date} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="reservation_time" className="form-label">Time of reservation:</label>
                    <input id="reservation_time" name="reservation_time" type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" className="form-control" onChange={handleChange} value={formData.reservation_time} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="people" className="form-label">Party Size:</label>
                    <input id="people" name="people" type="number" placeholder="1, 2, 3..." min="1" className="form-control" onChange={handleChange} value={formData.people} required />
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
                <button type="button" className="btn btn-danger ml-3" onClick={handleCancel}>Cancel</button>
                <ErrorAlert error={formError} />
            </form>
    )
}

export default ReservationForm