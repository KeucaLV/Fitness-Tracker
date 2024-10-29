import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

function DietMeals() {
    const [mealPlans, setMealPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [starredMeals, setStarredMeals] = useState([]); // Track only starred meal IDs

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/meal-plans')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMealPlans(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine current meal time
    const getMealTime = (hour) => {
        if (hour < 12) return 'breakfast';
        if (hour >= 12 && hour < 16) return 'lunch';
        return 'dinner';
    };

    const mealTime = getMealTime(currentHour);

    // Filter meals by the current meal time
    const filteredMeals = mealPlans.filter(meal => meal.meal_time === mealTime);

    // Group meals by category (weight goal)
    const groupedMeals = filteredMeals.reduce((acc, meal) => {
        if (!acc[meal.category]) {
            acc[meal.category] = [];
        }
        acc[meal.category].push(meal);
        return acc;
    }, {});

    const userId = localStorage.getItem('Id');
    const handleStarClick = (mealId) => {
        setStarredMeals((prev) =>
            prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
        );

        fetch('http://127.0.0.1:8000/api/favoriteMeal', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                meal_id: mealId,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err)); // Show error
                }
                return response.json();
            })
            .then(data => {
                console.log('Favorite meal saved:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <main className="container px-4 py-8 ml-28 max-desktop:ml-0">
            <h2 className="text-2xl font-bold text-white mb-6">Meals for {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h2>
            {Object.entries(groupedMeals).map(([category, meals]) => (
                <div key={category} className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 capitalize">{category}</h3>
                    <div className="flex flex-row flex-wrap items-center justify-center gap-6">
                        {meals.map(meal => (
                            <div key={meal.id} className="flex flex-col w-[350px] h-[380px] justify-center items-center p-4 bg-[#131313] rounded-lg shadow-[#202020] shadow-[4px_4px_10px_1px]">
                                <FaStar
                                    onClick={() => handleStarClick(meal.id)} // Handle star click
                                    className={`flex relative left-[50%] cursor-pointer transition-all duration-300 
                                        ${starredMeals.includes(meal.id) ? 'text-yellow-500 scale-125' : 'text-gray-500'} 
                                        hover:scale-110 hover:text-yellow-400`} // Star toggle with yellow color and animation
                                    style={{ transition: 'transform 0.3s ease' }}
                                />
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
                </div>
            ))}
        </main>
    );
}

export default DietMeals;
