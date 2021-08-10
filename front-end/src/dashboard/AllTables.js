import { useEffect, useState } from "react"

function AllTables() {
    
    const [tables, setTables] = useState([])
    
    useEffect( () => {
        async function loadTables() {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tables`)
            const tableList = await response.json()
            setTables(tableList)
        }

        loadTables()
    }, [])

    let list;
    if (tables.table_id) {
        list = tables.map((table, index) => {
            return (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Subheading</div>
                        Cras justo odio
                    </div>
                    <span className="badge bg-primary rounded-pill" data-table-id-status={table.table_id} >
                        {table.reservation_id ? `Occupied`: `Free`}
                    </span>
                </li>
            )
        })
    }

    return (
        <ul className="list-group list-group-numbered mb-5">
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                </div>
                <span className="badge bg-primary rounded-pill">14</span>
            </li>
        </ul>
    )
}

export default AllTables