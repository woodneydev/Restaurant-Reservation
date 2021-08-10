import { useState } from "react"
import { useHistory } from "react-router-dom"

function NewTable({FormError, setFormError}) {
    const initialFormState = {
        table_name: "",
        capacity: ""
    }

    const [formData, setFormData] = useState({ ...initialFormState })
    const history = useHistory()

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value })
    }

    const handleCancel = () => {
        setFormData({...initialFormState})
        history.goBack()
    }

    async function submitForm() {           
        const url = `${process.env.REACT_APP_API_BASE_URL}/tables`
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "data": {
                "table_name": formData.table_name,
                "capacity": Number(formData.capacity)
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

    const handleSubmit = (event) => {
        event.preventDefault()

    }

    return (
        <>
            <form className="card-body" onSubmit={handleSubmit} >
                <h1>New Table</h1>
                <div className="mb-3">
                    <label htmlFor="table_name" className="form-label">Table Name:</label>
                    <input id="table_name" name="table_name" type="text" className="form-control" onChange={handleChange} value={formData.table_name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity:</label>
                    <input id="capacity" name="capacity" type="number" placeholder="1, 2, 3..." className="form-control" onChange={handleChange} value={formData.capacity} required />
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
                <button type="button" className="btn btn-danger ml-3" onClick={handleCancel} >Cancel</button>
            </form>
        </>
    )
}

export default NewTable