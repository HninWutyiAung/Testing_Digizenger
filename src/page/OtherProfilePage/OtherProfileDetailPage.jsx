import React, { useState } from 'react';
import OtherProfileAllPost from './OtherProfileAllPost';
import OtherProfileSubscription from './OtherProfileSubscription';
import OtherProfilePhotos from './OtherProfilePhotos';
import OtherProfileVideos from './OtherProfileVideos';
import OtherProfilePodcasts from './OtherProfilePodcasts';
import OtherProfileArticles from './OtherProfileArticles';

const OtherProfileDetailPage = () => {
  
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Subscription", "Photos", "Videos", "Podcasts", "Articles"];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Posts":
        return <OtherProfileAllPost />;
      case "Subscription":
        return <OtherProfileSubscription />;
      case "Photos":
        return <OtherProfilePhotos />;
      case "Videos":
        return <OtherProfileVideos />;
      case "Podcasts":
        return <OtherProfilePodcasts />;
      case "Articles":
        return <OtherProfileArticles />;
      default:
        return null;
    }
  };

  return (
    <div className="h-auto p-4 bg-white rounded-lg border border-solid border-[#C9DCDE] flex-col justify-start items-start gap-2 inline-flex mt-[10px]">
      <div className="h-auto self-stretch flex-col justify-start items-start gap-3 flex">
        <div className="w-full h-[20px] flex justify-between items-center">
          <div className="text-[#2C3E50] text-xl font-bold font-['DM Sans']">
            {activeTab}
          </div>
        </div>
        <div className="self-stretch flex flex-wrap justify-start items-center gap-[2.8px]">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1.5 rounded-2xl text-center text-sm font-medium font-['DM Sans'] transition-transform duration-100 
                ${activeTab === tab ? 'bg-[#2c3e50] text-white' : 'text-[#7e7e8d] hover:bg-[#ECF1F4]'} 
                hover:transform hover:translate-y-[-1px]`}
            >
              {tab}
            </div>
          ))}
        </div>
        
        <div>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default OtherProfileDetailPage;
