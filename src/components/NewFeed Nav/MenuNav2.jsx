import HomeLogo from "/images/home.png";
import Postcast from "/images/postcast.png";
import Digizen from "/images/digizen.png";
import Profile from "/images/profile.png";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function MenuNav({activeChat}){
    const [activeButton, setActiveButton] = useState ("newfeed");
    const navigate = useNavigate();
    const buttonHandle = (value) => {
        setActiveButton(value);
        
            if (value === "newfeed") {
              navigate("/home/newfeed");
            } else if (value === "postcast") {
              navigate("/postcast");
            } else if (value === "digizen") {
              navigate("/digizen");
            } else if (value === "profile") {
              navigate("/home/profile");
            }     
    }

    useEffect(() => {
        // Set the activeButton based on the current path
        if (location.pathname.includes("newfeed")) {
            setActiveButton("newfeed");
        } else if (location.pathname.includes("postcast")) {
            setActiveButton("postcast");
        } else if (location.pathname.includes("digizen")) {
            setActiveButton("digizen");
        } else if (location.pathname.includes("profile")) {
            setActiveButton("profile");
        }
    }, [location.pathname]);
    return(
        <section className="p-[15px] w-[24.2%] 2xl:w-[33.3%] z-20 bg-white fixed top-[48.5px] menu-small-screen ">
            <ul className="flex flex-row w-full flex-wrap justify-start gap-[4px]">
                <li className={`flex flex-row  gap-1 py-[8px] px-[18px] rounded-[20px] justify-center items-center responsive-nav-button hover:bg-[#ECF1F4] ${activeButton === "newfeed" ? "bg-[#00BCD4] !important" : " "}`} onClick={()=>{buttonHandle("newfeed")}}>
                    <img className="w-[15px] h-[15px]" src={HomeLogo} />
                    <span className="text-[12px] font-medium text-[#2C3E50]">Home</span>
                </li>

                <li className={`flex flex-row  gap-1 min-w-[50px] py-[8px] px-[18px] rounded-[20px] justify-center items-center responsive-nav-button hover:bg-[#ECF1F4] ${activeButton === "postcast" ? "bg-[#00BCD4] !important" : " "}`} onClick={()=>buttonHandle("postcast")}>
                    <img className="w-[15px] h-[15px]" src={Postcast} />
                    <span className="text-[12px] font-medium text-[#2C3E50] leading-[21px]">Postcasts</span>
                </li>

                <li className={`flex flex-row  gap-1 min-w-[50px] py-[8px] px-[18px] rounded-[20px] justify-center items-center responsive-nav-button hover:bg-[#ECF1F4] ${activeButton === "digizen" ? "bg-[#00BCD4] !important" : " "}`} onClick={()=>buttonHandle("digizen")}>
                    <img className="w-[15px] h-[15px]" src={Digizen} />
                    <span className="text-[12px] font-medium text-[#2C3E50]">Digizens</span>
                </li>

                <li className={`flex flex-row  gap-1 min-w-[50px] py-[8px] px-[18px] rounded-[20px] justify-center items-center responsive-nav-button hover:bg-[#ECF1F4] ${activeButton === "profile" ? "bg-[#00BCD4] !important" : " "}`} onClick={()=>buttonHandle("profile")}>
                    <img className="w-[15px] h-[15px]" src={Profile} />
                    <span className="text-[12px] font-medium text-[#2C3E50]" >Profile</span>
                </li>

            </ul>
        </section>
    )
}

export default MenuNav;