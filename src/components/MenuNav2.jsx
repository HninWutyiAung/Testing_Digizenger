import HomeLogo from "/images/home.png";
import Postcast from "/images/Postcast.png";
import Digizen from "/images/digizen.png";
import Profile from "/images/profile.png";
function MenuNav(){
    return(
        <section className="p-[18px]">
            <ul className="flex flex-row w-full justify-start gap-[4px] ">
                <li className="flex flex-row bg-red-100 gap-1 py-[5px] px-[10px] items-center">
                    <img className="w-[15px] h-[15px]" src={HomeLogo} />
                    <span className="text-[12px] font-medium text-[#2C3E50]">Home</span>
                </li>

                <li className="flex flex-row bg-red-100 gap-1 py-[5px] px-[10px] items-center  ">
                    <img className="w-[15px] h-[15px]" src={Postcast} />
                    <span className="text-[12px] font-medium text-[#2C3E50] leading-[21px]">Postcasts</span>
                </li>

                <li className="flex flex-row bg-red-100 gap-1 py-[5px] px-[10px] items-center">
                    <img className="w-[15px] h-[15px]" src={Digizen} />
                    <span className="text-[12px] font-medium text-[#2C3E50]">Digizens</span>
                </li>

                <li className="flex flex-row bg-red-100 gap-1 py-[5px] px-[10px] items-center">
                    <img className="w-[15px] h-[15px]" src={Profile} />
                    <span className="text-[12px] font-medium text-[#2C3E50]">Profile</span>
                </li>

            </ul>
        </section>
    )
}

export default MenuNav;