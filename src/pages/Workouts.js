import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import SideBar from "../components/SideBar";
import Chest from "../images/chest.jpg";
import Back from "../images/back.jpg";
import Legs from "../images/legs.jpg";
import Glutes from "../images/glutes.jpg";
import Bicep from "../images/bicep.jpg";
import Tricep from "../images/tricep.jpg";
import Shoulder from "../images/shoulder.jpg";
import Abs from "../images/abs.jpg";
import ThemeToggle from "../components/ThemeToggle";
import profile from "../images/profile.png";
import Header from "../components/Header";

function Workouts() {
    const muscleGroups = [
        { name: "chest", image: Chest, link: "/chest" },
        { name: "back", image: Back, link: "/back" },
        { name: "Legs", image: Legs, link: "/lower legs" },
        { name: "glutes", image: Glutes, link: "/upper legs" },
        { name: "biceps", image: Bicep, link: "/upper arms" },
        { name: "Tricep", image: Tricep, link: "/tricep" },
        { name: "Shoulder", image: Shoulder, link: "/shoulder" },
        { name: "Abs", image: Abs, link: "/waist" },
    ];


    return (
        <>
            <div className="flex flex-col font-montserrat  justify-center dark:bg-white overflow-hidden items-center h-screen bg-[#000000] ">
                <SideBar active="workouts" />
                <Header />
                <h1 className="text-white self-start ml-32 m-4 text-2xl dark:text-black ">Click on a muscle you want to see workouts for!</h1>
                <div className="flex flex-wrap h-[600px] mb-6">
                    {muscleGroups.map((group, index) => (
                        <Link key={index} to={`/workouts${group.link}`}> {/* Wrap in Link */}
                            <div className="relative left-[170px] w-[300px] h-[300px] md:w-1/4 p-2 hover:scale-[103%] hover:cursor-pointer ease-in-out duration-500">
                                <img
                                    src={group.image}
                                    alt={group.name}
                                    className="w-full object-cover brightness-[50%]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-4xl">
                                        {group.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Workouts;
