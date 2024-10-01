import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "./SideBar";

const CalendarComponent = ({ isSmall }) => {
    const [date, setDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [gymData, setGymData] = useState({});

    useEffect(() => {
        axios.get('/api/gym-data')
            .then(response => setGymData(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDateClick = (day) => {
        if (!isSmall) {  // Only allow clicking if the calendar is not small
            setSelectedDate(day.toDateString());
            setModalOpen(true);
        }
    };

    const handleSave = () => {
        axios.post('/api/gym-data', {
            date: selectedDate,
            duration
        })
            .then(response => {
                setGymData(prevData => ({
                    ...prevData,
                    [selectedDate]: duration
                }));
                setModalOpen(false);
            })
            .catch(error => console.error(error));
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
            const dateString = currentDay.toDateString();
            const isToday = currentDay.toDateString() === today.toDateString();
            const isPast = currentDay < today;
            const noData = !gymData[dateString];

            let dayClasses = `w-full ${isSmall ? 'h-[54px]' : 'h-[120px]'} flex items-center justify-center relative cursor-pointer border `;

            if (isToday) {
                dayClasses += "border-green-500 dark:bg-white bg-gray-900 ";
            } else if (isPast) {
                dayClasses += "border-red-500 ";
                if (noData) {
                    dayClasses += "line-through-custom dark:bg-white text-gray-500 cursor-not-allowed hover:bg-black ";
                } else {
                    dayClasses += "cursor-not-allowed dark:bg-white hover:bg-gray-700 ";
                }
            } else {
                dayClasses += "border-gray-600 dark:bg-white hover:bg-gray-700 ";
            }

            days.push(
                <div
                    key={d}
                    className={dayClasses}
                    onClick={() => !isSmall && (isToday || !isPast) && handleDateClick(currentDay)}  // Disable clicks when `isSmall`
                >
                    <span>{d}</span>
                    {gymData[dateString] && (
                        <div className="absolute bottom-0 right-0 p-1 bg-gray-800 text-white text-xs rounded">
                            {gymData[dateString]}h
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
            <div className={`flex-1 font-montserrat p-2 dark:bg-white dark:text-black bg-black text-white ${isSmall ? 'p-4' : 'ml-24 p-4'} ${isSmall ? 'h-[400px]' : 'h-screen'}`}>
                {/* Month navigation */}
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
                {/* Weekday headings */}
                <div className="grid grid-cols-7  gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-bold">{day}</div>
                    ))}
                </div>
                {/* Calendar days */}
                <div className={`grid grid-cols-7 dark:bg-white gap-2 ${isSmall ? 'text-sm' : ''}`}>
                    {renderCalendarDays()}
                </div>
                {modalOpen && (
                    <>
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-black opacity-60"></div>
                        {/* Modal */}
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-6 rounded-lg shadow-lg z-10">
                            <h2 className="text-xl mb-4">Enter Gym Data</h2>
                            <input
                                type="text"
                                placeholder="Name your workout"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 rounded p-2 mb-4 w-full"
                            />
                            <input
                                type="number"
                                placeholder="Duration in hours"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 rounded p-2 mb-4 w-full"
                            />
                            <textarea
                                placeholder="Describe your workout"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-gray-800 text-white border border-gray-600 h-[300px] resize-none rounded p-2 mb-4 w-full"
                            />
                            <div className="flex justify-end">
                                <button onClick={handleSave} className="bg-green-500 text-black p-2 rounded mr-2 hover:bg-green-400">
                                    Save
                                </button>
                                <button onClick={() => setModalOpen(false)} className="bg-red-500 text-black p-2 rounded hover:bg-red-400">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CalendarComponent;
