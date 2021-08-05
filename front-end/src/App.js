import React from "react";
import { Route, Switch } from "react-router-dom";
import NewReservation from "./Components/NewReservation";
import Layout from "./layout/Layout";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Switch>
      {/* <Route path="/">
        <Layout />
      </Route> */}
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
    </Switch>
  );
}

export default App;
