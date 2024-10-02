import React, { Suspense, lazy, useState, useEffect } from 'react';
import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import Post from "../components/Post";
import Banner from "../components/banner";
import { useGetPostQuery } from '../api/Post';

// Lazy load the ShowPost component
const ShowPost = lazy(() => import("../components/ShowPost"));

function NewFeed({ activeChat }) {
    const [page, setPage] = useState(2);
    const [limit, setLimit] = useState(21);
    const [posts, setPosts] = useState([]);

    const { data, isSuccess, isLoading, isError, error } = useGetPostQuery(
        { page, limit },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        const handleScroll = () => {
            console.log("Scroll event triggered");
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                if (!isLoading) {
                    console.log("Loading more posts...");
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty dependency array to attach the listener only once

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

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            <div className="flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive">
                <Post activeChat={activeChat} />
                <Banner activeChat={activeChat} />

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