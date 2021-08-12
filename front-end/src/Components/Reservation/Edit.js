import ReservationForm from "./ReservationForm"
import {useState, useEffect} from "react"
import { useParams } from "react-router"
import {formatAsDate} from "../../utils/date-time"

function Edit() {

    const [formError, setFormError] = useState(null)
    const [failure, setFailure] = useState(null)
    const [formData, setFormData] = useState(null)
    const headings = "Edit"

    const {reservation_id} = useParams()
    const apiUrlPut = `${process.env.REACT_APP_API_BASE_URL}/reservations/${reservation_id}`
    const methodPut = "PUT"

    useEffect( () => {
        async function loadForm() {
            try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/reservations/${reservation_id}`)
            const form = await response.json()
            setFormData(form.data)
            } catch (e) {
                setFailure(e)
            }
        }
        loadForm()
    }, [reservation_id])

    console.log(FormData)

    let initialFormState
    if (formData) {
        initialFormState = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            mobile_number: (formData.mobile_number),
            reservation_date: formatAsDate(formData.reservation_date),
            reservation_time: formData.reservation_time,
            people: formData.people,
        }
    }

    console.log(initialFormState)
    if (formData) {
    return (
        <div>
            <ReservationForm initialFormState={initialFormState} url={apiUrlPut} http={methodPut} headings={headings} failure={failure} formError={formError} setFormError={setFormError} />
        </div>
        )
    }

    return <h3>Loading...</h3>

}

export default Edit