import emma from '/images/emma.jpg';
import threeDot from '/images/dotthree.jpg';

function BirthNotiLayout ({noti}){

    const text = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt alias dolorem corporis non labore vitae modi?";
    return(
        <div className="flex flex-col items-start self-stretch w-full px-[10px]">
            <div className="flex items-center justify-start self-stretch gap-[5px] ">
                <div className='h-[40px] w-[45px]'>
                   <img src={emma} className='h-[40px] w-[40px] rounded-full'/>
                </div>
                <div className='flex flex-col self-stretch w-full'>
                    <div className='flex justify-between self-stretch items-end '>
                        <div className='text-[14px] text-darkBlue leading-6 '>
                            <span className='font-bold'>This is Birth Noti</span>
                        </div>
                        <div className='items-center'>
                            <span className='text-[10px] leading-6 font-normal text-textGrey2'>2h</span>
                        </div>
                    </div>
                    <div className='flex justify-between self-stretch items-start'>
                        <div>
                            <span className='text-textGrey text-[12px] font-normal leading-6'>{text.split(" ").slice(0,5).join(' ')+"..."}</span>
                        </div>
                        <div className='h-[32px] w-[32px]'>
                            <img src={threeDot} className='text-black'/>
                        </div>
                    </div>

                </div>

            </div>
            <div className='self-stretch h-[1px] bg-accent'></div>
        </div>
    )
}

export default BirthNotiLayout;  