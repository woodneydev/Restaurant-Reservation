import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import Reservation from "../Components/Reservation";
import Table from "../Components/Table"
import {useState, useEffect} from "react"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  const [tables, setTables] = useState([])
  const [failure, setFailure] = useState(null)
  
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
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        <Reservation tables={tables} />
      </Route>
      <Route path="/dashboard">
        <Dashboard failure={failure} setFailure={setFailure} tables={tables} setTables={setTables} />
      </Route>
        <Route path="/tables" >
          <Table />
        </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
