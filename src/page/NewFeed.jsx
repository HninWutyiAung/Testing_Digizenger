import NewFeedNav from "../components/NewFeedNav";
import MenuNav from "../components/MenuNav2";
import Post from "../components/Post";
import Banner from "../components/banner";
import ShowPost from "../components/ShowPost";
// import { useGetPostQuery } from '../api/Post';
import { useState, useEffect} from 'react';

function NewFeed({activeChat}){
    const [page, setPage] = useState(1);
    // const {data, isSuccess, isLoading, isError, error} = useGetPostQuery(page);
    const [post, setPost] = useState([]);

    // useEffect(() => {
    //     if (isSuccess) {
    //       setPosts((prevPosts) => [...prevPosts, ...data]);
    //     }
    //   }, [isSuccess, data]);
    
      const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      };
    
      // useEffect(() => {
      //   window.addEventListener('scroll', handleScroll);
      //   return () => window.removeEventListener('scroll', handleScroll);
      // }, [isLoading]);
      
    
    return(
        <section>
            <NewFeedNav activeChat={activeChat}/>
            <MenuNav activeChat={activeChat}/>
            <div className="flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive">
                <Post activeChat={activeChat}/>
                <Banner activeChat={activeChat}/>
                <ShowPost activeChat={activeChat}/>
                <ShowPost activeChat={activeChat}/>
                <ShowPost activeChat={activeChat}/>
            </div>
            
        </section>
    )
}

export default NewFeed;