import React, { useState, useEffect } from 'react';
import SideBar from "../components/SideBar";
import Header from "../components/Header";

function FavouriteMeal() {
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user ID from localStorage (assumes you are storing it there)
    const userId = localStorage.getItem('Id');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/userFavorites/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite meals');
                }
                const favoriteIds = await response.json();
                await fetchMealDetails(favoriteIds);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchMealDetails = async (mealIds) => {
            const mealDetails = await Promise.all(
                mealIds.map(async (mealId) => {
                    const response = await fetch(`http://127.0.0.1:8000/api/meals/${mealId}`); // Adjust API endpoint as necessary
                    if (!response.ok) {
                        throw new Error(`Failed to fetch meal with ID ${mealId}`);
                    }
                    return response.json(); // Assuming the meal API returns the meal object
                })
            );
            setFavoriteMeals(mealDetails);
        };

        fetchFavorites();
    }, [userId]);

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
                <main className="container px-4 py-8 ml-28 max-desktop:ml-0">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Favorite Meals</h2>
                    {favoriteMeals.length === 0 ? (
                        <p className="text-gray-400">You have no favorite meals.</p>
                    ) : (
                        <div className="flex flex-row flex-wrap items-center justify-center gap-6">
                            {favoriteMeals.map(meal => (
                                <div key={meal.id} className="flex flex-col w-[350px] h-[380px] justify-center items-center p-4 bg-[#131313] rounded-lg shadow-[#202020] shadow-[4px_4px_10px_1px]">
                                    <img src={meal.img} alt={meal.name} className="flex w-[200px] h-[200px] rounded" />
                                    <div className="flex-1 text-center">
                                        <p className="text-lg m-2 font-bold text-white">{meal.name}</p>
                                        <p className="text-sm m-1 text-gray-400">{meal.recipe}</p>
                                        <div className="flex w-full justify-evenly mt-3 text-sm text-gray-400">
                                            <p>{meal.calories} cal</p> | <p>{meal.protein}g protein</p> | <p>{meal.fats}g fat</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

export default FavouriteMeal;
