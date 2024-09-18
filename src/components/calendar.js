// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "./SideBar";

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [duration, setDuration] = useState('');
    const [gymData, setGymData] = useState({});

    useEffect(() => {
        // Fetch gym data from the server
        axios.get('/api/gym-data')
            .then(response => setGymData(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDateClick = (day) => {
        setSelectedDate(day.toDateString());
        setModalOpen(true);
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
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const days = [];
        for (let i = 0; i < startOfMonth.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
        }

        for (let d = 1; d <= endOfMonth.getDate(); d++) {
            const currentDay = new Date(date.getFullYear(), date.getMonth(), d);
            const dateString = currentDay.toDateString();
            days.push(
                <div
                    key={d}
                    className="w-12 h-12 flex items-center justify-center relative cursor-pointer border border-gray-600 hover:bg-gray-700"
                    onClick={() => handleDateClick(currentDay)}
                >
                    <span>{d}</span>
                    {gymData[dateString] && (
                        <div className="absolute bottom-0 right-0 p-1 bg-gray-800 text-white text-xs rounded">{gymData[dateString]}h</div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="flex">
            <SideBar active="calendar"/>
            <div className="flex-1 bg-black text-white p-4 ml-24 h-screen">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => handleMonthChange(-1)}
                        className="text-2xl p-2 rounded hover:bg-gray-600"
                    >
                        &lt;
                    </button>
                    <h2 className="text-xl">
                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button
                        onClick={() => handleMonthChange(1)}
                        className="text-2xl p-2 rounded hover:bg-gray-600"
                    >
                        &gt;
                    </button>
                </div>
                <div className="flex flex-row justify-between">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-bold">{day}</div>
                    ))}
                    {renderCalendarDays()}
                </div>
                {modalOpen && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Enter Gym Data</h2>
                        <input
                            type="number"
                            placeholder="Duration in hours"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-600 rounded p-2 mb-4 w-full"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-black p-2 rounded mr-2 hover:bg-green-400"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-red-500 text-black p-2 rounded hover:bg-red-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarComponent;
