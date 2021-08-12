import ReservationForm from "./ReservationForm"
import {useState, useEffect} from "react"
import {Redirect, Switch, Route, useRouteMatch} from "react-router-dom"
import Seat from "./Seat"
import Edit from "./Edit"

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
  
    const apiUrlPost = `${process.env.REACT_APP_API_BASE_URL}/reservations`
    const methodPost = "POST"
    const headings = "New Reservation"

    const apiUrlPut = `${process.env.REACT_APP_API_BASE_URL}/reservations`
    const methodPut = "PUT"

    return (
        <Switch>
            <Route exact path={url} >
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path={`${url}/new`} >
                <ReservationForm url={apiUrlPost} http={methodPost} headings={headings} formError={formError} setFormError={setFormError} />
            </Route>
            <Route path={`${url}/:reservation_id/seat`} >
                <Seat tables={tables} failure={failure} formError={formError} setFormError={setFormError} />
            </Route>
            <Route path={`${url}/:reservation_id/edit`} >
                <Edit url={apiUrlPut} http={methodPut} formError={formError} setFormError={setFormError} />
            </Route>
        </Switch>
        
    )
}

export default Reservation