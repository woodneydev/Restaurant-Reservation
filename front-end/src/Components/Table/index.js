import { Redirect, Switch, Route, useRouteMatch} from "react-router-dom"
import NewTable from "./NewTable"

function Table () {

    const {url} = useRouteMatch()

    return (
        <Switch>
            <Route exact path={url} >
                <Redirect to={"/dashboard"} />
            </Route>
            <Route path={`${url}/new`} >
                <NewTable />
            </Route>
        </Switch>
    )
}

export default Table