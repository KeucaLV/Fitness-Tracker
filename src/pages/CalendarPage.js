import Calendar from "../components/Calendar";

function CalendarPage(){
    return(
        <div className="flex-1 font-montserrat bg-black">
            <Calendar isSmall={false} />
        </div>
    );
}

export default CalendarPage;