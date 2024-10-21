const Photos = () => {
    const photos = Array(100).fill('https://via.placeholder.com/117x117');
    const maxPhotos = 9;
    const displayedPhotos = photos.length > maxPhotos ? photos.slice(0, maxPhotos - 1) : photos;
    const remainingPhotos = photos.length - maxPhotos + 1;

    return (
        <div className="flex flex-col justify-start items-start gap-3">
            <div className="self-stretch max-w-[343px] p-3 bg-white rounded-lg border border-[#c9dcde] flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-[#2c3e50] text-xl font-bold font-['DM Sans']">Photos</div>
                        <div className="w-[63px] h-[30px] rounded-lg flex justify-center items-center">
                            <button className="text-[#7E7E8D] text-[16px] font-bold font-['DM Sans']">See all</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        {displayedPhotos.map((photo, index) => (
                            <img key={index} className="w-[100px] h-[100px]" src={photo} alt={`photo-${index}`} />
                        ))}
                        {photos.length > maxPhotos && (
                            <div className="w-[100px] h-[100px] relative cursor-pointer">
                                <img className="w-[100px] h-[100px]" src={photos[maxPhotos - 1]} alt="more photos" />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="absolute inset-0 flex justify-center items-center text-white text-[16px] font-bold font-['DM Sans']">
                                    +{remainingPhotos}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photos;
