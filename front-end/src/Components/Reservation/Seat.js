import { useState } from "react";
import { useHistory, useParams } from "react-router";


function Seat({tables}) {

    const {reservation_id} = useParams()
    
    const initialFormState = {
        "table_id": "",
        reservation_id
    }

    const [formData, setFormData] = useState({...initialFormState})
    const [formError, setFormError] = useState(null)

    const history = useHistory()

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        })
    }

    async function submitForm() {           
        const url = `${process.env.REACT_APP_API_BASE_URL}/tables/${formData.table_id}/seat`
        const options = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "data": {
                "reservation_id": Number(formData.reservation_id)
            }}),
          }
        const response = await fetch(url, options)
        const success = await response.json()
        const {error} = success
        if (error) {
            setFormError({message: success.error})
        }
        if (!error) history.push(`/dashboard`)

        return success
    }

    const handleSubmit = (req, res, next) => {
        submitForm()
    }

    let list;
    if (tables.length) {
        list = tables.map((table, index) => {
            return (
               <option key={index} value={table.table_id} >{table.table_name} - {table.capacity}</option>
            )
        })
    }
   
    return (
        <form className="card mt-5" onSubmit={handleSubmit} >
            <div className="card-body">
                <h3 className="card-title">Select Table</h3>
                <select name="table_id" className="form-select" aria-label="Default select example" onChange={handleChange} value={formData.table_id} >
                    {list}
                </select> <br />
                <button type="submit" className="btn btn-primary mt-3"> Submit</button>
                <button type="button" className="btn btn-danger ml-3 mt-3" >Cancel</button>
            </div>
        </form>
    )
}

export default Seat