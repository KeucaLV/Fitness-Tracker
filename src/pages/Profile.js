import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import EditProfile from "../components/EditProfile";
import axios from "axios"; // Make sure you have axios installed
import { Pencil } from "lucide-react"
import favouriteMeal from "../images/Favourite/FavouriteMeal.png";
import favouriteWorkout from "../images/Favourite/FavouriteWorkout.png";


function Profile() {
    const [user, setUser] = useState("");
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('Id');
    const [isEditProfileOpen, setEditProfileOpen] = useState(false);

    const handleEditProfileClick = () => {
        setEditProfileOpen(true); // Open the Edit Profile modal
    };

    const closeEditProfile = () => {
        setEditProfileOpen(false); // Close the Edit Profile modal
    };


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://admin.kevfitness.com/api/lietotajs?user_id=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Get token from local storage
                    },
                });
                setUser(response.data); // Store user data in state
                console.log(user);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.response.data.message || 'An error occurred');
            }
        };

        fetchUserData();
    }, []);

    const progressPercentage = user && user.weight_now && user.goal_weight ?
        ((user.weight_now / user.goal_weight) * 100) : 0;


    return (
        <>
        <SideBar active="profile" />
            <div className="flex flex-col w-screen h-screen items-center font-montserrat overflow-x-hidden dark:bg-white bg-[#000000]">
                <div className="flex relative flex-col pl-[100px] w-screen h-screen m-0 max-desktop:flex-col max-desktop:left-0">
                    <Header />
                    <div className="flex relative flex-col flex-wrap pr-16 left-[50px] max-desktop:left-0">
                    <h1 className="text-white self-center m-4 mt-2 text-3xl  dark:text-black uppercase">Progress Hub — Where Effort Meets Results</h1>
                        <div className="flex flex-row">
                            <div className="flex flex-col justify-center flex-wrap flex-[50%] text-white ">
                                <div className="flex items-center ">
                                    <h1 className="text-[18px] -mt-[70px]">Here you can participate in the leaderboard </h1>
                                    <p className="ml-4 -mt-[70px]">→</p>
                                    <button className="flex justify-center items-center ml-4 p-3 -mt-[70px] h-[25px] rounded-md space-x-3 bg-[#252525] transition-colors hover:bg-white hover:text-black">
                                        Participate
                                    </button>
                                </div>
                                <div className="h-[2px] w-full bg-gradient-to-r from-[#171717] via-[#303030] to-[#171717]"></div>
                                {user ? (
                                    <div className="flex flex-row justify-evenly">
                                        <div className="flex flex-[25%] max-w-[250px] flex-col items-center p-4 ">
                                            <img className="w-[155px] h-[150px] rounded-full" src={`${user.img}`}/>
                                            <h1 className="text-2xl mt-3">{user.username}</h1>
                                            <p className="text-[14px] text-[#707070]"> {user.email}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center max-w-[600px] flex-[70%]">
                                            <div className="flex w-full justify-between">
                                                <h1 className="text-lg">Your progress!</h1>
                                                <button
                                                    className="flex items-center self-end justify-self-start mb-4 w-[140px] h-[30px] rounded-md p-2 space-x-3 bg-[#252525] transition-colors hover:bg-white hover:text-black"
                                                    onClick={handleEditProfileClick} // Open Edit Profile on click
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span>Edit Profile</span>
                                                </button>
                                            </div>
                                            <div className="flex w-[90%] m-2 h-[10px] bg-gray-300 rounded-md overflow-hidden shadow-md group">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-300 to-green-800"
                                                    style={{
                                                        width: `${progressPercentage}%`,
                                                        transition: 'width 0.5s ease-in-out',
                                                        animation: 'bubble 2s infinite ease-in-out',
                                                    }}
                                                ></div>

                                                {/* Tooltip */}
                                                <span
                                                    className="absolute left-[470px] top-[18%] transform p-2 text-xs text-white bg-[#252525] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    {Math.round(progressPercentage)}% out of 100%
                                                </span>
                                            </div>
                                            <div className="flex w-full p-2 justify-between">
                                                <h1 className="w-[100px] text-center">Start: {user.weight_now} Kg</h1>
                                                <h1 className="text-[#707070]">{user.goal} weight</h1>
                                                <h1 className="w-[100px] text-center">Goal: {user.goal_weight} Kg</h1>
                                            </div>
                                        </div>
                                    </div>

                                ) : (
                                    <h1 className="text-white">Loading user data...</h1>
                                )}
                                <div className="h-[2px] w-full bg-gradient-to-r from-[#171717] via-[#303030] to-[#171717]"></div>
                                <div className="flex w-full mt-6 justify-evenly items-center">
                                    <Link to="/favouriteWorkouts" className="flex flex-wrap justify-center items-center hover:brightness-[70%] hover:cursor-pointer ease-in-out duration-500">
                                        <img className="flex flex-[50%] brightness-[30%] max-w-[380px]" src={favouriteWorkout}/>
                                        <h1 className="flex absolute text-[30px] uppercase">Favourite Workout</h1>
                                    </Link>
                                    <Link to="/favouriteMeal" className="flex justify-center items-center hover:brightness-[70%]  hover:cursor-pointer ease-in-out duration-500">
                                        <img className="flex flex-[50%] brightness-[30%] max-w-[380px]" src={favouriteMeal}/>
                                        <h1 className="flex absolute text-[30px] uppercase">Favourite Meal</h1>
                                    </Link>
                                </div>
                            </div>
                            <Leaderboard />
                        </div>
                        <h1 className="relative text-white">
                            Here are some playlists you can listen to while you workout!
                        </h1>
                        <div className="flex flex-row flex-wrap">
                            <iframe
                                className="rounded-lg flex-[25%] m-2"
                                src="https://open.spotify.com/embed/playlist/7ivXaN4XVG1yYsFpD2bdKV?utm_source=generator&theme=0"
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>

                            <iframe
                                className="rounded-lg flex-[25%] m-2"
                                src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0"
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>

                            <iframe
                                className="rounded-lg flex-[25%] m-2"
                                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0pH2SQMRXnC?utm_source=generator&theme=0"
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                    {isEditProfileOpen && (
                        <div className="fixed inset-0 flex flex-col  items-center justify-center bg-black bg-opacity-50">
                            {isEditProfileOpen && <EditProfile onClose={closeEditProfile} />}s
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
