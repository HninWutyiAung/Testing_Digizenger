import GuardModeToggle from "./GuardModeToggle";
import ProfileLink from "./ProfileLink";
import ProfileMainInfo from "./ProfileMainInfo";

const ProfileInformation = () =>{
    return(
        <div className="w-[349px] h-[945px] responsive-main-profile flex flex-col">
            <GuardModeToggle/>
            <ProfileLink/>
            <div className="overflow-y-auto scrollable flex-grow">
                <ProfileMainInfo />
            </div>
        </div>
    )
}
export default ProfileInformation;