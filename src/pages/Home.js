import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import diet from "../images/diet.webp";
import profile from "../images/profile.png";
import SideBar from "../components/SideBar";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Calendar from "../components/Calendar";
import Header from "../components/Header";

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
            <div className="flex flex-col flex-wrap w-screen h-screen bg-[#000000] font-montserrat dark:bg-white overflow-x-hidden max-desktop:overflow-y-scroll">
            <div className="flex relative flex-col pl-[100px] pr-[10px] m-0 max-desktop:flex-col max-desktop:pl-4 max-desktop:pr-4">
                <Header />
                <h1 className="m-3 text-3xl text-center uppercase dark:text-black text-white">
                Start your journey today!
                </h1>

                <div className="flex flex-row items-center justify-between max-desktop:flex-col max-desktop:w-full max-desktop:items-center">
                {/* Diet Plan */}
                <Link
                    to="/diet"
                    className="relative flex flex-[40%] flex-wrap m-4 justify-center items-center hover:scale-[101%] hover:cursor-pointer ease-in-out duration-500 max-desktop:w-[300px] max-desktop:m-2"
                >
                    <img
                    className="w-full h-full brightness-[40%] dark:bg-white dark:opacity-80"
                    src={diet}
                    alt="Diet plan"
                    />
                    <h1 className="absolute text-[72px] text-white uppercase max-desktop:text-[40px] text-center">
                    Diet plan
                    </h1>
                </Link>

                {/* Calendar */}
                <Link
                    to="/calendar"
                    className="flex flex-[30%] -mt-12 justify-center m-3 hover:scale-[101%] hover:cursor-pointer ease-in-out duration-500 max-desktop:w-[300px] max-desktop:mt-0"
                >
                    <div className="w-full h-[400px]">
                    <Calendar isSmall={true} />
                    </div>
                </Link>
                </div>

                {/* Slider */}
                <div className="flex justify-center items-center flex-[100%] m-3 max-desktop:w-[300px]">
                <Slider />
                </div>
            </div>
            </div>
        </>
    );
}

export default Home;
