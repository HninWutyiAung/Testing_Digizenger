import React, { useState, useEffect, useRef, startTransition } from 'react';
import NewFeedNav from "../components/NewFeed Nav/NewFeedNav";
import MenuNav from "../components/NewFeed Nav/MenuNav2";
import Post from "../components/Post/UploadPost/Post.jsx";
import Banner from "../components/NewFeed Banner/banner";
import { useGetPostQuery } from '../apiService/Post.ts';
import { useAppSelector,useAppDispatch } from '../hook/Hook';
import ShowPost from '../components/Post/AllPostForNewfeed/ShowPost';
import LoadingSpinner from '../components/LoadingSpinner';
import PostLoadingSpinner from '../components/Post/PostLoadingUI/postLoadingSpinner';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentPost ,resetCurrentUpload} from '../feature/postSlice';
import PostLoading from '../components/Post/PostLoadingUI/PostLoading';
import { useWebSocket } from '../components/Websocket/websocketForLikeNoti.jsx';

function NewFeed({ activeChat }) {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const currentUpload = useAppSelector(selectCurrentPost); 
    const observerRef = useRef();
    const [hasMore, setHasMore] = useState(true);
    const loginInfo = JSON.parse(localStorage.getItem("LoginInfo") || "{}");
    const userId = loginInfo.userId;
    const toastRef = useRef(null);
    const dispatch = useAppDispatch();
    const {websocketConnectForLikeNoti} = useWebSocket();

    const { data, isSuccess, isLoading } = useGetPostQuery(
        { page, limit },
        { skip: page === 0 && posts.length > 0 }
    );

    useEffect(() => {
        if (data && isSuccess) {
            const newPosts = data.postDtoList.filter(post =>
                !posts.some(prevPost => prevPost.id === post.id)
            );

            startTransition(() => {
                setPosts(prevPosts => [...prevPosts, ...newPosts]);

                if (newPosts.length < limit) {
                    setHasMore(false);
                }else if(newPosts.length === limit){
                    setHasMore(true);
                }
            });
        }
    }, [data, isSuccess]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 0.5 });

        if (observerRef.current) observer.observe(observerRef.current);
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        }
    }, [hasMore]);

    useEffect(() => {
        console.log(`Requesting page: ${page}, limit: ${limit} , hasMor : ${hasMore}`);
    }, [page, limit]);

    useEffect(() => {
        if (currentUpload) {

            setPostLoading(true);

            const timer = setTimeout(() => {
                toastRef.current = toast.success("Your post has been uploaded successfully!", {
                    style: {
                        backgroundColor: '#2C3E50',
                        color: '#FFFFFF',
                        width: '400px',
                    },
                    position: "bottom-left",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                toast.dismiss(toastRef.current);
                dispatch(resetCurrentUpload()); 
                setPostLoading(false);
            }, 3000); 

            
            return () => {
                clearTimeout(timer);
            };
        }
    }, [currentUpload, dispatch]);


    useEffect(()=>{
        console.log(currentUpload)
    },[currentUpload])

    useEffect(() => {
            console.log("user id:",userId);
    
              websocketConnectForLikeNoti(userId);
              console.log("it work noti")
          }, [websocketConnectForLikeNoti,userId]);


    

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            <div className="flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive">
                <Post activeChat={activeChat} setpostLoading={setPostLoading}/>
                <Banner activeChat={activeChat} />
                <div>
                    {postLoading && currentUpload && (
                        <>
                            <div className='flex items-center pl-[10px] gap-3 bg-white h-[50px] border-b border-[#ECF1F4] rounded-t-lg opacity-[0.5]'>
                                <PostLoadingSpinner />
                                <span className='text-left bg-white rounded-t-lg'> Loading Your Post...</span>
                            </div>
                            <div key={currentUpload.id} style={{ opacity: 0.5 }}>
                                <PostLoading activeChat={activeChat} post={currentUpload} />
                            </div>
                        </>
                    )}
                </div>
                {posts.map((post) => (
                    <ShowPost key={post.id} activeChat={activeChat} post={post} setPosts={setPosts} />
                ))}
                <div ref={observerRef}></div>
                {!hasMore && <LoadingSpinner />}
                {isLoading && <LoadingSpinner />}
                <ToastContainer />
            </div>
        </section>
    );
}

export default NewFeed;
