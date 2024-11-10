import { useState } from "react";

const OtherProfileAllPost = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const postContent = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium laudantium quidem aperiam! Soluta impedit minus beatae omnis ad, porro incidunt, molestiae saepe quo numquam facilis debitis aliquid eos ea officia consequatur amet. Earum voluptates omnis dolores in illo expedita doloribus ea odio, facere voluptate, nobis iure, illum accusamus. Sapiente.`;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Profile and Time Info */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full border-[#7e7e8d]"
            src="https://via.placeholder.com/48x48"
            alt="Profile"
          />
          <div
            className="w-2.5 h-2.5 bg-[#00ba00] rounded-full absolute"
            style={{ top: "70%", left: "70%" }}
          />
        </div>
        {/* Profile name and post time */}
        <div className="flex flex-col items-start gap-1 grow">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-1">
              <div className="text-[#2c3e50] text-lg font-semibold font-['DM Sans'] leading-tight">
                Emma Noble
              </div>
            </div>
            <div className="w-5 h-5" />
          </div>
          <div className="text-[#7e7e8d] text-xs font-normal font-['DM Sans'] leading-snug">
            4m
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="flex items-start gap-2 pl-12">
        <div className="flex flex-col items-start gap-2">
          <div
            className={`text-[#2c3e50] text-sm font-normal font-['DM Sans'] leading-snug text-left transition-all duration-300 ease-in-out`}
            style={{
              maxWidth: "100%",
              maxHeight: isExpanded ? "none" : "72px", 
              overflow: "hidden",
            }}
          >
            {isExpanded ? (
              <>
                {postContent}
                <span
                  className="text-[#0097a7] cursor-pointer"
                  onClick={handleToggle}
                >
                  See Less
                </span>
              </>
            ) : (
              <>
                {postContent.slice(0, 150)}...{" "}
                <span
                  className="text-[#0097a7] cursor-pointer"
                  onClick={handleToggle}
                >
                  See More
                </span>
              </>
            )}
          </div>
          <div/> 
          <img
            className="rounded-lg"
            src="https://via.placeholder.com/532x347"
            alt="Event Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      {/* Likes, Flicks, and Views Section */}
      <div className="flex justify-between items-center w-full gap-2 pl-12 text-[#2c3e50] text-xs font-medium font-['DM Sans'] leading-tight">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 bg-[#00bcd4] rounded-full" />
          <span>Emma Noble and 1.2k others</span>
        </div>
        <span>482 Flicks</span>
      </div>

      {/* Interaction Buttons */}
      <div className="flex justify-between items-center w-full gap-2 pl-12 text-[#2c3e50] text-xs font-medium font-['DM Sans']">
        <div className="flex items-center gap-1 px-1 py-1">
          <span>Loves</span>
        </div>
        <div className="flex items-center gap-1 px-1 py-1">
          <span>Flick</span>
        </div>
        <div className="flex items-center gap-1 px-1 py-1">
          <span>32 views</span>
        </div>
      </div>
    </div>
  );
};

export default OtherProfileAllPost;
