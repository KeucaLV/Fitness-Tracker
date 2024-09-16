import SideBar from "./sideBar";

function Workouts(){
    return(
        <>
            <SideBar active="workouts"/>
            <div className="flex w-screen bg-[#000000] flex-col h-screen border-2 overflow-hidden border-black">
            </div>
        </>
    );
}

export default Workouts;