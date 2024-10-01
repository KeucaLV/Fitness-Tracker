import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useEffect, useState } from "react";



function Profile() {



    return (
        <>
            <div className="flex flex-col font-montserrat dark:bg-white overflow-hidden items-center h-screen bg-[#000000]">
                <SideBar active="profile" />
                <Header />
                <div className="flex relative flex-col justify-self-end flex-wrap w-[90%] left-[50px]">


                    <h1 className="relative text-white">
                        Here are some playlists you can listen to while you workout!
                    </h1>
                    <div className="flex flex-row flex-wrap">
                        {/* Spotify Playlist Embeds */}
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
            </div>
        </>
    );
}

export default Profile;
