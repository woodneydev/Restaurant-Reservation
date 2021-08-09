import ReservationForm from "./ReservationForm"
import {Redirect, Switch, Route, useRouteMatch} from "react-router-dom"

function Reservation () {
    const {url} = useRouteMatch()
    return (
        <Switch>
            <Route exact path={url} >
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path={`${url}/new`} >
                <ReservationForm />
            </Route>
        </Switch>
        
    )
}

export default Reservation