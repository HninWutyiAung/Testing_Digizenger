import React from "react";
import { useState } from "react";

const Subscription = () => {
    const [activeTab, setActiveTab] = useState("articles");
    return (
        <div className="w-[343px] mt-5">
            <div className="h-[540px] inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start p-3 bg-white rounded-lg border border-solid border-[#c9dcde] gap-2">
                    <div className="h-[500px] self-stretch flex flex-col justify-start items-center gap-3">
                        <div className="h-[28px] self-stretch justify-between items-center inline-flex">
                            <div className="text-[#2C3E50] text-lg font-bold font-['DM Sans']">Subscription</div>
                            <div className="w-[60px] h-[28px] rounded-lg justify-center items-center flex">
                                <button className="text-[#7E7E8D] text-[16px] font-bold font-['DM Sans']">See all</button>
                            </div>
                        </div>
                        <div className="h-[400px] self-stretch flex-col justify-start items-start gap-3 flex">
                            <div className="h-[45px] self-stretch flex-col justify-start items-start flex">
                                <div className="self-stretch justify-center items-start inline-flex">
                                    <div className="w-[70px] h-[38px] bg-white flex-col justify-start items-center inline-flex cursor-pointer" onClick={() => setActiveTab('articles')}>
                                        <div className="px-2 flex-col justify-center items-center flex">
                                            <div className={`text-center text-sm font-normal font-['DM Sans'] ${activeTab === 'articles' ? 'text-[#2c3e50]' : 'text-[#7e7e8d]'}`}>
                                                Articles
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[70px] h-[38px] bg-white flex-col justify-start items-center inline-flex cursor-pointer" onClick={() => setActiveTab('podcasts')}>
                                        <div className="px-2 flex-col justify-center items-center flex">
                                            <div className={`text-center text-sm font-normal font-['DM Sans'] ${activeTab === 'podcasts' ? 'text-[#2c3e50]' : 'text-[#7e7e8d]'}`}>
                                                Podcasts
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[70px] h-[38px] bg-white flex-col justify-start items-center inline-flex cursor-pointer" onClick={() => setActiveTab('videos')}>
                                        <div className="px-2 flex-col justify-center items-center flex">
                                            <div className={`text-center text-sm font-normal font-['DM Sans'] ${activeTab === 'videos' ? 'text-[#2c3e50]' : 'text-[#7e7e8d]'}`}>
                                                Videos
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px flex-col justify-center items-start flex relative">
                                    <div className="self-stretch h-[1px]"></div>
                                    <div className="w-[46px] h-[3px] ml-[55px] absolute bg-[#00bcd4] rounded-tl-[100px] rounded-tr-[100px]"
                                        style={{
                                            transition: 'transform 0.3s ease',
                                            transform:
                                            activeTab === 'articles'
                                                ? 'translateX(12px)' 
                                                : activeTab === 'podcasts'
                                                ? 'translateX(80px)' 
                                                : 'translateX(152px)', 
                                            bottom: '1px', 
                                            zIndex: 10,
                                        }}>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[320px] self-stretch flex-col justify-start items-start gap-2.5 flex">
                                {[
                                    {
                                        image: "https://via.placeholder.com/111x69?text=Article+1",
                                        title: "Designing for Accessibility: Inclusive UI/UX Practices",
                                        time: "5m ago"
                                    },
                                    {
                                        image: "https://via.placeholder.com/111x69?text=Article+2",
                                        title: "From Concept to Prototype: The UI/UX Design Journey",
                                        time: "Jul 2"
                                    },
                                    {
                                        image: "https://via.placeholder.com/111x69?text=Article+3",
                                        title: "Mastering Minimalism: UI/UX Design Simplified",
                                        time: "Jun 28"
                                    },
                                    {
                                        image: "https://via.placeholder.com/111x69?text=Article+4",
                                        title: "UI/UX Design Subscription Course for designers of all levels",
                                        time: "Jun 23"
                                    },
                                ].map((article, index) => (
                                    <React.Fragment key={index}>
                                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                                            <div className="grow shrink basis-0 h-[69px] justify-start items-start gap-2 flex">
                                                <div className="w-[111px] h-[69px] relative">
                                                    <img className="w-[111px] h-[69px] left-0 top-0 absolute" src={article.image} alt={`Article ${index + 1}`} />
                                                </div>
                                                <div className="w-[200px] flex-col justify-start items-start inline-flex">
                                                    <div className="line-clamp-2 h-12 text-[#2c3e50] text-base font-bold font-['DM Sans'] text-left self-stretch">{article.title}</div>
                                                    <div className="w-[200px] justify-start items-start inline-flex">
                                                        <div className="text-[#7e7e8d] text-sm font-normal font-['DM Sans'] leading-[21px]">{article.time}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {index < 3 && <div className="self-stretch h-[0px] border border-[#ecf1f4]"></div>}
                                    </React.Fragment>
                                ))}
                            </div>    
                        </div>
                        <div className="self-stretch h-[0px] border border-solid border-[#ECF1F4]"></div>
                        <div className="w-[160px] h-7 px-4 py-2 rounded-lg justify-center items-center inline-flex">
                            <button className="text-[#8C8CA1] text-[16px] font-bold font-['DM Sans']">See all content</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
