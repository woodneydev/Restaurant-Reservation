import ReservationForm from "./ReservationForm"
import {useState} from "react"

function Edit({url, http}) {

    const [formError, setFormError] = useState(null)
    const headings = "Edit"

    return (
        <div>
            <ReservationForm url={url} http={http} headings={headings} formError={formError} setFormError={setFormError} />
        </div>
        )
}

export default Edit