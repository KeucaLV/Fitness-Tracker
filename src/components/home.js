import logo from "../images/logo.png";
import {Link} from "react-router-dom";
import diet from "../images/diet.webp";
import profile from "../images/profile.png";
import SideBar from "./sideBar";
import Slider from "./slider";
import {useEffect, useState} from "react";
import ThemeToggle from "./ThemeToggle";

function Home(){

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
        // Optionally, you can set up an interval to update the greeting periodically
        const interval = setInterval(updateGreeting, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return(
        <>
            <SideBar active="home"/>
            <div className="flex w-screen bg-[#000000] dark:bg-white flex-col h-screen border-2 overflow-hidden border-black">
                <div className="flex relative flex-col w-[1363px] h-screen left-[108px] m-0">
                    <div className="flex relative justify-between items-center w-[1363px] p-2 h-[100px] dark:bg-gray-100 -top-4 bg-[#131313]">
                        <div className="flex flex-row ">
                            <div className="flex flex-col p-4">
                                <h3 className="dark:text-gray-800 text-gray-400 text-sm">{greeting}</h3>
                                <h2 className="dark:text-black text-white text-xl">Welcome back!</h2>
                            </div>
                            <div className="flex relative top-[5px]">
                                <ThemeToggle  />
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <img className="flex justify-center items-center overflow-hidden rounded-full w-[52px] h-[50px] " src={profile}/>
                            <div className="flex flex-col p-4">
                                <h3 className="dark:text-gray-800 text-gray-400 text-sm">Beginner</h3>
                                <h1 className="dark:text-black text-white text-xl">Username</h1>
                            </div>
                        </div>
                    </div>
                    <h1 className="m-3 text-2xl dark:text-black text-white">Start your weight loss today!</h1>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-[40%] m-3 justify-center items-center h-[400px] hover:scale-[101%] hover:cursor-pointer ease-in-out duration-500">
                            <img className="w-full h-full brightness-[40%]" src={diet}/>
                            <h1 className="flex absolute text-[72px] text-white">Diet plan</h1>
                        </div>
                        <div className="flex flex-[30%] m-3 h-[400px] border-2 border-green-500">

                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-[80%] max-h-[180px] m-3">
                        <Slider/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;