function SearchBox() {
    return (
        <div className="card-body" >
            <div className="input-group">
            <input type="search" className="form-control rounded" placeholder="Enter a customer's phone number" aria-label="Search"
                aria-describedby="search-addon" />
            <button type="button" className="btn btn-outline-primary">Find</button>
            </div>
        </div>
    )
}

export default SearchBox