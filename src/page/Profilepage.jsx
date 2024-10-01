import ProfileCover from "../components/ProfileCover";
import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
function Profile ({activeChat}){
    return(
        <section>
            <NewFeedNav activeChat={activeChat}/>
            <MenuNav activeChat={activeChat}/>
            <div className="flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive">
                 <ProfileCover />
            </div>
            
        </section>
    )
}

export default Profile;