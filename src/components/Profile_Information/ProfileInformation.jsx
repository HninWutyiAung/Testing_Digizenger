import GuardModeToggle from "./GuardModeToggle";
import ProfileLink from "./ProfileLink";
import ProfileMainInfo from "./ProfileMainInfo";

const ProfileInformation = () =>{
    return(
        <div className="w-[349px] h-[2801px]">
            <GuardModeToggle/>
            <ProfileLink/>
            <ProfileMainInfo/>
        </div>
    )
}
export default ProfileInformation;