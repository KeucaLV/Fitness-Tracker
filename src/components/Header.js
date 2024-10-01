import ThemeToggle from "./ThemeToggle";
import profile from "../images/profile.png";
import React, {useEffect, useState} from "react";

function Header(){
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) {
                setGreeting('Good morning,');
            } else if (hour < 18) {
                setGreeting('Good day,');
            } else {
                setGreeting('Good evening,');
            }
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return(
        <>
            <div className="flex relative justify-between items-center w-[1390px] left-[40px] mt-5 p-2 h-[100px] dark:bg-gray-100 flex-wrap -top-4 bg-[#131313] max-desktop:w-[300px]">
                <div className="flex flex-row ">
                    <div className="flex flex-col p-4">
                        <h3 className="dark:text-gray-800 text-gray-400 text-sm">{greeting}</h3>
                        <h2 className="dark:text-black text-white text-xl">Welcome back!</h2>
                    </div>
                    <div className="flex relative top-[5px]">
                        <ThemeToggle />
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <img className="flex justify-center items-center overflow-hidden rounded-full w-[52px] h-[50px] " src={profile} />
                    <div className="flex flex-col p-4">
                        <h3 className="dark:text-gray-800 text-gray-400 text-sm">Beginner</h3>
                        <h1 className="dark:text-black text-white text-xl">Username</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;