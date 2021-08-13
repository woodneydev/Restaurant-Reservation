import { useState, useEffect } from "react"
import ErrorAlert from "../layout/ErrorAlert"
import OneTable from "./OneTable"

function AllTables() {

    const [tables, setTables] = useState([]);
    const [failure, setFailure] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadTables() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tables`, { signal: abortController.signal });
                const tableList = await response.json();
                setTables(tableList.data);
            } catch (e) {
                setFailure(e);
            }
        }
        loadTables();
        return () => {
            abortController.abort();
        };
    }, [])

    let list;
    if (tables.length) {
        list = tables.map((table, index) => {
            return <OneTable key={index} table={table} />
        })
    }

    return (
        <ul className="list-group list-group-numbered mb-5">
            <ErrorAlert error={failure} />
            {list}
        </ul>
    )
}

export default AllTables