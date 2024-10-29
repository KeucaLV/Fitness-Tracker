import profile from "../images/profile.png";
import React, {useState} from "react";
import benching from "../images/benching.mp4";


function Leaderboard(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toggle the modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    return(
        <>
            <div className="flex self-end flex-col w-[500px] font-montserrat rounded-2xl">
                <div className="flex w-full justify-around items-center">
                    <h1 className="text-white text-2xl mt-2 hover:underline cursor-pointer decoration-blue-900 self-center">Deadlift</h1>
                    <h1 className="text-white text-2xl mt-2 hover:underline cursor-pointer decoration-blue-900 self-center">Squats</h1>
                    <h1 className="text-white text-2xl mt-2 hover:underline cursor-pointer decoration-blue-900 self-center">Benchpress</h1>
                </div>
                <div className="flex flex-row mt-5">
                    <div className="flex justify-end flex-[20%] h-[300px]">
                        <div className="flex flex-col w-[90%] self-end items-center rounded-tl-[20px] h-[190px] bg-[#131313] dark:bg-gray-300">
                            <div className="flex absolute w-[90px] h-[90px] top-[13%] border-[3px] border-blue-700 bg-white rounded-full justify-center items-center overflow-hidden">
                                <img className="flex " src={profile} />
                            </div>
                            <h1 className="text-white mt-[30px] dark:text-black">Niks Kevins</h1>
                            <p className="text-blue-700 font-bold ">200 Kg</p>
                            <p className="text-gray-400 text-[12px] dark:text-black">@keucaLV</p>
                            <p onClick={toggleModal} className="text-blue-700 mt-[40%] hover:cursor-pointer underline text-[12px]">Video</p>
                        </div>
                        {/* Modal Overlay */}
                        {isModalOpen && (
                            <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-[#171717] rounded-lg overflow-hidden shadow-xl  w-[90%] max-w-[600px]">
                                    <div className="flex justify-end p-2">
                                        <button onClick={toggleModal} className="text-gray-500 hover:text-red-500 text-[30px] font-bold">
                                            &times;
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <video controls className="w-full h-[600px] rounded-md">
                                            <source src={benching} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex  items-center flex-[20%] h-[300px]">
                        <div className="flex flex-col w-full items-center self-end  rounded-t-[30px] h-[225px] bg-[#181818] dark:bg-gray-200">
                            <div className="flex absolute w-[90px] h-[90px] top-14 border-[3px] border-yellow-500 bg-white rounded-full justify-center items-center overflow-hidden">
                                <img className="flex " src={profile} />
                            </div>
                            <h1 className="text-white mt-[30px] dark:text-black">Ralfs</h1>
                            <p className="text-yellow-500 font-bold dark:text-yellow-600">230 Kg</p>
                            <p className="text-gray-400 text-[12px] dark:text-black">@saint</p>
                            <p className="text-blue-700 mt-[57%] hover:cursor-pointer underline text-[12px]">Video</p>
                        </div>
                    </div>
                    <div className="flex items-center flex-[20%] h-[300px]">
                        <div className="flex flex-col w-[90%] items-center self-end  rounded-tr-[20px] h-[150px] bg-[#131313] dark:bg-gray-300">
                            <div className="flex absolute w-[90px] h-[90px] top-32 bg-white border-[3px] border-green-500 rounded-full justify-center items-center overflow-hidden">
                                <img className="flex " src={profile} />
                            </div>
                            <h1 className="text-white mt-[30px] dark:text-black">Reinis</h1>
                            <p className="text-green-500 font-bold ">190 Kg</p>
                            <p className="text-gray-400 text-[12px] dark:text-black">@agranoli</p>
                            <p className="text-blue-700 mt-[15%] hover:cursor-pointer underline text-[12px]">Video</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start w-full pl-[16px] overflow-y-scroll h-[260px] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent dark:scrollbar-thumb-gray-300">
                    <div className="flex space-x-3 w-[99%] border-b-2 border-b-gray-800 bg-[#131313] p-2 h-[70px] dark:bg-gray-300 dark:border-b-gray-400">
                        <div className="flex text-white">4.</div>
                        <div className="flex flex-row  items-center w-full ">
                            <div className="flex w-[40px] h-[40px] mr-2 bg-white justify-center items-center overflow-hidden rounded-full">
                                <img className="flex " src={profile} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm dark:text-black">tomass</p>
                                <p className="text-gray-500 text-sm dark:text-black">@fur1ozz</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-[30%] justify-center items-center">
                            <p className="text-white text-sm dark:text-black">170 Kg</p>
                            <p className="text-blue-500 underline text-[12px] cursor-pointer dark:text-black">Video</p>
                        </div>
                    </div>
                    <div className="flex space-x-3 w-[99%] border-b-2 border-b-gray-800 bg-[#131313] p-2 h-[70px] dark:bg-gray-300 dark:border-b-gray-400">
                        <div className="flex text-white">5.</div>
                        <div className="flex flex-row  items-center w-full ">
                            <div className="flex w-[40px] h-[40px] mr-2 bg-white justify-center items-center overflow-hidden rounded-full">
                                <img className="flex " src={profile} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm dark:text-black">Jānis</p>
                                <p className="text-gray-500 text-sm dark:text-black">@Krupix</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-[30%] justify-center items-center">
                            <p className="text-white text-sm dark:text-black">170 Kg</p>
                            <p className="text-blue-500 underline text-[12px] cursor-pointer dark:text-black">Video</p>
                        </div>
                    </div>
                    <div className="flex space-x-3 w-[99%] border-b-2 border-b-gray-800 bg-[#131313] p-2 h-[70px] dark:bg-gray-300 dark:border-b-gray-400">
                        <div className="flex text-white">6.</div>
                        <div className="flex flex-row  items-center w-full ">
                            <div className="flex w-[40px] h-[40px] mr-2 bg-white justify-center items-center overflow-hidden rounded-full">
                                <img className="flex " src={profile} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-white text-sm dark:text-black">Oļegs</p>
                                <p className="text-gray-500 text-sm dark:text-black">@LoveSosa</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-[30%] justify-center items-center">
                            <p className="text-white text-sm dark:text-black">170 Kg</p>
                            <p className="text-blue-500 underline text-[12px] cursor-pointer dark:text-black">Video</p>
                        </div>
                    </div>
                    <div className="flex sticky bottom-0 bg-white p-2 space-x-3 w-[99%] h-[70px] ">
                        <div className="flex text-black">6.</div>
                        <div className="flex flex-row  items-center w-full ">
                            <div className="flex w-[40px] h-[40px] mr-2 bg-white justify-center items-center overflow-hidden rounded-full">
                                <img className="flex " src={profile} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-black text-sm dark:text-black">Oļegs</p>
                                <p className="text-black text-sm dark:text-black">@LoveSosa</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-[30%] justify-center items-center">
                            <p className="text-black text-sm dark:text-black">170 Kg</p>
                            <p className="text-blue-500 underline text-[12px] cursor-pointer dark:text-black">Video</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Leaderboard;