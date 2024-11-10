import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PiLinkSimpleBold } from "react-icons/pi";
import { GrFlag } from "react-icons/gr";
import { RiUserUnfollowLine } from "react-icons/ri";
import { PiProhibitBold } from "react-icons/pi";
import { useUnfollowUserMutation } from "../../apiService/Profile";

const ProfileDropdownMenu = ({ isVisible, toggleBox, buttonRef, id, refetch, firstName, lastName, relationshipStatus }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [loading, setLoading] = useState(false);
  const [unfollowUser] = useUnfollowUserMutation();

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 200;
      const spacing = 8;

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

  const handleUnfollow = async () => {
    if (relationshipStatus === "FOLLOWING") {
      setLoading(true); 

      try {
        await unfollowUser(id).unwrap(); 
        await refetch(); 
      } catch (error) {
        console.error("Error unfollowing user:", error);
      } finally {
        setLoading(false); 
        toggleBox(); 
      }
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={`absolute w-48 p-1 bg-white rounded-lg shadow border border-[#ecf1f4] flex-col justify-start items-start gap-1 inline-flex`}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full rounded flex justify-start items-center gap-1.5 p-1 cursor-pointer hover:bg-[#d0e3e6] transform transition-transform hover:-translate-y-0.5"
        onClick={toggleBox}
      >
        <PiLinkSimpleBold className="text-[#2c3e50] w-4 h-4" />
        <span className="text-[#2c3e50] text-xs">Copy profile link</span>
      </div>

      <div className="w-full h-px border border-[#8c8ca1]/40"></div>

      <div
        className="w-full rounded flex justify-start items-center gap-1.5 p-1 cursor-pointer hover:bg-[#d0e3e6] transform transition-transform hover:-translate-y-0.5"
        onClick={toggleBox}
      >
        <GrFlag className="text-[#2c3e50] w-4 h-4" />
        <span className="text-[#2c3e50] text-xs">Report profile</span>
      </div>

      <div
        className="w-full rounded flex justify-start items-center gap-1.5 p-1 cursor-pointer hover:bg-[#d0e3e6] transform transition-transform hover:-translate-y-0.5"
        onClick={handleUnfollow} disabled={loading}
      >
        <RiUserUnfollowLine className="text-[#2c3e50] w-4 h-4" />
        <span className="text-[#2c3e50] text-xs">{loading ? "Unfollowing..." : `Unfollow ${firstName} ${lastName}`}</span>
      </div>

      <div
        className="w-full rounded flex justify-start items-center gap-1.5 p-1 cursor-pointer hover:bg-[#d0e3e6] transform transition-transform hover:-translate-y-0.5"
        onClick={toggleBox}
      >
        <PiProhibitBold className="text-[#f04343] w-4 h-4 relative" />
        <span className="text-[#f04343] text-xs">Block {firstName}{" "}{lastName}</span>
      </div>
    </div>,
    document.body
  );
};

export default ProfileDropdownMenu;
