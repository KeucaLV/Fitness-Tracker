import React, { useState } from 'react';
import Chest from "../images/chest.webp";
import Back from "../images/back.webp";
import Legs from "../images/legs.webp";
import Glutes from "../images/glutes.jpg";
import Bicep from "../images/bicep.jpg";
import Tricep from "../images/tricep.webp";
import Shoulder from "../images/shoulder.webp";
import Abs from "../images/abs.webp";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

const Slider = () => {
    const muscleGroups = [
        { name: "Chest", image: Chest },
        { name: "Back", image: Back },
        { name: "Legs", image: Legs },
        { name: "Glutes", image: Glutes },
        { name: "Bicep", image: Bicep },
        { name: "Tricep", image: Tricep },
        { name: "Shoulder", image: Shoulder },
        { name: "Abs", image: Abs },
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
                    className=" text-white  p-2 "
                >
                    <GrCaretPrevious className="size-8" />
                </button>
            </div>

            {/* Slider Container */}
            <div className="overflow-hidden w-[900px] mx-auto">
                <div
                    className="flex transition-transform duration-500  ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 300}px)` }}
                >
                    {muscleGroups.map((muscle, index) => (
                        <div
                            key={index}
                            className="w-[300px] h-[180px] flex-shrink-0 flex items-center justify-center"
                        >
                            <div className="relative hover:scale-[103%] hover:cursor-pointer ease-in-out duration-500">
                                <img
                                    src={muscle.image}
                                    className="w-[300px] brightness-[60%] h-[180px] object-cover"
                                />
                                <div className="absolute inset-0 flex justify-center items-center text-white text-4xl bg-black bg-opacity-30">
                                    {muscle.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next button */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <button
                    onClick={nextSlide}
                    className=" text-white p-2"
                >
                    <GrCaretNext className="size-8"/>
                </button>
            </div>
        </div>
    );
};

export default Slider;
