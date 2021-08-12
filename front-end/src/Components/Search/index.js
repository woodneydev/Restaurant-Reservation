import { useEffect, useState } from "react"
import SearchBox from "./SearchBox"
import {formatAsDate, formatAsTime} from "../../utils/date-time"
import UserCard from "../../dashboard/UserCard"


function Search() {

    const [reservations, setReservations] = useState([])

    let list;
    if (reservations.length) {
        list = reservations.map((reservation, index) => {
            return (
                <UserCard key={index} user={reservation} formatAsTime={formatAsTime} formatAsDate={formatAsDate} />
            )
        })
    }

    return (
        <>
            <SearchBox setReservations={setReservations} />
        </>
    )
}

export default Search