import React, {  useState, useEffect ,useRef ,startTransition} from 'react';
import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import Post from "../components/Post";
import Banner from "../components/banner";
import { useGetPostQuery } from '../api/Post';
import { selectPosts } from '../feature/postSlice';
import { useAppSelector } from '../hook/Hook';
import ShowPost from '../components/ShowPost';
import LoadingSpinner from '../components/LoadingSpinner';
import PostLoadingSpinner from '../components/postLoadingSpinner';
import { ToastContainer , toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function NewFeed({ activeChat }) {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [posts, setPosts] = useState([]);
    const [postLoading, setpostLoading] = useState(false);
    const currentUploadPost = useAppSelector(selectPosts);
    const [currentUploads, setCurrentUploads] = useState([]);
    const observerRef = useRef();
    const [hasMore,setHasMore] = useState(true);

    const { data, isSuccess, isLoading, isError, error } = useGetPostQuery(
        { page, limit },
        { skip: page === 1 && posts.length > 0 }
    );

    useEffect(() => {
        if (data && isSuccess) {
            const newPosts = data.postDtoList.filter(post =>
                !posts.some(prevPost => prevPost.id === post.id)
            );
            
            startTransition(() => {
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
    
                setpostLoading(false);
    
                if (newPosts.length < limit) {
                    setHasMore(false);
                }
            });
        }
    }, [data, isSuccess, isError, error]);

    useEffect(() => {  
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
                setPage((prevPage) => prevPage + 1);
            }
        }, { threshold: 0.5 });
        if (observerRef.current) observer.observe(observerRef.current);
        return () => { 
            if (observerRef.current) observer.unobserve(observerRef.current);
        } 
     }, [hasMore]);

    useEffect(() => {
        console.log(`Requesting page: ${page}, limit: ${limit}`);
    }, [page, limit]);

    useEffect(() => {
        if (currentUploadPost.length > 0) {

            setpostLoading(true);
            setCurrentUploads(currentUploadPost.slice(-1));
    
            setTimeout(() => {
                setpostLoading(false); 
                toast.success("Your post has been uploaded successfully!", {
                    style: {
                        backgroundColor: '#2C3E50', 
                        color: '#FFFFFF', 
                        width: '400px' ,
                    },
                    position: "bottom-left",
                    autoClose: 1000, // Duration in milliseconds
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true, // Optional, can leave undefined
                });
            }, 3000);
        }
    }, [currentUploadPost]);

    useEffect(() => {
        console.log(`postLoading: ${postLoading}`);
        console.log(`currentUploads:`, currentUploads);
    }, [postLoading, currentUploads]);

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            <div className="flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive">
                <Post activeChat={activeChat} setpostLoading={setpostLoading}/>
                <Banner activeChat={activeChat} />
                <div>
                {postLoading && currentUploads.length > 0 && (
                    <>
                        <div className='flex items-center pl-[10px] gap-3 bg-white h-[50px] border-b border-[#ECF1F4] rounded-t-lg'>
                            <PostLoadingSpinner />
                            <span className='text-left bg-white rounded-t-lg'> Loading Your Post...</span>
                        </div>
                        {currentUploads.map((currentPost) => (       
                            <div key={currentPost.id} style={{ opacity: 0.5 }}>             
                                <ShowPost activeChat={activeChat} post={currentPost.postDto}/>
                            </div>
                        ))}
                    </>
                )}
                </div>
                {posts.map((post) => (
                    // <Suspense key={post.id} fallback={<div>Loading Post...</div>}>
                        <ShowPost activeChat={activeChat} post={post} setPosts={setPosts}/>
                    // </Suspense>
                ))}
                <div ref={observerRef}></div>
                {!hasMore && <LoadingSpinner/>}

                {isLoading && <LoadingSpinner/>}
                <ToastContainer />
                
            </div>
        </section>
    );
}

export default NewFeed;