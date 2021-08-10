import { useState } from "react"
import { Redirect, Switch, Route, useRouteMatch} from "react-router-dom"
import NewTable from "./NewTable"

function Table () {
    const [formError, setFormError] = useState(null)
    const {url} = useRouteMatch()

    return (
        <Switch>
            <Route exact path={url} >
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path={`${url}/new`} >
                <NewTable formError={formError} setFormError={setFormError} />
            </Route>
        </Switch>
    )
}

export default Table