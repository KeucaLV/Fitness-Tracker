import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "./SideBar";

const CalendarComponent = ({ isSmall }) => {
    const [date, setDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view' or 'add'
    const [selectedDate, setSelectedDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [gymData, setGymData] = useState({});

    const userId = localStorage.getItem('Id');

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get(`https://admin.kevfitness.com/api/gym-data?user_id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const formattedData = response.data.reduce((acc, workout) => {
                    acc[workout.date] = {
                        name: workout.name,
                        duration: workout.duration,
                        description: workout.description,
                    };
                    return acc;
                }, {});

                setGymData(formattedData);
            })
            .catch(error => console.error("Error fetching gym data:", error));
    }, []);

    const handleDateClick = (day) => {
        const today = new Date();
        const isToday = day.toDateString() === today.toDateString(); // Check if selected day is today
        const formattedDate = day.toISOString().split('T')[0];
        const dayData = gymData[formattedDate];

        // Allow clicks for today and future dates
        if (day >= today || isToday) {
            if (dayData) {
                // Open view mode if data exists for this date
                setModalMode('view');
                setName(dayData.name);
                setDuration(dayData.duration);
                setDescription(dayData.description);
            } else {
                // Open add mode if no data exists for this date
                setModalMode('add');
                setName('');
                setDuration('');
                setDescription('');
            }

            setSelectedDate(formattedDate);
            setModalOpen(true);
        }
    };


    const handleSave = () => {
        const token = localStorage.getItem('access_token');

        const requestData = {
            user_id: userId,
            date: selectedDate,
            duration: parseFloat(duration),
            name,
            description
        };

        axios.post('https://admin.kevfitness.com/api/gym-data', requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setGymData(prevData => ({
                    ...prevData,
                    [selectedDate]: {
                        name,
                        duration,
                        description
                    }
                }));
                setModalOpen(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleMonthChange = (direction) => {
        const newDate = new Date(date);
        newDate.setMonth(date.getMonth() + direction);
        setDate(newDate);
    };

    const renderCalendarDays = () => {
        const today = new Date();
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const days = [];
        for (let i = 0; i < startOfMonth.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className="w-full h-8"></div>);
        }

        for (let d = 1; d <= endOfMonth.getDate(); d++) {
            const currentDay = new Date(date.getFullYear(), date.getMonth(), d);
            const formattedDate = currentDay.toISOString().split('T')[0];
            const isToday = currentDay.toDateString() === today.toDateString();
            const isPast = currentDay < today;
            const dayData = gymData[formattedDate];
            const hasData = !!dayData;

            let dayClasses = `w-full ${isSmall ? 'h-[54px]' : 'h-[115px]'} flex items-center justify-center relative cursor-pointer border `;

            if (isToday) {
                dayClasses += "border-green-500 dark:bg-white bg-gray-900 ";
            } else if (isPast) {
                dayClasses += "border-red-500 line-through-custom dark:bg-white text-gray-500 cursor-not-allowed ";
            } else {
                dayClasses += "border-gray-600 dark:bg-white hover:bg-gray-700 ";
            }

            days.push(
                <div
                    key={d}
                    className={dayClasses}
                    onClick={() => !isPast && handleDateClick(currentDay)}
                >
                    <span>{d}</span>
                    {hasData && (
                        <div className="absolute bottom-0 left-0 p-1 bg-gray-800 text-white text-xs rounded-tr overflow-hidden whitespace-nowrap text-ellipsis">
                            {dayData.name}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className={`flex flex-col w-full dark:bg-white ${isSmall ? 'h-[400px]' : 'h-screen'} md:flex-row`}>
            {isSmall ? null : <SideBar active="calendar" />}
            <div className={`flex-1 font-montserrat p-2 dark:bg-white dark:text-black bg-black text-white max-desktop:ml-0 max-desktop:w-[full] ${isSmall ? 'p-4' : 'ml-24 p-4'} ${isSmall ? 'h-[400px]' : 'h-screen'}`}>
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => handleMonthChange(-1)} className="text-2xl p-2 rounded hover:bg-gray-600">
                        &lt;
                    </button>
                    <h2 className="text-xl">
                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={() => handleMonthChange(1)} className="text-2xl p-2 rounded hover:bg-gray-600">
                        &gt;
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center uppercase font-bold">{day}</div>
                    ))}
                </div>
                <div className={`grid grid-cols-7 dark:bg-white gap-2 ${isSmall ? 'text-sm' : ''}`}>
                    {renderCalendarDays()}
                </div>
                {modalOpen && (
                    <>
                        <div className="fixed inset-0 bg-black opacity-60"></div>
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-6 rounded-lg shadow-lg z-10 max-w-xs">
                            {modalMode === 'view' ? (
                                <>
                                    <h2 className="text-xl mb-4">Workout Details</h2>
                                    <p><strong>Date:</strong> {selectedDate}</p>
                                    <p><strong>Name:</strong> {name}</p>
                                    <p><strong>Duration:</strong> {duration} hours</p>
                                    <p><strong>Description:</strong> {description}</p>
                                    <button onClick={() => setModalOpen(false)} className="bg-red-500 text-black p-2 rounded hover:bg-red-400 mt-4">
                                        Close
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl mb-4">Add Workout</h2>
                                    <label className="block mb-2">Name:</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mb-2 p-1" />
                                    <label className="block mb-2">Duration (hours):</label>
                                    <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full mb-2 p-1" />
                                    <label className="block mb-2">Description:</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-1" />
                                    <button onClick={handleSave} className="bg-green-500 text-black p-2 rounded hover:bg-green-400 mt-4">
                                        Save
                                    </button>
                                    <button onClick={() => setModalOpen(false)} className="bg-red-500 text-black p-2 rounded hover:bg-red-400 mt-4">
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CalendarComponent;
