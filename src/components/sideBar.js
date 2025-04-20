import logo from "../images/logo.png";
import {Link} from "react-router-dom";
import {useState} from "react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

function SideBar({ active }){
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Assuming 'accessToken' is stored in localStorage
        navigate("/login"); // Redirect to the login page
    };
    const isActive = (path) => active === path ? 'text-green-500 dark:text-green-500' : 'text-white';
    return(
        <>
            <div
                className={`${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed left-0 top-0 w-[100px] h-full dark:bg-gray-100 bg-[#131313] z-10 transition-transform duration-300 flex flex-col justify-between items-center desktop:translate-x-0`}
            >
                <Link to="/home" className="flex flex-col justify-center items-center">
                    <img className="w-[50px] h-[50px] m-5" src={logo} alt="Logo" />
                </Link>
                {/*<div className="flex text-white flex-col w-1/2 justify-evenly items-center h-1/2">*/}
                <div className="flex text-white dark:text-black flex-col  w-1/2 justify-center items-center h-1/2">
                    <Link to="/home" className={`py-4 w-full dark:text-black flex hover:text-green-500 hover:scale(105%) ease-in-out duration-100 justify-center border-b-[1px] dark:border-black border-white ${isActive("home")}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 hover:size-8 ease-in-out duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                    <Link to="/profile" className={`py-4 w-full dark:text-black flex hover:text-green-500 hover:scale(105%) ease-in-out duration-100 justify-center border-b-[1px] dark:border-black border-white ${isActive("profile")}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 hover:size-8 ease-in-out duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link>
                    <Link to="/calendar" className={`py-4 w-full dark:text-black flex hover:text-green-500 hover:scale(105%) ease-in-out duration-100 justify-center border-b-[1px] dark:border-black border-white ${isActive("calendar")}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 hover:size-8 ease-in-out duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                    </Link>
                    <Link className={`py-4 w-full flex dark:text-black justify-center hover:text-green-500  ease-in-out duration-100 dark:border-black border-white ${isActive("workouts")}`} to="/workouts" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 hover:size-8 ease-in-out duration-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                    </Link>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="absolute left-[110px] top-1/2 transform -translate-y-1/2 text-4xl text-bold text-white px-4 py-2 desktop:hidden"
                >
                    {isOpen ? "<" : ">"}
                </button>
                <button
                    onClick={handleLogout} // Trigger the logout function on click
                    className="m-5 text-white dark:text-black"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                </button>
            </div>
        </>
    );
}
export default SideBar;