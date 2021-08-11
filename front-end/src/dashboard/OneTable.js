import { useState } from "react"
import { useHistory } from "react-router"
import ErrorAlert from "../layout/ErrorAlert"

function OneTable({table}) {

    const [formError, setFormError] = useState(null)
    const history = useHistory()

    async function submitForm() {           
        const url = `${process.env.REACT_APP_API_BASE_URL}/tables/${table.table_id}/seat`
        const options = {
            method: "Delete",
            headers: {"Content-Type": "application/json"},
          }
        const response = await fetch(url, options)
        const success = await response.json()
        const {error} = success
        if (error) {
            setFormError({message: success.error})
        }
        if (!error) {
            history.push("/dashboard")
            history.go(0)
        }

        return 
    }

    const handleFinish = (id) => {
        const doesConfirm = window.confirm("Is this table ready to seat new guests? This cannot be undone.");

        if (!doesConfirm) return;

        submitForm()

    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{table.table_name}</div>
            </div>
            <div>
                {table.reservation_id ? <button className="btn btn-light mr-2" data-table-id-finish={table.table_id} onClick={handleFinish} >Finish</button> : false}
                <span className={table.reservation_id ?
                    "badge bg-warning rounded-pill" : "badge bg-primary rounded-pill"} data-table-id-status={table.table_id} >
                    {table.reservation_id ? `Occupied` : `Free`}
                </span>
            </div>
            <ErrorAlert error={formError} />
        </li>
    )
}

export default OneTable