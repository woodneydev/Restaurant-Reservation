
function Loading({ reservations }) {

    if (!reservations) return <h2 className="card-body" >Loading...</h2>

    if (reservations.length === 0) return <h2 className="card-body" >No reservations found</h2>

    return false;
}

export default Loading