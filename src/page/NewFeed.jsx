import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import Post from "../components/Post";
import Banner from "../components/banner";
import ShowPost from "../components/ShowPost";
import { useGetPostQuery } from '../api/Post';
import { useState, useEffect } from 'react';

function NewFeed({activeChat}){
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isSuccess, isLoading, isError, error } = useGetPostQuery({ page, limit });

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
          if (data && data.postDtoList.length > 0) {
            setPage((prevPage) => prevPage + 1); // Increment page
        }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => {console.log(page)}, [page]); 

    useEffect(() => {
      if (data && data.postDtoList.length === 0) {
          setPage(1); // Reset to page 1 if no posts are returned
      }
  }, [data]);

  console.log(data);

    return (
        <section>
            <NewFeedNav activeChat={activeChat} />
            <MenuNav activeChat={activeChat} />
            <div className="flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive">
                <Post activeChat={activeChat} />
                <Banner activeChat={activeChat} />

                { isSuccess && data?.postDtoList?.map((post) => (
                    <ShowPost key={post.id} activeChat={activeChat} post={post} />
                ))}

                { isLoading && <p>Loading more posts...</p> }
            </div>
        </section>
    );
}

export default NewFeed;
