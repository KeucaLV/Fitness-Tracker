import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaStar } from "react-icons/fa";
import SideBar from "../components/SideBar";

function FavouriteWorkouts() {
    const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null); // State to manage the active index for details
    const [starredWorkouts, setStarredWorkouts] = useState([]); // State to manage starred workouts

    useEffect(() => {
        const userId = localStorage.getItem('Id');

        const fetchFavorites = async () => {
            if (!userId) {
                setError('User ID not found in local storage.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/userFavoritesWorkouts/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favorite workouts');
                }

                const favoriteIds = await response.json();
                console.log('Favorite IDs:', favoriteIds); // Log the favorite IDs received from Laravel
                await fetchWorkoutDetails(favoriteIds); // Fetch workout details based on favorite IDs
            } catch (error) {
                setError(error.message);
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchWorkoutDetails = async (workoutIds) => {
            const workoutDetails = [];
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'ba94df9f62mshb40fd53c1c9a14ep18e9d4jsn13b2cfe5f1af', // Your RapidAPI key
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                },
            };

            try {
                await Promise.all(workoutIds.map(async (workoutId) => {
                    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${workoutId}`, options);

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error(`Error fetching workout with ID ${workoutId}:`, errorText);
                        throw new Error(`Failed to fetch workout with ID ${workoutId}`);
                    }

                    const workout = await response.json();
                    workoutDetails.push(workout);
                }));

                console.log('Fetched Workout Details:', workoutDetails);
                setFavoriteWorkouts(workoutDetails); // Set the workout details in state
                setStarredWorkouts(new Array(workoutDetails.length).fill(false)); // Initialize starred state
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        fetchFavorites();
    }, []);


    if (loading) {
        return <div className="flex justify-center bg-[#000000] text-white items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center bg-[#000000] text-white h-screen">Error: {error.message}</div>;
    }

    return (
        <>
        <SideBar active="profile"/>
        <div className="flex w-full h-full bg-[#000000] font-montserrat dark:bg-white flex-col">
            <div className="flex flex-wrap justify-center">
                {favoriteWorkouts.map((workout, index) => (
                    <div key={index} className="w-[40%] ml-24 md:w-1/3 p-4 max-desktop:w-[100%] max-desktop:ml-0">
                        <div className="bg-[#131313] p-4 rounded-lg shadow-[#202020] shadow-[4px_4px_10px_1px] shadow-lg relative dark:bg-gray-200">
                            <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="absolute top-2 m-2 left-2">
                                <FaInfoCircle className="text-gray-400 hover:text-white dark:text-black" />
                            </button>

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
                                        {workout.instructions ? workout.instructions.join(' ') : 'No explanation available.'}
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
                ))}
            </div>
        </div>
    </>
    );
}

export default FavouriteWorkouts;
