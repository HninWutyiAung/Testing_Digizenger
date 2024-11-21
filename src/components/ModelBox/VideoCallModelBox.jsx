import React, { useEffect, useRef } from "react";
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
        <div className="relative flex flex-col items-center space-y-4 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
    {/* Buttons */}
    <div className="flex space-x-4">
        <button 
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md"
        >
            Start Call
        </button>
        <button
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md"
        >
            Join Call
        </button>
    </div>

    {/* Video Container */}
    <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
        {/* Remote Video */}
        <div className="bg-black rounded-lg overflow-hidden border-2 border-gray-700">
            <video
                ref={remoteVideoRef}
                autoPlay
                className="w-full h-72 object-cover"
            />
        </div>

        {/* Local Video */}
        <div className="bg-black rounded-lg overflow-hidden border-2 border-gray-700">
            <video
                ref={localVideoRef}
                autoPlay
                className="w-full h-72 object-cover"
            />
        </div>
    </div>
</div>

    );
};

export default VideoCallModelBox;
