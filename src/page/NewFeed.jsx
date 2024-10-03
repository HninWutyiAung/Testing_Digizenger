import React, { Suspense, lazy, useState, useEffect } from 'react';
import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import Post from "../components/Post";
import Banner from "../components/banner";
import { useGetPostQuery } from '../api/Post';
import { selectPosts } from '../feature/postSlice';
import { useAppSelector } from '../hook/Hook';

// Lazy load the ShowPost component
const ShowPost = lazy(() => import("../components/ShowPost"));

function NewFeed({ activeChat }) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [posts, setPosts] = useState([]);
    const [postLoading, setpostLoading] = useState(false);
    const currentUploadPost = useAppSelector(selectPosts);
    const [currentUploads, setCurrentUploads] = useState([]);

    const { data, isSuccess, isLoading, isError, error } = useGetPostQuery(
        { page, limit },
        { refetchOnMountOrArgChange: true }
    );

    const handleScroll = () => {
        console.log("Scroll event triggered");
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            if (!isLoading) {
                console.log("Loading more posts...");
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); 


    useEffect(() => {
        if (data && isSuccess) {
            setPosts((prevPosts) => {
                const newPosts = data.postDtoList.filter(post =>
                    !prevPosts.some(prevPost => prevPost.id === post.id)
                );
                return [...prevPosts, ...newPosts];
            });
        }

        if (isError) {
            console.error("Error fetching posts:", error);
        }
    }, [data, isSuccess, isError, error]);

    useEffect(() => {
        console.log(`Current Posts: ${JSON.stringify(posts)}`);
    }, [posts]);

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
                    <Suspense key={post.id} fallback={<div>Loading Post...</div>}>
                        <ShowPost activeChat={activeChat} post={post} />
                    </Suspense>
                ))}

                {isLoading && <p>Loading more posts...</p>}
            </div>
        </section>
    );
}

export default NewFeed;