import { useState, useEffect } from "react"
import ErrorAlert from "../layout/ErrorAlert"

function AllTables() {
    
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

    let list;
    if (tables.length) {
        list = tables.map((table, index) => {
            return (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{table.table_name}</div>
                    </div>
                    <span className={table.reservation_id ? "badge bg-warning rounded-pill" : "badge bg-primary rounded-pill"} data-table-id-status={table.table_id} >
                        {table.reservation_id ? `Occupied`: `Free`}
                    </span>
                </li>
            )
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