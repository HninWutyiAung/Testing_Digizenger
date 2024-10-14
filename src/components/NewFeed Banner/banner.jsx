import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '/images/banner 1.png';
import banner2 from '/images/banner 2.png';
import john from '/images/john doe.jpg';
import mark from '/images/mark.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import AutoplayProgress from './AutoProgressBar';

import { Pagination, Autoplay } from 'swiper/modules';

function Banner({activeChat}) {
    const slides = [banner1, banner2, banner1, banner1]; 
    const lastSlideIndex = slides.length - 1; // Get the last slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    const progressContent = useRef(null);

    const [timeLeft, setTimeLeft] = useState(0);
    const [progress, setProgress] = useState(1);
  
    const onAutoplayTimeLeft = (s, time, autoplayProgress) => {
      setTimeLeft(time);
      setProgress(1 - autoplayProgress);
    };

    return (
        <section>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Autoplay]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="flex flex-col items-center justify-end rounded-[8px] self-stretch"
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)} // Update current index
                style={{
                    paddingRight: activeChat ? (currentIndex === lastSlideIndex ? '0px' : '50px') : (currentIndex === lastSlideIndex ? '0px' : '100px') , // Conditional padding
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className='flex flex-row items-center gap-[8px] bg-white rounded-[8px]'>
                        <img src={slide} className="rounded-[8px] w-[150px] h-[120px]" alt={`Slide ${index}`} />
                        <div className='flex items-center'>
                            <div className='flex flex-col justify-center items-start gap-[8px]'>
                                <div className='flex justify-center items-center gap-[4px]'>
                                    <img src={john} className='w-[20px] h-[20px]'/>
                                    <span className='text-[12px] font-semibold leading-4'>Wheeler Auto</span>
                                    <div className='flex justify-center bg-red-200 items-center w-[16px] h-[16px]'>
                                        <img src={mark} className='w-[12px] h-[12px]' ></img>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-start'>
                                    <div className='flex flex-col justify-center items-start'>
                                        <div className='w-[200px] text-[16px] font-semibold text-[#2C3E50] leading-6 overflow-hidden whitespace-nowrap text-ellipsis'>20% Discount.Don't Miss for Your Chance.</div>
                                        <div className='w-[200px] text-[#7E7E8D] text-[14px] font-normal leading-5 overflow-hidden whitespace-nowrap text-ellipsis'>Lorem ipsum dolor sit amet consectetur, <br></br>adipisicing elit. Incidunt alias dolorem corporis non labore vitae modi?</div>
                                    </div>
                                    <div className='text-[#0097A7] text-[15px] font-bold '>Explore</div>
                                </div>

                            </div>
                        </div>
                        <AutoplayProgress progress={progress} ref={progressContent} timeLeft={timeLeft} />
                    </SwiperSlide>
                    
                ))}

            </Swiper>
        </section>
    );
}

export default Banner;
