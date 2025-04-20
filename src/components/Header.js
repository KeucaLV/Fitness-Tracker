import ThemeToggle from "./ThemeToggle";
import profile from "../images/profile.png";
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function Header(){
    const [greeting, setGreeting] = useState('');
    const [username, setUsername] = useState('');
    const [img, setImg] = useState('');

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

        const storedUsername = localStorage.getItem('username');
        const storedImg = localStorage.getItem('image');
        if (storedUsername && storedImg) {
            setUsername(storedUsername);
            setImg(storedImg);
        }

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return(
        <>
            <div className="flex relative w-full justify-between items-center pr-[10px] mt-3 p-2 h-[100px] dark:bg-gray-100 flex-wrap -top-4 bg-[#131313] max-desktop:w-[300px]">
                <div className="flex flex-row ">
                    <div className="flex flex-col p-4">
                        <h3 className="dark:text-gray-800 text-[#707070] text-sm">{greeting}</h3>
                        <h2 className="dark:text-black text-white text-xl">Welcome back, {username}! </h2>
                    </div>
                    <div className="flex relative top-[5px]">
                        <ThemeToggle />
                    </div>
                </div>
                <Link to="/profile" className="flex flex-row justify-center items-center">
                    <img className="flex justify-center items-center overflow-hidden rounded-full w-[52px] h-[50px]" src={`${img}`} />
                    <div className="flex flex-col p-4">
                        <h3 className="dark:text-gray-800 text-[#707070] text-sm">Beginner</h3>
                        <h1 className="dark:text-black text-white text-xl">{username}</h1>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Header;