import React, { useEffect, useRef } from "react";
import { MdCallEnd } from "react-icons/md";
import { useWebSocket } from "../Websocket/websocketForLikeNoti";

const VideoCallModelBox = () => {
    const { localVideoRef, remoteVideoRef } = useWebSocket();

    useEffect(() => {
        if (!localVideoRef.current) {
            console.log("localVideoRef.current is not ready yet.");
        }
    }, [localVideoRef]);
    useEffect(() => {
        if (remoteVideoRef.current) {
            console.log("Remote video element is ready");
            console.log("remoteVideoRef", remoteVideoRef.current.srcObject);
        }
    }, [remoteVideoRef]);

    return (
        <div className="relative flex flex-col items-center   bg-gray-900 text-white rounded-lg shadow-lg">
            {/* Buttons */}
            <div className="absolute bottom-10 space-x-4">
                <button 
                    className="p-[1rem] bg-red-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-md"
                >
                    <MdCallEnd size={30} className="text-white"/>
                </button>
                {/* <button
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md"
                >
                    Join Call
                </button> */}
            </div>

            {/* Video Container */}
            <div className="flex gap-4 w-full max-w-5xl">
                {/* Remote Video */}
                <div className="absolute bottom-32 right-5 bg-red-100">
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        className="w-[300px] h-[10rem] object-cover"
                    />
                </div>

                {/* Local Video */}
                <div className="bg-black rounded-lg overflow-hidden border-2 border-gray-700">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        className="max-w-[600px] h-[570px] object-fill"
                    />
                </div>
            </div>
        </div>

    );
};

export default VideoCallModelBox;
