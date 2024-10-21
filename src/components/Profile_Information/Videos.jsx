import { FaPlay } from "react-icons/fa";

const Videos = () => {
  const videosFromBackend = [
    {
      id: 1,
      title: "Mastering Minimalism: UI/UX Design Simplified",
      description:
        "Join me in this vlog as I delve into the art of minimalism in UI/UX design.",
      videoUrl: "video1.mp4",
    },
    {
      id: 2,
      title: "From Concept to Prototype: The UI/UX Design Journey",
      description:
        "Ever wondered how a design goes from a mere idea to a fully functional prototype?",
      videoUrl: "video2.mp4",
    },
    {
      id: 3,
      title: "Designing for Accessibility: Inclusive UI/UX Practices",
      description:
        "Creating inclusive designs is not just a trend; it's a necessity.",
      videoUrl: "video3.mp4",
    },
    {
      id: 4,
      title: "Building Responsive UIs",
      description:
        "Learn how to create responsive designs that work across all devices.",
      videoUrl: "video4.mp4",
    },
  ];

  return (
    <div className="max-w-[343px] w-full h-[473.29px] flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch p-3 bg-white rounded-lg border border-solid border-[#c9dcde] flex-col justify-start items-start gap-2.5 flex">
        {/* Responsive width and alignment for different screen sizes */}
        <div className="self-stretch h-[425.29px] flex-col justify-start items-center gap-[18px] flex">
          <div className="h-[30px] self-stretch justify-start items-center gap-2.5 inline-flex">
            <label className="text-[#2C3E50] text-xl font-bold font-['DM Sans']">
              Videos
            </label>
          </div>

          {/* Video Bind from backend */}
          <div className="self-stretch h-[307.29px] flex-col justify-start items-start gap-2.5 flex">
            {videosFromBackend.slice(0, 3).map((video, index) => (
              <div key={video.id}>
                <div className="self-stretch h-[89px] justify-start items-start gap-2 inline-flex">
                  <div className="w-[130px] h-[89.10px] relative">
                    <div className="w-[130px] h-[89.10px] left-0 top-0 absolute bg-[#00000033]"></div>
                    <div className="w-9 h-9 left-[47px] top-[26.27px] absolute flex items-center justify-center">
                      <div className="w-9 h-9 absolute bg-[#00bcd4] rounded-full backdrop-blur-sm flex items-center justify-center"></div>
                      <FaPlay className="w-[18.34px] h-[18.4px] absolute text-white cursor-pointer"></FaPlay>
                    </div>
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div className="line-clamp-2 self-stretch h-12 text-[#2c3e50] text-base font-bold font-['DM Sans'] text-left">
                      {video.title}
                    </div>
                    <div className="line-clamp-2 self-stretch h-[41.10px] text-[#7e7e8d] text-sm font-normal font-['DM Sans'] text-left">
                      {video.description}
                    </div>
                  </div>
                </div>

                {/* Add the divider except after the last video */}
                {index < videosFromBackend.slice(0, 3).length - 1 && (
                  <div className="self-stretch h-[1px] border border-[#ecf1f4] mt-1"></div>
                )}
              </div>
            ))}
          </div>

          {/* Text Button */}
          {videosFromBackend.length > 3 && (
            <div className="self-stretch h-[0px] border border-[#ecf1f4]"></div>
          )}

          <div className="rounded-lg justify-center items-center gap-2.5 inline-flex">
            <button className="text-[#8c8ca1] text-[16px] font-bold font-['DM Sans']">
              See all videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
