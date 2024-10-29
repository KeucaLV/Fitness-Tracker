import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

function WorkoutList() {
    const { muscle } = useParams();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [starredWorkouts, setStarredWorkouts] = useState([]);
    const userId = localStorage.getItem('Id'); // Get user ID from local storage

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
                const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle}`, options);
                const data = await response.json();
                setWorkouts(Array.isArray(data) ? data : data.results || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [muscle]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (workouts.length === 0 || !userId) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/userFavorites/${userId}`);
                const favoriteData = await response.json();
                const favoriteIds = favoriteData.map(fav => fav.workout_id);

                const updatedStarredWorkouts = workouts.map(workout => favoriteIds.includes(workout.id));
                setStarredWorkouts(updatedStarredWorkouts);
            } catch (error) {
                console.error("Error fetching favorite workouts", error);
            }
        };

        fetchFavorites();
    }, [workouts, userId]);

    const handleStarClick = async (index) => {
        const updatedStarred = [...starredWorkouts];
        updatedStarred[index] = !updatedStarred[index];
        setStarredWorkouts(updatedStarred);

        const workout = workouts[index];

        if (updatedStarred[index]) {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/favoriteWorkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        workout_id: workout.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to save favorite workout");
                }

                console.log("Workout saved to favorites:", workout);
            } catch (error) {
                console.error("Error saving workout to favorites:", error);
            }
        } else {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/unfavoriteWorkout", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        workout_id: workout.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to remove favorite workout");
                }

                console.log("Workout removed from favorites:", workout);
            } catch (error) {
                console.error("Error removing workout from favorites:", error);
            }
        }
    };

    return (
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
                            <div key={index} className="w-[40%] ml-24 md:w-1/3 p-4 max-desktop:w-[100%] max-desktop:ml-0">
                                <div className="bg-[#131313] p-4 rounded-lg shadow-[#202020] shadow-[4px_4px_10px_1px] shadow-lg relative dark:bg-gray-200">
                                    <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="absolute top-4 left-4">
                                        <FaInfoCircle className="text-gray-400 hover:text-white dark:text-black" />
                                    </button>

                                    <FaStar
                                        onClick={() => handleStarClick(index)}
                                        className={`flex relative w-[30px] left-[96%] cursor-pointer transition-all duration-300  
                                        ${starredWorkouts[index] ? 'text-yellow-500 scale-125' : 'text-gray-500 dark:text-black'} 
                                        hover:scale-110`}
                                        style={{ transition: 'transform 0.3s ease' }}
                                    />

                                    <div className="flex justify-between text-gray-400 mt-4 max-desktop:flex-col">
                                        <div className="flex flex-col w-full justify-evenly">
                                            <h2 className="text-white text-3xl font-bold mb-2 dark:text-black">
                                                {workout.name || 'Workout Name'}
                                            </h2>
                                            <p className="text-2xl dark:text-black"><strong>Sets: </strong>3-4</p>
                                            <p className="text-2xl dark:text-black"><strong>Reps: </strong>8-12</p>
                                            <p className="text-2xl dark:text-black"><strong>Equipment: </strong>{workout.equipment || 'N/A'}</p>
                                        </div>

                                        {workout.gifUrl && (
                                            <img className="flex w-[200px] m-2 self-center max-desktop:w-[300px]" src={workout.gifUrl} alt="Workout GIF" />
                                        )}
                                    </div>

                                    {activeIndex === index && (
                                        <div className="absolute inset-0 bg-gray-800 bg-opacity-100 p-4 rounded-lg flex flex-col justify-center items-center">
                                            <h3 className="text-white text-2xl mb-4">Explanation</h3>
                                            <p className="text-gray-300 text-[13px]">
                                                {workout.instructions || 'No explanation available.'}
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
    );
}

export default WorkoutList;
