import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

function DietMeals() {
    const [mealPlans, setMealPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [starredMeals, setStarredMeals] = useState([]); // Track only starred meal IDs

    useEffect(() => {
        const fetchData = fetch('https://admin.kevfitness.com/api/meal-plans')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });

        const delay = new Promise(resolve => setTimeout(resolve, 1500));

        Promise.all([fetchData, delay])
            .then(([data]) => {
                setMealPlans(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen text-white dark:text-black">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500 mb-6"></div>
                <p className="text-xl font-semibold">Fetching best meals...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

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

        fetch('https://admin.kevfitness.com/api/favoriteMeal', {
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
        <div className="flex  items-center justify-center">
            <main className="container py-4">
                <h2 className="text-4xl text-center text-white uppercase mb-6 dark:text-black">Meals for {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h2>
                <div className="h-[2px] w-full bg-gradient-to-r from-[#000000] via-[#565656] to-[#000000]"></div>
                {Object.entries(groupedMeals).map(([category, meals]) => (
                    <div key={category} className="flex items-center mb-8 flex-wrap">
                        <h3 className="text-3xl w-full text-center mt-12 text-white mb-6 uppercase dark:text-black">{category}</h3>
                        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                            {meals.map(meal => (
                                <div key={meal.id} className="flex flex-col h-[380px] justify-center items-center p-4 bg-[#131313] rounded-lg shadow-[#202020] shadow-[4px_4px_10px_1px] dark:bg-[#FFFFFF] dark:shadow-[#CECECE] max-tablet:w-[90%]">
                                    <FaStar
                                        onClick={() => handleStarClick(meal.id)}
                                        className={`flex relative left-[50%] cursor-pointer transition-all duration-300 
                                            ${starredMeals.includes(meal.id) ? 'text-yellow-500 scale-125' : 'text-gray-500'} 
                                            hover:scale-110 hover:text-yellow-400`}
                                        style={{ transition: 'transform 0.3s ease' }}
                                    />
                                    <img src={meal.img} alt={meal.name} className="flex w-[200px] h-[200px] rounded" />
                                    <div className="flex-1 text-center">
                                        <p className="text-xl mt-6 font-bold text-white dark:text-black">{meal.name}</p>
                                        <p className="text-sm w-[300px] m-1 text-gray-400 dark:text-gray-800">{meal.recipe}</p>
                                        <div className="flex w-full justify-evenly mt-3 text-sm text-gray-400 dark:text-gray-800">
                                            <p>{meal.calories} cal</p> | <p>{meal.protein}g protein</p> | <p>{meal.fats}g fat</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default DietMeals;
