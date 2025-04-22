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
        { name: "Tricep", image: Tricep, link: "/upper arms" },
        { name: "Shoulder", image: Shoulder, link: "/shoulder" },
        { name: "Abs", image: Abs, link: "/waist" },
    ];


    return (
        <>
        <SideBar active="workouts" />
        <div className="flex flex-col min-h-screen font-montserrat justify-center overflow-x-hidden dark:bg-white items-center bg-[#000000]">
            <div className="flex flex-col relative w-full h-full pl-[100px] max-desktop:pl-4 max-desktop:pr-4">
                <Header />
                <h1 className="text-white self-center mb-6 text-3xl text-center dark:text-black uppercase">
                    Target Your Strength — Choose a Muscle to Train!
                </h1>

                <div className="grid grid-cols-3 gap-5 w-full max-desktop:grid-cols-3 max-laptop:grid-cols-2 max-tablet:grid-cols-1">
                    {muscleGroups.map((group, index) => (
                        <Link key={index} to={`/workouts${group.link}`}>
                            <div className="relative hover:brightness-[70%] hover:cursor-pointer ease-in-out duration-500">
                                <img
                                    src={group.image}
                                    alt={group.name}
                                    className="w-full h-[240px] object-cover brightness-[50%] rounded-lg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-2xl tablet:text-3xl laptop:text-4xl font-semibold uppercase text-center">
                                        {group.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default Workouts;
