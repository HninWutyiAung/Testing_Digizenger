import { useEffect,useRef,useState } from "react";
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaChevronRight,FaChevronLeft } from "react-icons/fa";
import feature1 from '../../../images/feature1.png';
import feature2 from '../../../images/feature2.png';
import feature3 from '../../../images/feature3.png';
const Featured = () => {
    const [featuredItems, setFeaturedItems] = useState([]);
        useEffect(() => {
            // Replace with backend data fetch
            const fetchData = async () => {
            const data = [
                {
                id: 1,
                title: "Mastering Minimalism: UI/UX Design Simplified",
                type: "Article",
                description: "I'll share tips and techniques for creating clean, intuitive interfaces.",
                imgSrc: feature1,
                },
                {
                id: 2,
                title: "Designing for Impact: Color in UI",
                type: "Subscription",
                description: "Understanding the role of color psychology in creating impactful designs.",
                imgSrc: feature2,
                },
                {
                id: 3,
                title: "Typography in Web Design",
                type: "emmanoble.me",
                description: "Learn how typography plays a critical role in web design.",
                imgSrc: feature3,
                },
                {
                id: 4,
                title: "UX Best Practices",
                type: "Subscription",
                description: "Best practices to improve user experience.",
                imgSrc: feature1,
                },
                {
                id: 5,
                title: "Responsive Design Principles",
                type: "Article",
                description: "Key principles to create responsive designs.",
                imgSrc: feature2,
                },
            ];
            setFeaturedItems(data);
            };
            
            fetchData();
        }, []);

        const containerRef = useRef(null);
        const [canScrollLeft, setCanScrollLeft] = useState(false);
        const [canScrollRight, setCanScrollRight] = useState(true);

        // Scroll to the right
        const handleScrollRight = () => {
            const container = containerRef.current;
            if (container) {
            container.scrollBy({
                left: 210, // Adjust based on how much you want to scroll
                behavior: 'smooth',
            });
            }
        };
        
        // Scroll to the left
        const handleScrollLeft = () => {
            const container = containerRef.current;
            if (container) {
            container.scrollBy({
                left: -210, // Adjust based on how much you want to scroll
                behavior: 'smooth',
            });
            }
        };
        
        // Check if scrolling is possible for left and right
        const checkScrollPosition = () => {
            const container = containerRef.current;
            if (container) {
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
        
            // Allow scrolling if the total content is wider than the container width
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollWidth > container.clientWidth && container.scrollLeft < maxScrollLeft);
            }
        };
        
        // Effect to monitor scroll position and window resize
        useEffect(() => {
            const container = containerRef.current;
            if (container) {
            checkScrollPosition(); // Initial check
            container.addEventListener('scroll', checkScrollPosition);
        
            // Also check on window resize to update the scroll state
            window.addEventListener('resize', checkScrollPosition);
        
            return () => {
                container.removeEventListener('scroll', checkScrollPosition);
                window.removeEventListener('resize', checkScrollPosition);
            };
            }
        }, [featuredItems]);
    
    return(
        <div>
            {/* Start Featured Section */}
            <style>
                        {`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .no-scrollbar {
                            -ms-overflow-style: none;  /* IE and Edge */
                            scrollbar-width: none;  /* Firefox */
                        }
                        `}
                    </style>
                    {/* Featured Section Component */}
                    <section className="w-[640px] h-[415px] flex flex-col justify-start items-start gap-3 mt-[12px]">
                        <div className="self-stretch h-[415px] p-6 bg-white rounded-lg border border-solid border-[#c9dcde] flex-col justify-start items-start gap-2.5 flex">
                            <div className="self-stretch w-[592px] h-[367px] flex-col justify-start items-center gap-5 flex">
                                <div className="self-stretch h-[299px] flex-col justify-start items-start gap-5 flex">
                                    <div className="h-[30px] self-stretch justify-between items-center inline-flex">
                                        <div className="w-[88px] h-[30px] text-[#2C3E50] text-xl font-bold font-['DM Sans'] leading-[30px]">Featured</div>
                                        <div className="justify-start items-center gap-5 flex">
                                            <PiPencilSimpleFill className='w-6 h-6 relative text-[#2C3E50]' />
                                        </div>
                                    </div>

                                    {/* Swiper or Scroll */}
                                    <div className="w-[592px] h-[249px] relative overflow-hidden">
                                        <div ref={containerRef} id="featured-container" className="w-[592px] h-[248.92px] flex gap-2.5  overflow-x-scroll no-scrollbar">
                                            {featuredItems.map((item) => (
                                                <div key={item.id} className="w-[209.40px] flex-col justify-start items-start gap-2 inline-flex">
                                                    <img className="w-[209.40px] h-[130.83px]" src={item.imgSrc} alt={item.title} />
                                                    <div className="w-[209.4px] h-[110.10px] flex-col justify-start items-start flex">
                                                        <div className="w-[209.4px] h-[21px] text-left text-[#2C3E50] overflow-hidden text-ellipsis font-['DM Sans'] text-sm font-normal leading-[21px]">
                                                        {item.type}
                                                        </div>
                                                        <div className="w-[209.4px] h-[48px] line-clamp-2 text-left text-[#2C3E50] text-ellipsis text-base font-bold font-['DM Sans']">
                                                        {item.title}
                                                        </div>
                                                        <div className="w-[209.4px] h-[41.10px] text-[#7E7E8D] font-['DM Sans'] text-sm font-normal line-clamp-2 text-left">
                                                        {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Left Arrow (only show when you can scroll left) */}
                                        {canScrollLeft && (
                                        <div className="absolute left-0 top-0 h-full flex items-center justify-center bg-gradient-to-r from-white to-transparent">
                                            <button onClick={handleScrollLeft} className="p-2 bg-[#2C3E50] rounded-full">
                                                <FaChevronLeft className="text-white" />
                                            </button>
                                        </div>
                                        )}

                                        {/* Right Arrow (only show when you can scroll right) */}
                                        {canScrollRight && (
                                        <div className="absolute right-0 top-0 h-full flex items-center justify-center bg-gradient-to-l from-white to-transparent">
                                            <button onClick={handleScrollRight} className="p-2 bg-[#2C3E50] rounded-full">
                                                <FaChevronRight className="text-white" />
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="self-stretch h-[0px] border border-[#ECF1F4]"></div>

                                {/* Other Featured Link */}
                                <div className="w-[238px] h-7 px-6 py-3 rounded-lg justify-center items-center gap-2.5 flex">
                                    <button className="w-[190px] h-[23px] text-[#8C8CA1] text-[17px] font-bold font-['DM Sans']">See all featured items</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* End Featured Section */}
        </div>
    )
}

export default Featured;