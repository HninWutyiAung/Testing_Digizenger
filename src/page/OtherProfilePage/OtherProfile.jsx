import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useGetOtherProfileQuery, useFollowUserMutation} from "../../apiService/Profile";
import { OtherProfileData, otherProfileDetail } from "./OtherProfilePage";
import { PiUserPlusFill } from "react-icons/pi";
import { PiChatCircleDotsFill } from "react-icons/pi";
import { IoHeartSharp } from "react-icons/io5";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import mark from "/images/mark2.png";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import ProfileDefaultImage from "../../../images/default_profile.jpg";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const OtherProfileComponent = () => {
  const { otherUserName } = useParams();
  const { data, isLoading, isError, refetch } = useGetOtherProfileQuery(otherUserName);
  const [followUser, { isLoading: isFollowingAPI }] = useFollowUserMutation();
  const [relationshipStatus, setRelationshipStatus] = useState(data?.otherProfileDto?.relationshipStatus);
  const [isFollowing, setIsFollowing] = useState(false);

  console.log("Other Profile file", data);

  OtherProfileData(data);

  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const buttonRef = useRef(null);

  const toggleBox = () => setIsBoxVisible(!isBoxVisible);

  useEffect(() => {
    setRelationshipStatus(data?.otherProfileDto?.relationshipStatus);
  }, [data]);

  const handleFollowUser = async () => {
    if (relationshipStatus?.toLowerCase() === "following") return; 

    setIsFollowing(true);
    try {
      await followUser(data.otherProfileDto.id).unwrap();
      await refetch();
      setRelationshipStatus(data?.otherProfileDto?.relationshipStatus);
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setIsFollowing(false);
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  if (isError)
    return <p>Error loading profile: {data?.message || "Unknown error"}</p>;

  const {
    profileImageUrl,
    coverImageUrl = "https://via.placeholder.com/640x180",
    username,
    followerCount,
    followingCount,
    neighborCount,
    otherUserForProfileDto: {
      firstName,
      lastName,
      address: { country } = {},
    } = {},
  } = data?.otherProfileDto || {};

  function getCountryCode(countryName) {
    const countryCode = countries.getAlpha2Code(countryName, "en");
    return countryCode ? countryCode.toLowerCase() : "us";
  }

  return (
    <section className="bg-accent">
      <div className="flex flex-col w-full bg-[#ECF1F4]">
        {otherProfileDetail && (
          <div className="w-full h-full pb-6 bg-white rounded-lg border border-[#c9dcde] flex flex-col items-center gap-4 overflow-hidden">
            <div className="w-full relative">
              <img
                className="w-full h-[160px] object-cover"
                src={coverImageUrl}
              />

              <img
                className="w-[150px] h-[150px] left-[15px] top-[70px] absolute rounded-full border-4 border-white"
                src={profileImageUrl || ProfileDefaultImage}
              />
            </div>
            <div className="flex flex-col items-start pl-4 pt-[50px] gap-3">
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1">
                  <div className="text-[#2c3e50] text-[28px] font-bold font-['DM Sans'] leading-normal">
                    {firstName} {lastName}
                  </div>
                  <div className="p-[2px]">
                    <img src={mark} alt="icon" className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans'] leading-normal -mt-1">
                  @{username}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="text-[#0097a7] text-base font-normal font-['DM Sans'] leading-normal">
                    Designer
                  </div>

                  <div className="relative">
                    <img
                      src={`https://flagpedia.net/data/flags/h80/${getCountryCode(
                        country
                      )}.png`}
                      alt="icon"
                      className="w-4 h-4 rounded-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-start gap-2">
                  <div className="text-[#2c3e50] text-base font-['DM Sans']">
                    <span className="font-bold leading-normal">
                      {followerCount}{" "}
                    </span>
                    <span className="font-normal leading-normal">
                      Followers
                    </span>
                  </div>
                  <div className="text-[#2c3e50] text-base font-['DM Sans']">
                    <span className="font-bold leading-normal">
                      {followingCount}{" "}
                    </span>
                    <span className="font-normal leading-normal">
                      Following
                    </span>
                  </div>
                  <div className="text-[#2c3e50] text-base font-['DM Sans']">
                    <span className="font-bold leading-normal">
                      {neighborCount}{" "}
                    </span>
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

              <div className="flex flex-wrap justify-start items-center gap-1">
                <div onClick={handleFollowUser} className="p-[5px] bg-[#ecf1f4] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#d0e3e6]">
                  <PiUserPlusFill className="w-4 h-4 text-[#2c3e50]" />
                  <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
                    {isFollowing ? "Following..." : relationshipStatus ? relationshipStatus.charAt(0).toUpperCase() + relationshipStatus.slice(1).toLowerCase() : "Follow"}
                  </div>
                </div>
                <div className="p-[5px] bg-[#ecf1f4] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#d0e3e6]">
                  <PiChatCircleDotsFill className="w-4 h-4 text-[#2c3e50]" />
                  <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
                    Message
                  </div>
                </div>
                <div className="p-[5px] bg-[#0097a7] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#007f82]">
                  <div className="w-4 h-4 flex items-center justify-center bg-white rounded-md">
                    <IoHeartSharp className="w-[13px] h-[13px] text-[#0097a7]" />
                  </div>
                  <div className="text-white text-base font-bold font-['DM Sans']">
                    Subscribe
                  </div>
                </div>
                <div className="p-[5px] bg-[#0097a7] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-[#007f82]">
                  <PiShoppingBagOpenFill className="w-[18px] h-[18px] text-white" />
                  <div className="text-white text-base font-bold font-['DM Sans']">
                    Shop
                  </div>
                </div>
                <div className="relative flex justify-end items-center">
                  <div
                    ref={buttonRef}
                    onClick={toggleBox}
                    className="p-[8px] bg-[#ecf1f4] rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-[#d0e3e6]"
                  >
                    <PiDotsThreeOutlineFill className="w-4 h-4 text-[#2c3e50]" />
                  </div>

                  <ProfileDropdownMenu
                    isVisible={isBoxVisible}
                    toggleBox={toggleBox}
                    buttonRef={buttonRef}
                  />
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
