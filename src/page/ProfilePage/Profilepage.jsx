import { useState, useEffect } from "react";
import ProfileCover from "../../components/Profile/ProfileCover";
import NewFeedNav from "../../components/NewFeed Nav/NewFeedNav";
import MenuNav from "../../components/NewFeed Nav/MenuNav2";
import ShowPost from "../../components/Post/AllPostForNewfeed/ShowPost";
import { useGetProfileQuery } from "../../apiService/Profile";
import PostLoadingSpinner from "../../components/LoadingSpinner";
import { useAppDispatch } from "../../hook/Hook";
import { setRegisterInfo } from "../../feature/authSlice";
import { IMageForMyProfile} from './profileService';

function Profile({ activeChat }) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: profile, isSuccess, isLoading, isError } = useGetProfileQuery({page,limit});
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess && profile) {
            IMageForMyProfile(profile);
            setPosts(profile.profileDto.userForProfileDto.postDtoList);
            const { firstName, lastName } = profile.profileDto.userForProfileDto;
            setUserName({ firstName, lastName }); 
            dispatch(setRegisterInfo({ firstName, lastName }));
        }
    }, [isSuccess, profile, dispatch]);

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            
            <div className="flex relative flex-col p-[20px] pt-[140px] bg-[#ECF1F4] gap-[12px] w-full h-[945px] overflow-y-auto scrollable newfeed-responsive">

                <ProfileCover firstName={userName.firstName} lastName={userName.lastName} />
                {isLoading && <div className="absolute top-[25rem] left-[12rem]"><PostLoadingSpinner/></div>}
                {isError && <div>Error loading profile data</div>}
                {isSuccess && (
                    <>   
                        <div className="">
                            {
                                posts.map((profilePost) => (
                                    <ShowPost key={profilePost.id} activeChat={activeChat} post={profilePost} setPosts={setPosts} />
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