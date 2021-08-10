import ReservationForm from "./ReservationForm"
import {useState} from "react"
import {Redirect, Switch, Route, useRouteMatch} from "react-router-dom"

function Reservation () {
    const [formError, setFormError] = useState(null)
    const {url} = useRouteMatch()
    
    return (
        <Switch>
            <Route exact path={url} >
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path={`${url}/new`} >
                <ReservationForm formError={formError} setFormError={setFormError} />
            </Route>
            <Route path={`${url}/:reservation_id/seat`} >

            </Route>
        </Switch>
        
    )
}

export default Reservation