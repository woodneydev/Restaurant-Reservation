import { useState } from "react"

function SearchBox() {

    const initialFormState = {phone: ""}
    const [formData, setFormData] = useState({...initialFormState})

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value })
    }

    

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <form className="card-body" >
            <div className="input-group">
            <input name="phone" type="search" className="form-control rounded" placeholder="Enter a customer's phone number" aria-label="Search"
                aria-describedby="search-addon" onChange={handleChange} value={formData.phone} />
            <button type="submit" className="btn btn-outline-primary">Find</button>
            </div>
        </form>
    )
}

export default SearchBox