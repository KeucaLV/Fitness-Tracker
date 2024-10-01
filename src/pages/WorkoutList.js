import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { FaInfoCircle, FaPlay, FaStar } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";
import profile from "../images/profile.png";

function WorkoutList() {
    const { muscle } = useParams();
    console.log(muscle);// Get the dynamic 'muscle' parameter from the URL
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'ba94df9f62mshb40fd53c1c9a14ep18e9d4jsn13b2cfe5f1af',
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                // Fetch data based on the selected muscle
                const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle}`, options);
                const data = await response.json();

                console.log("API Response: ", data); // Inspect the structure

                setWorkouts(Array.isArray(data) ? data : data.results || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [muscle]); // Re-fetch data whenever the muscle parameter changes

    const renderStars = (difficulty) => {
        switch (difficulty) {
            case "beginner":
                return (
                    <>
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-gray-500" />
                        <FaStar className="text-gray-500" />
                    </>
                );
            case "intermediate":
                return (
                    <>
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-gray-500" />
                    </>
                );
            case "expert":
                return (
                    <>
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                    </>
                );
            default:
                return (
                    <>
                        <FaStar className="text-gray-500" />
                        <FaStar className="text-gray-500" />
                        <FaStar className="text-gray-500" />
                    </>
                );
        }
    };

    return (
        <>

            <div className="flex w-screen bg-[#000000] self-start items-start flex-wrap font-montserrat dark:bg-white flex-col h-screen overflow-auto p-4">
                <SideBar active="workouts" />
                {loading ? (
                    <div className="text-white text-center">Loading...</div>
                ) : (
                    <div className="flex flex-wrap justify-center">
                        {workouts.length === 0 ? (
                            <div className="text-white text-center">No workouts found.</div>
                        ) : (
                            workouts.map((workout, index) => (
                                <div key={index} className="w-1/2 ml-24 md:w-1/3 p-4 max-desktop:w-[100%] max-desktop:ml-0">
                                    <div className="bg-[#131313] p-4 rounded-lg shadow-lg relative">
                                        {/* Workout Name */}

                                        {/* Info Icon */}
                                        <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="absolute top-4 left-4">
                                            <FaInfoCircle className="text-gray-400 hover:text-white" />
                                        </button>

                                        {/*/!* Difficulty Stars *!/*/}
                                        {/*<div className="flex items-center mt-2">*/}
                                        {/*    {renderStars(workout.difficulty)} /!* Dynamic stars from Intensity_Level *!/*/}
                                        {/*    <span className="ml-2 text-sm text-gray-400">*/}
                                        {/*        {workout.difficulty || 'N/A'} /!* Display dynamic intensity level *!/*/}
                                        {/*    </span>*/}
                                        {/*</div>*/}

                                        {/* Workout Details */}
                                        <div className="flex justify-between text-gray-400 mt-4">
                                            <div className="flex flex-col w-full justify-evenly">
                                                <h2 className="text-white text-3xl font-bold mb-2">
                                                    {workout.name || 'Workout Name'}
                                                </h2>
                                                <p className="text-2xl"><strong>Sets: </strong>3-4</p>
                                                <p className="text-2xl"><strong>Reps: </strong>8-12</p> {/* Replace with dynamic reps if available */}
                                                <p className="text-2xl"><strong>Equipment: </strong>{workout.equipment || 'N/A'}</p>
                                            </div>


                                            {/* Watch Button */}
                                            {workout.gifUrl && (
                                                <img className="flex w-72 m-2 self-center" src={workout.gifUrl}/>
                                            )}

                                        </div>

                                        {/* Explanation Section */}
                                        {activeIndex === index && (
                                            <div className="absolute inset-0 bg-gray-800 bg-opacity-100 p-4 rounded-lg flex flex-col justify-center items-center">
                                                <h3 className="text-white text-2xl mb-4">Explanation</h3>
                                                <p className="text-gray-300 text-md">
                                                    {workout['instructions'] || 'No explanation available.'}
                                                </p>
                                                <button
                                                    onClick={() => setActiveIndex(null)}
                                                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default WorkoutList;
