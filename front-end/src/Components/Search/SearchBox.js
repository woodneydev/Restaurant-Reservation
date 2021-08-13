import { useState } from "react"
import ErrorAlert from "../../layout/ErrorAlert"
import {formatAsDate, formatAsTime} from "../../utils/date-time"
import UserCard from "../../dashboard/UserCard"

function SearchBox() {

    const initialFormState = {mobile_number: ""};
    const [formData, setFormData] = useState({...initialFormState});
    const [formError, setFormError] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [failure, setFailure] = useState(null);

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value });
    };

    async function submitForm(abortController = new AbortController()) {    
        const { signal, abort } = abortController || {};

        const url = `${process.env.REACT_APP_API_BASE_URL}/reservations?mobile_number=${formData.mobile_number}`
        const options = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            signal: signal
          }
        const response = await fetch(url, options);
        const success = await response.json();
        setReservations(success.data);
        if (Array.isArray(success.data)) {
            if (success.data.length === 0) setFailure({message: `No reservations found`});
        }
        const {error} = success;
        if (error) {
            setFormError({message: success.error});
        }
        return abort?.bind(abortController)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitForm();
    };

    let list;
    if (reservations.length) {
        list = reservations.map((reservation, index) => {
            return (
                <UserCard key={index} user={reservation} formatAsTime={formatAsTime} formatAsDate={formatAsDate} />
            )
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="card-body" >
                <div className="input-group">
                <input name="mobile_number" type="search" className="form-control rounded" placeholder="Enter a customer's phone number" aria-label="Search"
                    aria-describedby="search-addon" onChange={handleChange} value={formData.phone} />
                <button type="submit" className="btn btn-outline-primary">Find</button>
                </div>
                <ErrorAlert error={formError} />
            </form>
            {list}
            <ErrorAlert error={failure} />

        </>
    )
}

export default SearchBox