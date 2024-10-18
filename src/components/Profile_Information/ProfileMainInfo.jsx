import Photos from "./Photos";
import Subscription from "./Subscription";
import Videos from "./Videos";

const ProfileMainInfo = () => {
    return(
        <div>
            <div className="w-full max-w-[349px] h-[2801px] flex-col justify-start items-start gap-3 inline-flex bg-[#ECF1F4]
                            sm:max-w-[349px]
                            md:max-w-[349px]
                            lg:max-w-[349px]
                            xl:max-w-[349px]">
                <Subscription/> 
                <Photos/>  
                <Videos/>             
            </div>
        </div>
    )
}

export default ProfileMainInfo;