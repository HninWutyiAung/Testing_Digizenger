import { useState, useEffect } from "react";
import ProfileCover from "../components/ProfileCover";
import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import ShowPost from "../components/ShowPost";
import { useGetProfileQuery } from "../api/Profile";
import PostLoadingSpinner from "../components/LoadingSpinner";
import { useAppDispatch } from "../hook/Hook";
import { setRegisterInfo } from "../feature/authSlice";

function Profile({ activeChat }) {
    const { data: profile, isSuccess, isLoading, isError } = useGetProfileQuery();
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess && profile) {
            setPosts(profile.profileDto.userForProfileDto.postDtoList);
            const { firstName, lastName } = profile.profileDto.userForProfileDto;
            setUserName({ firstName, lastName }); // Update local state
            dispatch(setRegisterInfo({ firstName, lastName })); // Dispatch to Redux
        }
    }, [isSuccess, profile, dispatch]);

    // Use userName state to access firstName and lastName
    console.log(userName.firstName, userName.lastName);

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            
            <div className="flex relative flex-col p-[20px] pt-[140px] bg-[#ECF1F4] gap-[12px] w-full h-[945px] overflow-y-auto scrollable newfeed-responsive">
                {/* Pass firstName and lastName to ProfileCover */}
                <ProfileCover firstName={userName.firstName} lastName={userName.lastName} />
                {isLoading && <div className="absolute top-[25rem] left-[20rem]"><PostLoadingSpinner/></div>}
                {isError && <div>Error loading profile data</div>}
                {isSuccess && (
                    <>   
                        <div className="flex flex-col gap-3">
                            {
                                posts.map((profilePost) => (
                                    <ShowPost key={profilePost.id} post={profilePost} setPosts={setPosts} />
                                ))
                            }
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Profile;
