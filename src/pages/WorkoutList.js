import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import Header from "../components/Header";

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
    
                // Always update workouts first
                setWorkouts(Array.isArray(data) ? data : data.results || []);
    
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
    
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
                const response = await fetch(`https://admin.kevfitness.com/api/userFavorites/${userId}`);
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
                const response = await fetch("https://admin.kevfitness.com/api/favoriteWorkout", {
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
                const response = await fetch("https://admin.kevfitness.com/api/unfavoriteWorkout", {
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
        <>
          <SideBar active="workouts" />
          <div className="flex w-screen bg-[#000000] self-start items-start font-montserrat dark:bg-white flex-col h-screen overflow-x-hidden">
            <div className="flex relative flex-col pl-[90px] w-screen h-screen m-0 max-desktop:pl-0">
              <Header />
              {loading ? (
                <div className="flex flex-col items-center justify-center w-full h-screen text-white dark:text-black">
                  <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mb-6"></div>
                  <p className="text-xl font-semibold">Fetching killer workouts...</p>
                </div>
              ) : (
                <>
                <h1 className="text-white text-center m-4 mt-2 text-3xl  dark:text-black uppercase max-tablet:text-[20px]">The Workout Vault — Exercises & How-To’s</h1>
                <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6 p-6 w-full">
                  {workouts.length === 0 ? (
                    <div className="text-white text-center col-span-full">No workouts found.</div>
                  ) : (
                    workouts.map((workout, index) => (
                      <div key={index} className="relative flex-wrap bg-[#131313] p-4 rounded-lg shadow-[#131313] shadow-[2px_2px_5px_1px] shadow-lg dark:bg-[#FFFFFF] dark:shadow-[#CECECE]">
                        {/* Info Button */}
                        <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="absolute top-4 left-4 z-10">
                          <FaInfoCircle className="text-gray-400 hover:text-white dark:text-black" />
                        </button>
    
                        {/* Star Button */}
                        <FaStar
                          onClick={() => handleStarClick(index)}
                          className={`absolute top-4 right-4 z-10 w-[30px] cursor-pointer transition-all duration-300
                            ${starredWorkouts[index] ? 'text-yellow-500 scale-125' : 'text-gray-500 dark:text-black'}
                            hover:scale-110`}
                        />
    
                        {/* Workout Content */}
                        <div className="flex flex-wrap justify-between mt-6 gap-4 text-gray-400 tablet:flex-col">
                          <div className="flex flex-col justify-evenly w-full">
                            <h2 className="text-white text-center text-2xl font-bold mb-2 uppercase dark:text-black">
                              {workout.name || 'Workout Name'}
                            </h2>
                            <div className="flex flex-row justify-between mt-2">
                                <p className="flex items-center justify-center rounded-full p-[5px] max-w-[200px] uppercase text-lg dark:text-black ">3-4 Sets</p>
                                <p className="self-center p-[5px] text-center text-lg dark:text-black"><strong>Equipment:</strong> <p className="uppercase">{workout.equipment || 'N/A'}</p></p>
                                <p className="flex items-center justify-center rounded-full p-[5px] max-w-[200px] uppercase text-lg dark:text-black]">8–12 Reps</p>
                            </div>
                          </div>
    
                          {workout.gifUrl && (
                            <img
                              className="w-[200px] tablet:w-full mx-auto rounded-md object-contain mt-4 tablet:mt-2"
                              src={workout.gifUrl}
                              alt="Workout GIF"
                            />
                          )}
                        </div>
    
                        {/* Explanation Overlay */}
                        {activeIndex === index && (
                        <div className="absolute inset-0 bg-black/90 p-4 rounded-lg flex flex-col justify-center items-center z-20">
                          <h3 className="text-white text-2xl uppercase mb-6">Explanation</h3>
                          <p className="text-gray-200 text-md max-w-md">
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
                    ))
                  )}
                </div>
                </>
              )}
            </div>
          </div>
        </>
      );
    };
    
    export default WorkoutList;