import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import diet from "../images/diet.webp";
import profile from "../images/profile.png";
import SideBar from "../components/SideBar";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Calendar from "../components/Calendar";

function Home() {
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

        // Retrieve username from local storage
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

    return (
        <>
            <SideBar active="home" />
            <div className="flex w-screen bg-[#000000] font-montserrat flex-wrap dark:bg-white flex-col h-screen overflow-hidden max-desktop:overflow-scroll">
                <div className="flex relative flex-col w-[1363px] h-screen left-[90px] m-0 max-desktop:flex-col max-desktop:left-0">
                    <div className="flex relative justify-between mt-2 items-center w-[1390px] p-2 h-[100px] dark:bg-gray-100 -top-4 bg-[#131313]">
                        <div className="flex flex-row ">
                            <div className="flex flex-col p-4">
                                <h3 className="dark:text-gray-800 text-gray-400 text-sm">{greeting}</h3>
                                <h2 className="dark:text-black text-white text-xl">Welcome back, {username}!</h2>
                            </div>
                            <div className="flex relative top-[5px]">
                                <ThemeToggle />
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <img className="flex justify-center items-center overflow-hidden rounded-full w-[52px] h-[50px]" src={img}/>
                            <div className="flex flex-col p-4">
                                <h3 className="dark:text-gray-800 text-gray-400 text-sm">Beginner</h3>
                                <h1 className="dark:text-black text-white text-xl">{username}</h1>
                            </div>
                        </div>
                    </div>
                    <h1 className="m-3 text-2xl dark:text-black text-white">Start your journey today!</h1>
                    <div className="flex flex-row items-center justify-between max-desktop:flex-col max-desktop:w-[300px] max-desktop:ml-8">
                        <Link to="/diet" className="flex flex-[40%] flex-wrap m-4 justify-center items-center h-[400px] hover:scale-[101%] hover:cursor-pointer ease-in-out duration-500 max-desktop:m-0 max-desktop:w-[300px] max-desktop:left-0">
                            <img className="w-[100%] h-full brightness-[40%] dark:bg-white dark:opacity-80" src={diet} />
                            <h1 className="flex absolute text-[72px] text-white max-desktop:text-[40px]">Diet plan</h1>
                        </Link>
                        <Link to="/calendar" className="flex flex-[30%] justify-center -z-0 m-3 h-[400px] hover:scale-[101%] hover:cursor-pointer ease-in-out duration-500">
                            <div className="flex flex-[30%] dark:bg-white -m-6 z-10 h-[400px] hover:cursor-pointer">
                                <Calendar isSmall={true} />
                            </div>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center flex-[80%] max-h-[180px] m-3 max-desktop:w-[300px]">
                        <Slider />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
