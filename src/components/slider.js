import React, { useState, useEffect } from 'react';
import Chest from "../images/chest.jpg";
import Back from "../images/back.jpg";
import Legs from "../images/legs.jpg";
import Glutes from "../images/glutes.jpg";
import Bicep from "../images/bicep.jpg";
import Tricep from "../images/tricep.jpg";
import Shoulder from "../images/shoulder.jpg";
import Abs from "../images/abs.jpg";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
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
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setItemsPerPage(1);
            } else if (width < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);

        return () => window.removeEventListener("resize", updateItemsPerPage);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsPerPage >= muscleGroups.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? muscleGroups.length - itemsPerPage : prevIndex - itemsPerPage
        );
    };

    return (
        <div className="relative flex w-full items-center justify-center px-2">
            {/* Previous button */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <button onClick={prevSlide} className="text-white dark:text-black p-2">
                    <GrCaretPrevious className="size-8" />
                </button>
            </div>

            {/* Slider Container */}
            <div className="overflow-hidden w-full max-w-[1000px] mx-auto">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                >
                    {muscleGroups.map((muscle, index) => (
                        <Link
                            to={`/workouts${muscle.link}`}
                            key={index}
                            className="w-full sm:w-1/2 laptop:w-1/3 flex-shrink-0 p-2"
                        >
                            <div className="relative w-full h-[180px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img
                                    src={muscle.image}
                                    className="w-full h-full object-cover brightness-75 dark:opacity-80"
                                    alt={muscle.name}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white uppercase text-2xl sm:text-3xl font-semibold">
                                    {muscle.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Next button */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <button onClick={nextSlide} className="text-white dark:text-black p-2">
                    <GrCaretNext className="size-8" />
                </button>
            </div>
        </div>
    );
};

export default Slider;