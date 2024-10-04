import React, { Suspense, lazy, useState, useEffect ,useRef ,startTransition} from 'react';
import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import Post from "../components/Post";
import Banner from "../components/banner";
import { useGetPostQuery } from '../api/Post';
import { selectPosts } from '../feature/postSlice';
import { useAppSelector } from '../hook/Hook';

const ShowPost = lazy(() => import("../components/ShowPost"));

function NewFeed({ activeChat }) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [posts, setPosts] = useState([]);
    const [postLoading, setpostLoading] = useState(false);
    const currentUploadPost = useAppSelector(selectPosts);
    const [currentUploads, setCurrentUploads] = useState([]);
    const observerRef = useRef();
    const [hasMore,setHasMore] = useState(true);

    const { data, isSuccess, isLoading, isError, error } = useGetPostQuery(
        { page, limit },
        { skip: page === 0 && posts.length > 0 }
    );

    useEffect(() => {
        if (data && isSuccess) {
            const newPosts = data.postDtoList.filter(post =>
                !posts.some(prevPost => prevPost.id === post.id)
            );
            
            // Use startTransition to wrap the state update
            startTransition(() => {
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                
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
        console.log(`isLoading: ${isLoading}`);
    }, [isLoading]);

    useEffect(() => {
        console.log('currentUpload:', currentUploads);
    }, [currentUploads]);

    useEffect(() => {
        if (currentUploadPost.length > 0) {
            setCurrentUploads(currentUploadPost.slice(-1)); // Change as needed
        }
    }, [currentUploadPost]);
    console.log(currentUploads.postDto);
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
                        <p className='text-left bg-white rounded-t-lg'>Loading Your Post...</p>
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
                        <ShowPost key={post.id} activeChat={activeChat} post={post} />
                    // </Suspense>
                ))}
                <div ref={observerRef}></div>
                {!hasMore && <p>No more posts to show</p>}

                {isLoading && <p>Loading more posts...</p>}
            </div>
        </section>
    );
}

export default NewFeed;