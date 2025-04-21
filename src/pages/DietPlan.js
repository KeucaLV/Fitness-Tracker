import SideBar from "../components/SideBar";
import DietMeals from "../components/DietMeals";
import Header from "../components/Header";

function DietPlan(){
    return(
        <>
            <SideBar active="home"/>

            <div className="flex bg-[#000000] font-montserrat dark:bg-white flex-col">
                <div className="flex relative flex-col pl-[100px] m-0 max-desktop:flex-col max-desktop:left-0 max-tablet:pl-0">
                    <Header/>
                    <DietMeals/>
                </div>
            </div>
        </>
    );
}

export default DietPlan;