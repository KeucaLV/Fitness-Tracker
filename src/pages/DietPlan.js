import SideBar from "../components/SideBar";
import DietMeals from "../components/DietMeals";

function DietPlan(){
    return(
        <>
            <SideBar active="home"/>

            <div className="flex w-full bg-[#000000] font-montserrat dark:bg-white flex-col">
                <DietMeals/>
            </div>
        </>
    );
}

export default DietPlan;