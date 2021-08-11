import ReservationForm from "./ReservationForm"
import {useState, useEffect} from "react"
import {Redirect, Switch, Route, useRouteMatch} from "react-router-dom"
import Seat from "./Seat"

function Reservation () {
    const [tables, setTables] = useState([])
    const [formError, setFormError] = useState(null)
    const [failure, setFailure] = useState(null)
    const {url} = useRouteMatch()

    useEffect( () => {
        async function loadTables() {
            try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tables`)
            const tableList = await response.json()
            setTables(tableList.data)
            } catch (e) {
                setFailure(e)
            }
        }
        loadTables()      
    }, [])
  
    return (
        <Switch>
            <Route exact path={url} >
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path={`${url}/new`} >
                <ReservationForm formError={formError} setFormError={setFormError} />
            </Route>
            <Route path={`${url}/:reservation_id/seat`} >
                <Seat tables={tables} failure={failure} formError={formError} setFormError={setFormError} />
            </Route>
        </Switch>
        
    )
}

export default Reservation