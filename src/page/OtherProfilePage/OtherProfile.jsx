import { useParams } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import { useGetOtherProfileQuery } from "../../apiService/Profile";
import { OtherProfileData, otherProfileDetail } from "./OtherProfilePage";
import { PiUserPlusFill } from "react-icons/pi";
import { PiChatCircleDotsFill } from "react-icons/pi";
import { IoHeartSharp } from "react-icons/io5";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import mark from "/images/mark2.png";
import { createPortal } from "react-dom";

const DropdownMenu = ({ isVisible, toggleBox, buttonRef }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 200; // Dropdown width
      const spacing = 8; // Space between button and dropdown

      // Calculate top position directly below the button
      const top = rect.bottom + window.scrollY + spacing;

      let left;

      // Determine if button is closer to the right side than the left side
      const isButtonOnRightSide = rect.left > window.innerWidth / 4;

      if (isButtonOnRightSide) {
        // Align dropdown to the right edge of the button and expand left
        left = rect.right + window.scrollX - dropdownWidth;
      } else {
        // Align dropdown to the left edge of the button and expand right
        left = rect.left + window.scrollX;
      }

      // Ensure dropdown does not overflow the viewport boundaries
      if (left + dropdownWidth > window.innerWidth - 16) {
        // Adjust left to keep within the viewport
        left = window.innerWidth - dropdownWidth - 16;
      } else if (left < 16) {
        // Adjust rightward to avoid overflowing on the left
        left = 16;
      }

      setPosition({ top, left });
    }
  }, [buttonRef, isVisible]);

  if (!isVisible) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: "200px",
        padding: "12px",
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="space-y-2 text-sm text-[#2c3e50]">
        <li className="cursor-pointer hover:text-[#0097a7]" onClick={toggleBox}>
          Copy profile link
        </li>
        <li className="cursor-pointer hover:text-[#0097a7]" onClick={toggleBox}>
          Report profile
        </li>
        <li className="cursor-pointer hover:text-[#0097a7]" onClick={toggleBox}>
          Unfollow Emma Noble
        </li>
        <li className="cursor-pointer hover:text-red-600" onClick={toggleBox}>
          Block Emma Noble
        </li>
      </ul>
    </div>,
    document.body
  );
};







const OtherProfileComponent = () => {
  const { otherUserName } = useParams();
  const { data, isLoading, isError } = useGetOtherProfileQuery(otherUserName);

  OtherProfileData(data);

  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const buttonRef = useRef(null);

  const toggleBox = () => setIsBoxVisible(!isBoxVisible);

  if (isLoading) return <p>Loading profile...</p>;

  if (isError)
    return <p>Error loading profile: {data?.message || "Unknown error"}</p>;

  return (
    <section className="bg-accent">
      <div className="flex flex-col w-full bg-[#ECF1F4]">
        {otherProfileDetail && (
          <div className="w-full h-full pb-6 bg-white rounded-lg border border-[#c9dcde] flex flex-col items-center gap-4 overflow-hidden">
            <div className="w-full relative">
              <img
                className="w-full h-[160px] object-cover"
                src="https://via.placeholder.com/640x180"
              />
              <img
                className="w-[150px] h-[150px] left-[15px] top-[70px] absolute rounded-full border-4 border-white"
                src="https://via.placeholder.com/180x180"
              />
            </div>
            <div className="flex flex-col items-start pl-4 pt-[50px] gap-3">
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1">
                  <div className="text-[#2c3e50] text-[28px] font-bold font-['DM Sans'] leading-normal">
                    Emma Noble
                  </div>
                  <div className="p-[2px]">
                    <img src={mark} alt="icon" className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans'] leading-normal -mt-1">
                  @Emma Noble
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-[#0097a7] text-base font-normal font-['DM Sans'] leading-normal">
                    Designer
                  </div>
                  <div className="relative">
                    <img
                      src="path_to_icon.png"
                      alt="icon"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-start gap-2">
                  <div className="text-[#2c3e50] text-base font-['DM Sans']">
                    <span className="font-bold leading-normal">1.4k </span>
                    <span className="font-normal leading-normal">
                      Followers
                    </span>
                  </div>
                  <div className="text-[#2c3e50] text-base font-['DM Sans']">
                    <span className="font-bold leading-normal">1.1k </span>
                    <span className="font-normal leading-normal">
                      Following
                    </span>
                  </div>
                  <div className="text-[#2c3e50] text-base font-['DM Sans']">
                    <span className="font-bold leading-normal">839 </span>
                    <span className="font-normal leading-normal">
                      Neighbors
                    </span>
                  </div>
                </div>
                <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans']  text-left">
                  I am an environmentalist who values growth and harmony in my
                  personal and professional life.
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-center gap-2">
                <div className="p-[7px] bg-[#ecf1f4] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#d0e3e6]">
                  <PiUserPlusFill className="w-4 h-4 text-[#2c3e50]" />
                  <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
                    Follow
                  </div>
                </div>
                <div className="p-[7px] bg-[#ecf1f4] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#d0e3e6]">
                  <PiChatCircleDotsFill className="w-4 h-4 text-[#2c3e50]" />
                  <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
                    Message
                  </div>
                </div>
                <div className="p-[7px] bg-[#0097a7] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#007f82]">
                  <div className="w-4 h-4 flex items-center justify-center bg-white rounded-md">
                    <IoHeartSharp className="w-[13px] h-[13px] text-[#0097a7]" />
                  </div>
                  <div className="text-white text-base font-bold font-['DM Sans']">
                    Subscribe
                  </div>
                </div>
                <div className="p-[7px] bg-[#0097a7] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#007f82]">
                  <PiShoppingBagOpenFill className="w-[18px] h-[18px] text-white" />
                  <div className="text-white text-base font-bold font-['DM Sans']">
                    Shop
                  </div>
                </div>
                <div className="relative flex justify-end items-center">
                  <div
                    ref={buttonRef}
                    onClick={toggleBox}
                    className="p-[10px] bg-[#ecf1f4] rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-[#d0e3e6]"
                  >
                    <PiDotsThreeOutlineFill className="w-4 h-4 text-[#2c3e50]" />
                  </div>
                  
                  <DropdownMenu isVisible={isBoxVisible} toggleBox={toggleBox} buttonRef={buttonRef} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OtherProfileComponent;
