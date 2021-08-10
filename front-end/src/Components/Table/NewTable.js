import { useState } from "react"
import { useHistory } from "react-router-dom"

function NewTable() {
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