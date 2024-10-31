import Photos from "./ProfileImageCollection/Photos";
import Subscription from "./Subscription";
import Videos from "./Videos";

const ProfileMainInfo = () => {
    return(
        <div>
            <div className="w-full flex-col justify-start items-start gap-3 inline-flex bg-[#ECF1F4]">
                <Subscription/> 
                <Photos/>  
                <Videos/>             
            </div>
        </div>
    )
}

export default ProfileMainInfo;