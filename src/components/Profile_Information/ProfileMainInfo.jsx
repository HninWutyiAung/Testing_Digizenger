import Photos from "./ProfileMiddleColumnCollection/Photos";
import Subscription from "./ProfileMiddleColumnCollection/Subscription";
import Videos from "./ProfileMiddleColumnCollection/Videos";

const ProfileMainInfo = () => {
  return (
    <div>
      <div className="w-full flex-col justify-start items-start gap-3 inline-flex bg-[#ECF1F4]">
        <Subscription />
        <Photos />
        <Videos />
      </div>
    </div>
  );
};

export default ProfileMainInfo;
