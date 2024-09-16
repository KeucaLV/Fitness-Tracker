
// src/App.js or any component file
import React from 'react';
import ThemeToggle from './ThemeToggle'; // Adjust path as necessary

const App = () => {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
            <ThemeToggle />
            <div className="p-4">
                <h1 className="text-2xl">Hello, World!</h1>
                <p>This is an example of light and dark mode with Tailwind CSS.</p>
            </div>
        </div>
    );
};

export default App;
