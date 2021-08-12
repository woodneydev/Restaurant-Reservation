import { previous, next } from "../utils/date-time"

function ReservationNav({ setDate, date, currentDay }) {

    const handleClickPrevious = () => {
        const previousDay = previous(date)
        setDate(previousDay);
    }

    const handleClickToday = () => {
        setDate(currentDay);
    }

    const handleClickNext = () => {
        const nextDay = next(date)
        setDate(nextDay);
    }

    return (
        <div>
            <button type="button" className="btn btn-secondary mr-3" onClick={handleClickPrevious}>Previous</button>
            <button type="button" className="btn btn-dark mr-3" onClick={handleClickToday} >Today</button>
            <button type="button" className="btn btn-secondary" onClick={handleClickNext} >Next</button>
        </div>
    )
}

export default ReservationNav