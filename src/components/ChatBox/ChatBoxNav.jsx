import magnifying from "/images/magnifying.png";
import john from '/images/john doe.jpg';
import { useState , useRef , useEffect} from "react";

function ChatBoxNav({setActiveChat}) {
    const [inputStyle,setInputStyle] = useState(false);
    const inputRef = useRef(null);
    const closeActiveChat =() =>{
        setActiveChat(false);
        console.log("hi")
    }

    const handleInput =()=>{
        setInputStyle(true);
    }

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setInputStyle(false);
            inputRef.current.value = ""; 
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return(
            <section className="flex  items-center gap-[18px] 2xl:gap-[40px] px-[12px] bg-white border-b border-[#ECF1F4] z-10 w-[30.4%] 2xl:w-[43.63%]  fixed chat-box-nav-responsive">
                <form className="flex flex-col relative w-[350px] 2xl:w-[450px] responsive-chatbox-search">
                    <input ref={inputRef} type="text" className="rounded-[16px] px-[10px] py-[5px] bg-[#ECF1F4]" onClick={handleInput}></input>
                    {!inputStyle ? (<div className="flex items-center gap-[10px] absolute top-[5px] left-[4px]">
                        <img src={magnifying} className="w-[24px] h-[24px]" />
                        <span className="text-[16px] text-[#8C8CA1] font-normal leading-6">Digisearch</span>
                    </div> ) :
                    ""
                    } 
                </form>
                <div className="flex items-center justify-center px-[12px] border-l border-[#ECF1F4] border- gap-[12px]" onClick={closeActiveChat}>
                    <img src={john} className="w-[40px] h-[40px]"></img>
                    <div className="flex flex-col gap-[2px]">
                        <span className="text-[16px] font-bold leading-7 text-[#2C3E50]">John Doe</span>
                        <span className="text-[10px] font-normal leading-5">Standard User</span>

                    </div>

                </div>

        </section>
    )
}

export default ChatBoxNav