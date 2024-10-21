import GuardModeToggle from "./GuardModeToggle";
import ProfileLink from "./ProfileLink";
import ProfileMainInfo from "./ProfileMainInfo";

const ProfileInformation = () =>{
    return(
        <div className="">
            <GuardModeToggle/>
            <ProfileLink/>
            <div className="h-[945px] overflow-y-auto scrollable pt-[110px] responsive-main-profile">
                 <ProfileMainInfo/>
            </div>
            
        </div>
    )
}
export default ProfileInformation;