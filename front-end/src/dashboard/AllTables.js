import ErrorAlert from "../layout/ErrorAlert"

function AllTables({failure, tables}) {
    
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