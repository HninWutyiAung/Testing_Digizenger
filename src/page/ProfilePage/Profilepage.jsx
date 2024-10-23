import { useState, useEffect } from "react";
import ProfileCover from "../../components/Profile/ProfileCover";
import NewFeedNav from "../../components/NewFeed Nav/NewFeedNav";
import MenuNav from "../../components/NewFeed Nav/MenuNav2";
import ShowPost from "../../components/Post/AllPostForNewfeed/ShowPost";
import { useGetProfileQuery , useGetMyPostsQuery } from "../../apiService/Profile";
import PostLoadingSpinner from "../../components/LoadingSpinner";
import { useAppDispatch } from "../../hook/Hook";
import { setRegisterInfo } from "../../feature/authSlice";
import { IMageForMyProfile} from './profileService';
import Featured from "../../components/Profile_Information/Featured";
import About from "../../components/Profile_Information/About";

function Profile({ activeChat }) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: profile, isSuccess, isLoading, isError } = useGetProfileQuery();
    const {data: myPost , isSuccess: myPostSuccess , isLoading: myPostLoading, isError: myPostError} = useGetMyPostsQuery({page,limit})
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess && profile) {
            IMageForMyProfile(profile);
            const { firstName, lastName } = profile.profileDto.userForProfileDto;
            setUserName({ firstName, lastName }); 
            dispatch(setRegisterInfo({ firstName, lastName }));
        }
    }, [isSuccess, profile, dispatch]);

    useEffect(()=>{
        if(myPostSuccess && myPost){
            setPosts(myPost.postDtoList);
        }
    }, [myPostLoading, myPost])

    console.log(posts);

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            
            <div className="flex relative flex-col p-[20px] pt-[140px] bg-[#ECF1F4] gap-[12px] w-full h-[945px] overflow-y-auto scrollable newfeed-responsive">

                <ProfileCover firstName={userName.firstName} lastName={userName.lastName} />
                <Featured/>
                <About/>
                {myPostLoading && <div className="absolute top-[25rem] left-[12rem]"><PostLoadingSpinner/></div>}
                {myPostError && <div>Error loading profile data</div>}
                {myPostSuccess && (
                    <>   
                        <div>
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
