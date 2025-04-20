import React, { useState } from 'react';
import Chest from "../images/chest.jpg";
import Back from "../images/back.jpg";
import Legs from "../images/legs.jpg";
import Glutes from "../images/glutes.jpg";
import Bicep from "../images/bicep.jpg";
import Tricep from "../images/tricep.jpg";
import Shoulder from "../images/shoulder.jpg";
import Abs from "../images/abs.jpg";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const Slider = () => {
    const muscleGroups = [
        { name: "Chest", image: Chest, link: "/chest" },
        { name: "Back", image: Back, link: "/back" },
        { name: "Legs", image: Legs, link: "/lower legs" },
        { name: "Glutes", image: Glutes, link: "/upper legs" },
        { name: "Bicep", image: Bicep, link: "/upper arms" },
        { name: "Tricep", image: Tricep, link: "/tricep" },
        { name: "Shoulder", image: Shoulder, link: "/shoulder" },
        { name: "Abs", image: Abs, link: "/waist" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next set of muscle groups
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 >= muscleGroups.length ? 0 : prevIndex + 3
        );
    };

    // Function to go to the previous set of muscle groups
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? muscleGroups.length - 3 : prevIndex - 3
        );
    };

    return (
        <div className="relative flex w-full items-center justify-center">
            {/* Previous button */}
            <div className="relative top-1/2 transform">
                <button
                    onClick={prevSlide}
                    className=" text-white dark:text-black p-2 "
                >
                    <GrCaretPrevious className="size-8" />
                </button>
            </div>

            {/* Slider Container */}
            <div className="overflow-hidden w-[920px] mx-auto">
                <div
                    className="flex transition-transform duration-500  ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 300}px)` }}
                >
                    {muscleGroups.map((muscle, index) => (
                        <Link
                            to={`/workouts${muscle.link}`}
                            key={index}
                            className="w-[300px] h-[180px] flex-shrink-0 m-2 flex items-center justify-center"
                        >
                            <div className="relative hover:scale-[103%] hover:cursor-pointer ease-in-out duration-500">
                                <img
                                    src={muscle.image}
                                    className="w-[300px] brightness-[80%] h-[180px] object-cover dark: opacity-80"
                                />
                                <div className="absolute  inset-0 flex justify-center items-center text-white uppercase text-4xl bg-black bg-opacity-30">
                                    {muscle.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Next button */}
            <div className="absolute  right-0 top-1/2 transform -translate-y-1/2">
                <button
                    onClick={nextSlide}
                    className=" text-white dark:text-black p-2"
                >
                    <GrCaretNext className="size-8"/>
                </button>
            </div>
        </div>
    );
};

export default Slider;
