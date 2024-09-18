import SideBar from "../components/SideBar";

function Profile(){
    return(
        <>
            <SideBar active="profile"/>
            <div className="flex w-screen bg-[#000000] flex-col h-screen border-2 overflow-hidden border-black">
            </div>
        </>
    );
}

export default Profile;