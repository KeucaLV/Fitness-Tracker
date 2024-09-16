// src/components/ThemeToggle.js
import React, { useState, useEffect } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if dark mode was previously set
        const savedMode = localStorage.getItem('dark-mode') === 'true';
        setIsDarkMode(savedMode);
        document.documentElement.classList.toggle('dark', savedMode);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
        // Save the mode in localStorage
        localStorage.setItem('dark-mode', !isDarkMode);
    };

    return (
        <button onClick={toggleDarkMode} className="p-2 text-black rounded">
            {isDarkMode ? <FaMoon className="text-black size-8"/> : <IoSunnyOutline className="text-white size-8"/>}
        </button>
    );
};

export default ThemeToggle;
