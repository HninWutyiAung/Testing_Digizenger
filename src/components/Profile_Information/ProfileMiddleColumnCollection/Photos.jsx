import React, { useState, useEffect } from "react";
import { useGetAllImagesQuery } from "../../../apiService/Profile";

const Photos = () => {
  const initialLimit = 9;
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(initialLimit);

  const { data, error, isLoading, refetch } = useGetAllImagesQuery({
    page: 1,
    limit,
  });

  useEffect(() => {
    if (showAll && data) {
      setLimit(data.imageDto.totalImage);
    }
  }, [showAll, data]);

  useEffect(() => {
    if (showAll) refetch();
  }, [limit, refetch, showAll]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading images</div>;

  const { totalImage, imageUrlList } = data.imageDto;
  const initialPhotos = imageUrlList.slice(0, initialLimit);
  const remainingPhotos =
    totalImage > initialLimit ? totalImage - initialLimit : 0;

  const renderHeader = () => (
    <div className="flex justify-between items-center w-full">
      <div className="text-[#2c3e50] text-xl font-bold font-['DM Sans']">
        Photos
      </div>
      <div className="w-[63px] h-[30px] rounded-lg flex justify-center items-center">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-[#7E7E8D] text-[16px] font-bold font-['DM Sans']"
          >
            See all
          </button>
        )}
      </div>
    </div>
  );

  const renderNoPhotosMessage = () => (
    <div className="grid grid-cols-3 gap-2 w-full">
      <p className="text-[#7E7E8D] text-[16px] col-span-3 text-left">
        No photos
      </p>
    </div>
  );

  const renderPhotoGrid = () => (
    <div className="grid grid-cols-3 gap-2 w-full">
      {(showAll ? imageUrlList : initialPhotos).map((photo, index) => (
        <div key={index} className="relative">
          <img
            className="w-[100px] h-[100px]"
            src={photo}
            alt={`photo-${index}`}
          />

          {index === initialPhotos.length - 1 &&
            remainingPhotos > 0 &&
            !showAll && (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                <img
                  className="w-[100px] h-[100px]"
                  src={photo}
                  alt="more photos"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex justify-center items-center text-white text-[16px] font-bold font-['DM Sans']">
                  +{remainingPhotos}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col justify-start items-start gap-3">
      <div className="self-stretch w-[343px] max-w-[343px] p-3 bg-white rounded-lg border border-[#c9dcde] flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
          {renderHeader()}
          {totalImage === 0 ? renderNoPhotosMessage() : renderPhotoGrid()}
        </div>
      </div>
    </div>
  );
};

export default Photos;
