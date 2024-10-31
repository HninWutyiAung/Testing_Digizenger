import React from "react";
import { useState } from "react";

const GuardModeToggle = () => {
    const [isGuardModeOn, setIsGuardModeOn] = useState(false);
        const handleToggle = () => {
            setIsGuardModeOn(!isGuardModeOn);
        };

    return(
        <div className="bg-white z-20">
            <div className="w-full p-4 justify-end items-center gap-[100px] inline-flex
                             sm:p-3 sm:gap-[70px] 
                             md:p-3 md:gap-[80px] 
                             lg:p-4 lg:gap-[90px] 
                             xl:p-4 xl:gap-[100px] 
                             2xl:p-4 2xl:gap-[100px]">
                <div className="justify-start items-center gap-2 flex">
                    <div className="text-[#2c3e50] text-sm font-bold font-['DM Sans'] sm:text-xs md:text-sm lg:text-base xl:text-base">Guard Mode</div>
                        <div className={`w-10 h-5 sm:w-[35px] sm:h-[18px] md:w-[38px] md:h-[19px] lg:w-[40px] lg:h-[20px] relative flex items-center cursor-pointer rounded-full shadow-inner transition-colors duration-300 ${isGuardModeOn ? 'bg-[#00BCD4]' : 'bg-[#c9dcde]'}`} onClick={handleToggle}>
                        <div className={`w-4 h-4 sm:w-[14px] sm:h-[14px] md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px] absolute top-[2px] rounded-full bg-white transition-transform duration-300 ease-in-out ${isGuardModeOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                </div>
            </div>

            {/*=== This is For 1920px in figma design ===*/}
            {/* <div className="w-[499px] h-16 p-5 justify-end items-center gap-[170px] inline-flex border mt-3">
                <div className="justify-start items-center gap-2 flex">
                    <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Guard Mode</div>
                        <div className={`w-11 h-6 relative cursor-pointer rounded-[22px] shadow-inner transition-colors duration-300 ${isGuardModeOn ? 'bg-[#00BCD4]' : 'bg-[#c9dcde]'}`} onClick={handleToggle}>
                        <div className={`w-5 h-5 absolute top-[2px] rounded-full bg-white transition-all duration-300 ${isGuardModeOn ? 'left-[23px]' : 'left-[2px]'}`}></div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default GuardModeToggle;